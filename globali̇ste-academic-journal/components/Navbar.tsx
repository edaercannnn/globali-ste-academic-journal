import React from 'react';
import { User, HelpCircle, Globe, Search, Menu, LogOut, Bookmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  setActiveTab: (tab: string) => void;
  setIsLanguageModalOpen: (val: boolean) => void;
}

export const Navbar: React.FC<Props> = ({ setActiveTab, setIsLanguageModalOpen }) => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    setActiveTab('home');
  };

  const isLoggedIn = user && !user.isAnonymous;

  return (
    <header className="font-sans border-b border-gray-200">
      {/* Top Utility Bar (Brand Color) */}
      <div className="bg-[#cf1f46] text-white text-xs py-2 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-end items-center space-x-6">
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="hover:underline flex items-center gap-1">
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          ) : (
            <button onClick={() => setActiveTab('signin')} className="hover:underline flex items-center gap-1">
              <User className="h-3 w-3" /> {t('nav', 'signin')}
            </button>
          )}
          
          <button onClick={() => setActiveTab('help')} className="hover:underline flex items-center gap-1">
            <HelpCircle className="h-3 w-3" /> {t('nav', 'help')}
          </button>
          <button onClick={() => setIsLanguageModalOpen(true)} className="hover:underline flex items-center gap-1 border-l border-white/30 pl-4">
            <Globe className="h-3 w-3" /> {t('nav', 'lang_select')}
          </button>
        </div>
      </div>

      {/* Main Navigation (White) */}
      <div className="bg-white py-4 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
              <img 
                src="https://iste.edu.tr/files/yatay_logo.png" 
                alt="İSTE Logo" 
                className="h-14 w-auto mr-3" 
              />
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-[#444]">
              <button onClick={() => setActiveTab('journals')} className="hover:text-[#cf1f46] hover:bg-[#f4f4f4] px-3 py-2 rounded transition">{t('nav', 'journals')}</button>
              <button onClick={() => setActiveTab('researchers')} className="hover:text-[#cf1f46] hover:bg-[#f4f4f4] px-3 py-2 rounded transition">{t('nav', 'researchers')}</button>
              <button onClick={() => setActiveTab('librarians')} className="hover:text-[#cf1f46] hover:bg-[#f4f4f4] px-3 py-2 rounded transition">{t('nav', 'librarians')}</button>
              
              <button onClick={() => setActiveTab('saved')} className="hover:text-[#cf1f46] hover:bg-[#f4f4f4] px-3 py-2 rounded transition flex items-center gap-1">
                <Bookmark className="h-4 w-4" /> {t('nav', 'library')}
              </button>

              <button onClick={() => setActiveTab('submit')} className="hover:text-[#cf1f46] hover:bg-[#f4f4f4] px-3 py-2 rounded transition">{t('nav', 'submit')}</button>
              <button onClick={() => setActiveTab('about')} className="hover:text-[#cf1f46] hover:bg-[#f4f4f4] px-3 py-2 rounded transition">{t('nav', 'about')}</button>
              
              {/* Only show Dashboard if logged in */}
              {isLoggedIn && (
                <button onClick={() => setActiveTab('admin')} className="hover:text-[#cf1f46] hover:bg-[#f4f4f4] px-3 py-2 rounded transition font-bold text-[#cf1f46]">
                  {t('nav', 'dashboard')}
                </button>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="lg:hidden text-[#cf1f46]">
              <Menu className="h-8 w-8" />
            </button>
            <button 
              onClick={() => setActiveTab('home')}
              className="hidden lg:flex items-center text-[#cf1f46] border border-[#cf1f46] px-4 py-2 rounded hover:bg-[#cf1f46] hover:text-white transition"
            >
              <Search className="h-4 w-4 mr-2" /> {t('hero', 'search_btn')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};