import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LanguageModal } from './components/LanguageModal';
import { ChatBot } from './components/ChatBot';
import { HomeView } from './views/HomeView';
import { SubmissionView } from './views/SubmissionView';
import { AdminView } from './views/AdminView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { JournalsView } from './views/JournalsView';
import { StaticPageView } from './views/StaticPageView';
import { SignInView } from './views/SignInView';
import { SavedView } from './views/SavedView';
import { Notification, Article } from './types';
import { db } from './services/mockDb';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();

  // Saved Articles Persistence with Error Handling
  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('globaliste_saved');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (error) {
      console.error("Error reading saved articles from localStorage:", error);
      return new Set();
    }
  });

  const toggleSave = (id: string) => {
    setSavedArticleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('globaliste_saved', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  useEffect(() => {
    const subscriptionPromise = db.subscribe((data) => {
      setArticles(data);
      setLoading(false);
    });
    
    return () => {
      subscriptionPromise.then(unsubscribe => unsubscribe());
    };
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const selectedArticle = articles.find(a => a.id === selectedArticleId) || null;
  const savedArticlesList = articles.filter(a => savedArticleIds.has(a.id));
  const isLoggedIn = user && !user.isAnonymous;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar setActiveTab={setActiveTab} setIsLanguageModalOpen={setIsLanguageModalOpen} />

      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-[#cf1f46] text-white px-6 py-4 shadow-lg flex items-center gap-3 animate-bounce">
          <CheckCircle className="h-5 w-5 text-white" />
          <span className="font-bold">{notification.message}</span>
        </div>
      )}

      {isLanguageModalOpen && <LanguageModal onClose={() => setIsLanguageModalOpen(false)} />}

      <main className="flex-grow relative">
        {activeTab === 'home' && (
          <HomeView 
            articles={articles}
            loading={loading}
            setActiveTab={setActiveTab}
            setSelectedArticleId={setSelectedArticleId}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            savedArticleIds={savedArticleIds}
            toggleSave={toggleSave}
          />
        )}
        {activeTab === 'saved' && (
          <SavedView 
            savedArticles={savedArticlesList}
            toggleSave={toggleSave}
            setActiveTab={setActiveTab}
            setSelectedArticleId={setSelectedArticleId}
          />
        )}
        {activeTab === 'submit' && (
          <SubmissionView setActiveTab={setActiveTab} showNotification={showNotification} />
        )}
        
        {/* Protected Admin Route */}
        {activeTab === 'admin' && (
          isLoggedIn ? (
            <AdminView articles={articles} showNotification={showNotification} />
          ) : (
            <SignInView setActiveTab={setActiveTab} showNotification={showNotification} />
          )
        )}

        {activeTab === 'article-detail' && (
          <ArticleDetailView 
            article={selectedArticle} 
            setActiveTab={setActiveTab} 
            isSaved={selectedArticle ? savedArticleIds.has(selectedArticle.id) : false}
            toggleSave={toggleSave}
          />
        )}
        {activeTab === 'journals' && (
          <JournalsView setSelectedCategory={setSelectedCategory} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'signin' && (
          <SignInView setActiveTab={setActiveTab} showNotification={showNotification} />
        )}

        {/* Static Pages */}
        {activeTab === 'about' && <StaticPageView titleKey="about_title" contentKey="about_content" setActiveTab={setActiveTab} />}
        {activeTab === 'researchers' && <StaticPageView titleKey="researchers_title" contentKey="researchers_content" setActiveTab={setActiveTab} />}
        {activeTab === 'librarians' && <StaticPageView titleKey="librarians_title" contentKey="librarians_content" setActiveTab={setActiveTab} />}
        {activeTab === 'help' && <StaticPageView titleKey="help_title" contentKey="help_content" setActiveTab={setActiveTab} />}
        {activeTab === 'contact' && <StaticPageView titleKey="contact_title" contentKey="contact_content" setActiveTab={setActiveTab} />}
        {activeTab === 'privacy' && <StaticPageView titleKey="privacy_title" contentKey="privacy_content" setActiveTab={setActiveTab} />}
        {activeTab === 'terms' && <StaticPageView titleKey="terms_title" contentKey="terms_content" setActiveTab={setActiveTab} />}
        {activeTab === 'scopus' && <StaticPageView titleKey="scopus_title" contentKey="scopus_content" setActiveTab={setActiveTab} />}
        {activeTab === 'sciencedirect' && <StaticPageView titleKey="sciencedirect_title" contentKey="sciencedirect_content" setActiveTab={setActiveTab} />}
        {activeTab === 'mendeley' && <StaticPageView titleKey="mendeley_title" contentKey="mendeley_content" setActiveTab={setActiveTab} />}
        {activeTab === 'find_journal' && <StaticPageView titleKey="find_journal_title" contentKey="find_journal_content" setActiveTab={setActiveTab} />}
        {activeTab === 'author_webshop' && <StaticPageView titleKey="author_webshop_title" contentKey="author_webshop_content" setActiveTab={setActiveTab} />}
        
        {/* Global ChatBot */}
        <ChatBot />
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}