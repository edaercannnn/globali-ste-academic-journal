import React from 'react';
import { ChevronRight, Stethoscope, Dna, Leaf, Atom, Cog, Users, Cpu, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CATEGORIES } from '../constants';

interface Props {
  setSelectedCategory: (cat: string) => void;
  setActiveTab: (tab: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Clinical Medicine": return Stethoscope;
    case "Biomedicine": return Dna;
    case "Life Sciences": return Leaf;
    case "Physics": return Atom;
    case "Engineering": return Cog;
    case "Social Sciences": return Users;
    case "Computer Science": return Cpu;
    default: return BookOpen;
  }
};

export const JournalsView: React.FC<Props> = ({ setSelectedCategory, setActiveTab }) => {
  const { t, getCategoryName } = useLanguage();

  return (
    <div className="bg-[#f7f7f7] min-h-screen py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#cf1f46] mb-4">{t('pages', 'journals_title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('pages', 'journals_desc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.filter(c => c !== "Tümü").map((cat, idx) => {
            const Icon = getCategoryIcon(cat);
            return (
              <div key={idx} onClick={() => {setSelectedCategory(cat); setActiveTab('home')}} className="bg-white p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer group">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mb-4 text-[#cf1f46]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-[#2d2d2d] group-hover:text-[#cf1f46] transition mb-2">GlobalİSTE: {getCategoryName(cat)}</h3>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">ISSN: 2024-{1000+idx}</div>
                <span className="text-[#cf1f46] text-sm font-bold flex items-center">View Articles <ChevronRight className="h-4 w-4 ml-1" /></span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};