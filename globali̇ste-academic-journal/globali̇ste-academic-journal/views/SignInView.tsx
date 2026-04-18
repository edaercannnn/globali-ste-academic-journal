import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  setActiveTab: (tab: string) => void;
  showNotification: (msg: string, type?: 'success' | 'error') => void;
}

export const SignInView: React.FC<Props> = ({ setActiveTab, showNotification }) => {
  const { t } = useLanguage();
  const { signIn } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
    setActiveTab('admin');
    showNotification(t('login', 'success'), 'success');
  };

  return (
    <div className="bg-[#f2f2f2] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-10 shadow-lg max-w-md w-full border-t-4 border-[#cf1f46]">
        <div className="text-center mb-8">
          <img 
            src="https://iste.edu.tr/files/yatay_logo.png" 
            alt="İSTE Logo" 
            className="h-24 w-auto mx-auto mb-4" 
          />
          <h2 className="text-2xl font-bold text-[#cf1f46]">{t('login', 'title')}</h2>
          <p className="text-gray-600 text-sm mt-1">{t('login', 'subtitle')}</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t('login', 'email')}</label>
              <input type="email" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-[#cf1f46] bg-white text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t('login', 'password')}</label>
              <input type="password" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-[#cf1f46] bg-white text-gray-900" />
            </div>
            <button className="w-full bg-[#cf1f46] text-white font-bold py-3 hover:bg-[#a61938] transition">{t('login', 'btn')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};