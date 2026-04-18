export interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  abstract: string;
  keywords?: string;
  image?: string;
  date: string;
  views: number;
  downloads?: number;
  status: 'published' | 'pending' | 'under_review' | 'revision' | 'accepted' | 'rejected';
  doi?: string;
  userId?: string;
  fileName?: string;
  references?: string[];
  figures?: { url: string; caption: string }[];
}

export interface User {
  uid: string;
  isAnonymous: boolean;
  email?: string | null;
}

export type Language = 'en' | 'tr';

export type TranslationKey = string;

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Stats {
  totalViews: number;
  totalDownloads: number;
  pendingCount: number;
  publishedCount: number;
}