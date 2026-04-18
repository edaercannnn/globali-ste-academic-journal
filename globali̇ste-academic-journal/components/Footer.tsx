import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<Props> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f8f8f8] text-[#505050] py-12 mt-auto border-t border-gray-300 text-sm font-sans">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-[#cf1f46] font-bold text-xl mb-4 flex items-center">
             <img 
                src="https://iste.edu.tr/files/yatay_logo.png" 
                alt="İSTE Logo" 
                className="h-10 w-auto mr-2" 
              />
              <span className="text-[#222222]">GlobalİSTE</span>
          </div>
          <p className="mb-4">GlobalİSTE empowers knowledge which empowers those who use it.</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#cf1f46] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#222222] transition">f</div>
            <div className="w-8 h-8 bg-[#cf1f46] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#222222] transition">in</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold mb-4 text-[#2d2d2d] text-base">Solutions</h4>
          <button onClick={() => setActiveTab('scopus')} className="text-left hover:text-[#cf1f46] hover:underline">Scopus</button>
          <button onClick={() => setActiveTab('sciencedirect')} className="text-left hover:text-[#cf1f46] hover:underline">ScienceDirect</button>
          <button onClick={() => setActiveTab('mendeley')} className="text-left hover:text-[#cf1f46] hover:underline">Mendeley</button>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold mb-4 text-[#2d2d2d] text-base">Researchers</h4>
          <button onClick={() => setActiveTab('submit')} className="text-left hover:text-[#cf1f46] hover:underline">Submit your paper</button>
          <button onClick={() => setActiveTab('find_journal')} className="text-left hover:text-[#cf1f46] hover:underline">Find a journal</button>
          <button onClick={() => setActiveTab('author_webshop')} className="text-left hover:text-[#cf1f46] hover:underline">Author Webshop</button>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold mb-4 text-[#2d2d2d] text-base">Support</h4>
          <button onClick={() => setActiveTab('help')} className="text-left hover:text-[#cf1f46] hover:underline">{t('footer', 'help')}</button>
          <button onClick={() => setActiveTab('contact')} className="text-left hover:text-[#cf1f46] hover:underline">{t('footer', 'contact')}</button>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 mt-12 pt-8 border-t border-gray-300 text-xs flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-6 mb-4 md:mb-0">
          <button onClick={() => setActiveTab('terms')} className="hover:underline">{t('footer', 'terms')}</button>
          <button onClick={() => setActiveTab('privacy')} className="hover:underline">{t('footer', 'privacy')}</button>
          <button onClick={() => setActiveTab('privacy')} className="hover:underline">{t('footer', 'cookies')}</button>
          <button onClick={() => setActiveTab('sitemap')} className="hover:underline">{t('footer', 'sitemap')}</button>
        </div>
        <div>{t('footer', 'rights')}</div>
      </div>
    </footer>
  );
};