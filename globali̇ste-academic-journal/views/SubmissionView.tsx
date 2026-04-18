import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/mockDb';
import { CATEGORIES } from '../constants';

interface Props {
  setActiveTab: (tab: string) => void;
  showNotification: (msg: string, type?: 'success' | 'error') => void;
}

export const SubmissionView: React.FC<Props> = ({ setActiveTab, showNotification }) => {
  const { t, getCategoryName } = useLanguage();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    
    try {
      await db.addArticle({
        title: formData.get('title') as string,
        author: formData.get('author') as string,
        abstract: formData.get('abstract') as string,
        category: formData.get('category') as string,
        keywords: formData.get('keywords') as string,
        doi: formData.get('doi') as string,
        fileName: selectedFile ? selectedFile.name : undefined,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        views: 0,
        userId: user.uid
      });
      
      showNotification(t('submit', 'success'), "success");
      e.currentTarget.reset();
      setSelectedFile(null);
      setActiveTab('home');
    } catch (error) {
      showNotification(t('submit', 'error'), "error");
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-[#cf1f46] mb-2">{t('submit', 'title')}</h1>
          <p className="text-gray-600">{t('submit', 'subtitle')}</p>
        </div>

        <form onSubmit={handleSubmission} className="space-y-8">
          <div className="bg-[#f9f9f9] p-8 border border-gray-200 rounded-sm">
            <h3 className="font-bold text-[#2d2d2d] mb-6 flex items-center">
              <span className="bg-[#cf1f46] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">1</span>
              {t('submit', 'step')}
            </h3>
            
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('submit', 'subject')}</label>
                <select name="category" className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#cf1f46] outline-none bg-white text-gray-900">
                  {CATEGORIES.filter(c => c !== "Tümü").map(cat => <option key={cat} value={cat} className="text-gray-900">{getCategoryName(cat)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('submit', 'manuscript_title')}</label>
                <input required name="title" type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#cf1f46] outline-none text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('submit', 'author')}</label>
                <input required name="author" type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#cf1f46] outline-none text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('submit', 'abstract')}</label>
                <textarea required name="abstract" rows={5} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#cf1f46] outline-none text-gray-900 bg-white"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('submit', 'keywords')}</label>
                <input required name="keywords" type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#cf1f46] outline-none text-gray-900 bg-white" placeholder="e.g. cancer, therapy, gene" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('submit', 'doi')}</label>
                <input name="doi" type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#cf1f46] outline-none text-gray-900 bg-white" placeholder="e.g. 10.1016/j.gl.2024.001" />
              </div>
              
              <div className="border-2 border-dashed border-gray-300 p-6 text-center bg-white hover:bg-gray-50 transition cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="h-8 w-8 text-[#cf1f46] mx-auto mb-2" />
                <div className="text-sm font-bold text-[#cf1f46]">{selectedFile ? selectedFile.name : t('submit', 'file_label')}</div>
                <div className="text-xs text-gray-500 mt-1">{t('submit', 'file_desc')}</div>
                <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} className="hidden" accept=".pdf,.docx" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-[#cf1f46] hover:bg-[#a61938] text-white font-bold py-3 px-10 rounded-sm text-lg transition shadow-sm">
              {t('submit', 'button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};