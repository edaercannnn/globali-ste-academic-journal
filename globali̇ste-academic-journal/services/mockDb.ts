import { Article } from '../types';
import { DEMO_ARTICLES } from '../constants';
import { supabase } from './supabaseClient';

// Simulated latency for mock mode
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class DatabaseService {
  private articles: Article[] = [];
  private listeners: ((articles: Article[]) => void)[] = [];
  private isSupabaseConnected = !!supabase;

  constructor() {
    if (!this.isSupabaseConnected) {
      console.warn("Supabase credentials not found. Using local mock database.");
      const stored = localStorage.getItem('globaliste_articles');
      if (stored) {
        try {
          this.articles = JSON.parse(stored);
        } catch (e) {
          this.articles = [];
        }
      }
    }
  }

  // Helper to map DB row (snake_case) to Article (camelCase)
  private mapFromDb(row: any): Article {
    return {
      ...row,
      userId: row.user_id,
      fileName: row.file_name,
    } as Article;
  }

  // Helper to map Article (camelCase) to DB row (snake_case)
  private mapToDb(article: any) {
    const { userId, fileName, ...rest } = article;
    return {
      ...rest,
      user_id: userId,
      file_name: fileName
    };
  }

  private notify() {
    if (!this.isSupabaseConnected) {
      localStorage.setItem('globaliste_articles', JSON.stringify(this.articles));
    }
    this.listeners.forEach(cb => cb([...this.articles]));
  }

  async fetchArticles(): Promise<Article[]> {
    if (this.isSupabaseConnected && supabase) {
      const { data, error } = await supabase.from('articles').select('*').order('date', { ascending: false });
      if (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
      this.articles = data.map(this.mapFromDb);
      return this.articles;
    } else {
      return this.articles;
    }
  }

  async subscribe(callback: (articles: Article[]) => void) {
    this.listeners.push(callback);
    
    // Initial fetch
    await this.fetchArticles();
    callback([...this.articles]);

    if (this.isSupabaseConnected && supabase) {
      // Real-time subscription for Supabase
      supabase
        .channel('public:articles')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, async () => {
          await this.fetchArticles();
          this.notify();
        })
        .subscribe();
    }

    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
      if (this.isSupabaseConnected && supabase) {
        supabase.removeAllChannels();
      }
    };
  }

  async addArticle(articleData: Omit<Article, 'id'>) {
    const newArticle = {
      ...articleData,
      id: `art-${Date.now()}` // Temporary ID, DB will generate UUID if configured
    };

    if (this.isSupabaseConnected && supabase) {
      const dbPayload = this.mapToDb(newArticle);
      const { data, error } = await supabase
        .from('articles')
        .insert([dbPayload])
        .select();
      
      if (error) throw error;
      if (data) {
        // Update local state immediately
        await this.fetchArticles();
        this.notify();
        return this.mapFromDb(data[0]);
      }
    } else {
      await delay(500);
      this.articles = [newArticle as Article, ...this.articles];
      this.notify();
      return newArticle;
    }
  }

  async updateArticleStatus(id: string, status: Article['status']) {
    if (this.isSupabaseConnected && supabase) {
      const { error } = await supabase
        .from('articles')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      await this.fetchArticles();
      this.notify();
    } else {
      await delay(300);
      this.articles = this.articles.map(a => a.id === id ? { ...a, status } : a);
      this.notify();
    }
  }

  async deleteArticle(id: string) {
    if (this.isSupabaseConnected && supabase) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await this.fetchArticles();
      this.notify();
    } else {
      await delay(300);
      this.articles = this.articles.filter(a => a.id !== id);
      this.notify();
    }
  }

  async seedDemoData() {
    if (this.isSupabaseConnected && supabase) {
      const { data } = await supabase.from('articles').select('id');
      const currentIds = new Set(data?.map((a: any) => a.id));
      
      const toAdd = DEMO_ARTICLES.filter(a => !currentIds.has(a.id));
      
      if (toAdd.length > 0) {
        // Map demo data to DB format
        const dbPayloads = toAdd.map(a => this.mapToDb(a));
        const { error } = await supabase.from('articles').insert(dbPayloads);
        if (error) console.error(error);
        await this.fetchArticles();
        this.notify();
      }
    } else {
      await delay(1000);
      const currentIds = new Set(this.articles.map(a => a.id));
      const toAdd = DEMO_ARTICLES.filter(a => !currentIds.has(a.id));
      this.articles = [...toAdd, ...this.articles];
      this.notify();
    }
  }
}

export const db = new DatabaseService();