import React from 'react';
import { Edit3, Eye, ChevronRight, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  titleKey: string;
  contentKey: string;
  setActiveTab: (tab: string) => void;
}

export const StaticPageView: React.FC<Props> = ({ titleKey, contentKey, setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#cf1f46] mb-8 pb-4 border-b border-gray-200">{t('pages', titleKey)}</h1>
        <div className="prose prose-lg text-gray-700 leading-relaxed">
          <p>{t('pages', contentKey)}</p>
          
          {/* Expanded Content for Researchers Page to match "Hub" concept */}
          {titleKey === 'researchers_title' && (
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-[#fcfcfc] p-8 border-t-4 border-[#cf1f46] shadow-sm">
                <div className="bg-[#cf1f46] w-12 h-12 rounded-full flex items-center justify-center text-white mb-4"><Edit3 /></div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-2">{t('pages', 'author_section_title')}</h3>
                <p className="text-sm text-gray-600 mb-4">{t('pages', 'author_section_desc')}</p>
                <button onClick={() => setActiveTab('submit')} className="text-[#cf1f46] font-bold hover:underline flex items-center">Go to Author Hub <ChevronRight className="h-4 w-4 ml-1"/></button>
              </div>
              <div className="bg-[#f9f9f9] p-8 border-t-4 border-[#222222] shadow-sm">
                <div className="bg-[#222222] w-12 h-12 rounded-full flex items-center justify-center text-white mb-4"><Eye /></div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-2">{t('pages', 'reviewer_section_title')}</h3>
                <p className="text-sm text-gray-600 mb-4">{t('pages', 'reviewer_section_desc')}</p>
                <button onClick={() => setActiveTab('signin')} className="text-[#222222] font-bold hover:underline flex items-center">Go to Reviewer Hub <ChevronRight className="h-4 w-4 ml-1"/></button>
              </div>
            </div>
          )}

          {/* Contact Info */}
          {titleKey === 'contact_title' && (
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-[#f9f9f9] p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-[#cf1f46] flex items-center"><Mail className="mr-2 h-5 w-5" /> Support</h3>
                <p>support@globaliste.com</p>
                <p>editors@globaliste.com</p>
              </div>
              <div className="bg-[#f9f9f9] p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-[#cf1f46] flex items-center"><MapPin className="mr-2 h-5 w-5" /> Headquarters</h3>
                <p>GlobalİSTE Publishing</p>
                <p>İskenderun, Türkiye</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};