import React from 'react';
import { X as CloseIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onClose: () => void;
}

export const LanguageModal: React.FC<Props> = ({ onClose }) => {
  const { setLanguage, t, language } = useLanguage();

  const handleSelect = (lang: 'en' | 'tr') => {
    setLanguage(lang);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-5xl w-full p-8 relative animate-fade-in-up" 
        onClick={e => e.stopPropagation()} 
      >
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900" onClick={onClose}>
          <CloseIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-3xl font-bold text-[#2d2d2d] mb-4">{t('modal', 'title')}</h2>
        <p className="text-gray-600 mb-10 border-b border-gray-200 pb-6 text-lg">{t('modal', 'desc')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Americas / Global */}
          <div>
            <h3 className="font-bold text-[#cf1f46] mb-6 text-xl border-b-2 border-black inline-block pb-1 cursor-pointer hover:opacity-80 transition">
                {t('modal', 'americas')}
            </h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleSelect('en')} className="text-[#cf1f46] hover:underline text-left w-full hover:text-[#222222] transition text-lg">
                  Global (English)
                </button>
              </li>
            </ul>
          </div>

          {/* Europe / Middle East */}
          <div>
            <h3 className="font-bold text-[#cf1f46] mb-6 text-xl border-b-2 border-black inline-block pb-1 cursor-pointer hover:opacity-80 transition">
                {t('modal', 'europe')}
            </h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleSelect('tr')} className="text-[#cf1f46] hover:underline text-left w-full hover:text-[#222222] transition text-lg">
                  Türkiye (Türkçe)
                </button>
              </li>
            </ul>
          </div>

          {/* Asia Pacific */}
          <div>
            <h3 className="font-bold text-[#cf1f46] mb-6 text-xl border-b-2 border-black inline-block pb-1 cursor-pointer hover:opacity-80 transition">
                {t('modal', 'asia')}
            </h3>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li>(Coming Soon)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};