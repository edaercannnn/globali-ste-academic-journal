import React from 'react';
import { Bookmark, ChevronRight, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Article } from '../types';

interface Props {
  savedArticles: Article[];
  toggleSave: (id: string) => void;
  setActiveTab: (tab: string) => void;
  setSelectedArticleId: (id: string) => void;
}

export const SavedView: React.FC<Props> = ({ savedArticles, toggleSave, setActiveTab, setSelectedArticleId }) => {
  const { t, getCategoryName } = useLanguage();

  return (
    <div className="bg-[#f7f7f7] min-h-screen py-12">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-[#cf1f46] flex items-center gap-3">
                <Bookmark className="h-8 w-8" />
                {t('library', 'title')}
            </h1>
            <p className="text-gray-600 mt-2">{t('library', 'desc')}</p>
        </div>

        {savedArticles.length > 0 ? (
          <div className="space-y-4">
            {savedArticles.map((article) => (
              <div key={article.id} className="bg-white border-l-4 border-[#cf1f46] shadow-sm p-6 hover:shadow-md transition flex flex-col sm:flex-row gap-6 relative group">
                <div className="flex-grow cursor-pointer" onClick={() => {setSelectedArticleId(article.id); setActiveTab('article-detail')}}>
                    <div className="flex gap-2 text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">
                        <span className="text-[#cf1f46]">{getCategoryName(article.category)}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#2d2d2d] group-hover:text-[#cf1f46] transition mb-2 leading-snug">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.author}</p>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleSave(article.id); }}
                        className="text-gray-400 hover:text-red-600 transition p-2"
                        title={t('library', 'remove')}
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                    <button 
                        onClick={() => {setSelectedArticleId(article.id); setActiveTab('article-detail')}}
                        className="text-[#cf1f46] hover:underline text-sm font-bold flex items-center mt-4 sm:mt-0"
                    >
                        View <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center border border-gray-200 rounded-lg shadow-sm">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Bookmark className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t('library', 'empty')}</h3>
            <button onClick={() => setActiveTab('home')} className="text-[#cf1f46] font-bold hover:underline mt-2">
                Browse Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};