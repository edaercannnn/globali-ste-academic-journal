import React, { useState, useRef } from 'react';
import { Search, Edit3, CheckCircle, Eye, Library, Loader2, BookOpen, Stethoscope, Dna, Leaf, Atom, Cog, Users, Cpu, ChevronRight, Download, Bookmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Article } from '../types';
import { CATEGORIES } from '../constants';

interface Props {
  articles: Article[];
  loading: boolean;
  setActiveTab: (tab: string) => void;
  setSelectedArticleId: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  savedArticleIds: Set<string>;
  toggleSave: (id: string) => void;
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

export const HomeView: React.FC<Props> = ({ 
  articles, 
  loading, 
  setActiveTab, 
  setSelectedArticleId, 
  selectedCategory, 
  setSelectedCategory,
  savedArticleIds,
  toggleSave
}) => {
  const { t, language, getCategoryName } = useLanguage();
  const [searchInput, setSearchInput] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredArticles = articles.filter(art => 
    art.status === 'published' &&
    (selectedCategory === "Tümü" || art.category === selectedCategory) &&
    (art.title.toLowerCase().includes(activeSearchTerm.toLowerCase()) || art.author.toLowerCase().includes(activeSearchTerm.toLowerCase()))
  );

  const handleSearchClick = () => {
    if (isSearching) return;
    
    setIsSearching(true);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Simulate network request/processing time
    setTimeout(() => {
      setActiveSearchTerm(searchInput);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-sans text-[#2d2d2d]">
      {/* Hero - ISTE Brand Color Background */}
      <div className="bg-[#cf1f46] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-[1000px] mx-auto px-6 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero', 'title')}</h1>
          <p className="text-lg mb-10 text-red-100 max-w-2xl mx-auto">{t('hero', 'subtitle')}</p>
          
          {/* Main Search Bar */}
          <div className="bg-white p-2 rounded flex shadow-lg max-w-3xl mx-auto relative items-center">
            <Search className="absolute left-6 text-gray-400 h-5 w-5 pointer-events-none" />
            <input 
              type="text" 
              placeholder={t('hero', 'search_placeholder')}
              className="flex-grow pl-12 pr-4 py-3 text-gray-800 bg-white outline-none text-lg rounded-l w-full disabled:opacity-70 disabled:bg-gray-50"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              disabled={isSearching}
            />
            <button 
              onClick={handleSearchClick}
              disabled={isSearching}
              className={`bg-[#222222] text-white px-8 py-3 font-bold rounded hover:bg-black transition flex items-center whitespace-nowrap min-w-[140px] justify-center ${isSearching ? 'opacity-90 cursor-wait' : ''}`}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" /> {t('hero', 'search_btn')}
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" /> {t('hero', 'search_btn')}
                </>
              )}
            </button>
          </div>
          <div className="mt-4 text-sm text-red-100 flex justify-center gap-6">
            <button className="hover:text-white underline">{t('hero', 'advanced_search')}</button>
            <button className="hover:text-white underline" onClick={() => setActiveTab('journals')}>{t('hero', 'browse_journals')}</button>
          </div>
        </div>
      </div>

      {/* Resources Hubs Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <h3 className="text-lg font-bold text-[#2d2d2d] mb-6 uppercase tracking-wider">{t('hubs', 'title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group cursor-pointer" onClick={() => setActiveTab('researchers')}>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-50 p-2 rounded-full text-[#cf1f46]"><Edit3 className="h-6 w-6"/></div>
                <h4 className="font-bold text-[#cf1f46] group-hover:underline text-lg">{t('hubs', 'authors_title')}</h4>
              </div>
              <p className="text-sm text-gray-600">{t('hubs', 'authors_desc')}</p>
            </div>
            <div className="group cursor-pointer" onClick={() => setActiveTab('admin')}>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-50 p-2 rounded-full text-green-700"><CheckCircle className="h-6 w-6"/></div>
                <h4 className="font-bold text-[#cf1f46] group-hover:underline text-lg">{t('hubs', 'editors_title')}</h4>
              </div>
              <p className="text-sm text-gray-600">{t('hubs', 'editors_desc')}</p>
            </div>
            <div className="group cursor-pointer" onClick={() => setActiveTab('researchers')}>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-100 p-2 rounded-full text-[#222222]"><Eye className="h-6 w-6"/></div>
                <h4 className="font-bold text-[#cf1f46] group-hover:underline text-lg">{t('hubs', 'reviewers_title')}</h4>
              </div>
              <p className="text-sm text-gray-600">{t('hubs', 'reviewers_desc')}</p>
            </div>
            <div className="group cursor-pointer" onClick={() => setActiveTab('librarians')}>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-50 p-2 rounded-full text-blue-700"><Library className="h-6 w-6"/></div>
                <h4 className="font-bold text-[#cf1f46] group-hover:underline text-lg">{t('hubs', 'librarians_title')}</h4>
              </div>
              <p className="text-sm text-gray-600">{t('hubs', 'librarians_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 py-12" ref={resultsRef}>
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-300">
              <h2 className="text-3xl font-bold text-[#cf1f46]">{t('feed', 'highlights')}</h2>
              <select 
                className="bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{getCategoryName(cat)}</option>)}
              </select>
            </div>

            {(loading || isSearching) ? (
              <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
                <Loader2 className="h-10 w-10 text-[#cf1f46] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Searching articles...</p>
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid gap-6 animate-fade-in-up">
                {filteredArticles.map((article) => {
                  const Icon = getCategoryIcon(article.category);
                  const isSaved = savedArticleIds.has(article.id);
                  return (
                    <div key={article.id} onClick={() => {setSelectedArticleId(article.id); setActiveTab('article-detail')}} className="bg-white border-l-4 border-[#cf1f46] shadow-sm p-6 hover:shadow-md transition cursor-pointer flex gap-6 group relative">
                      {/* Bookmark Icon */}
                      <div className="absolute top-4 right-4 z-10">
                         <button 
                            onClick={(e) => { e.stopPropagation(); toggleSave(article.id); }}
                            className={`p-2 rounded-full hover:bg-gray-100 transition ${isSaved ? 'text-[#cf1f46]' : 'text-gray-400'}`}
                            title={isSaved ? "Remove from library" : "Save to library"}
                         >
                            <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                         </button>
                      </div>

                      <div className="hidden sm:flex flex-col items-center justify-center w-24 h-32 bg-gray-50 border border-gray-200 text-gray-400 shrink-0 overflow-hidden">
                        {article.image ? (
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Icon className="h-8 w-8 mb-2" />
                            <span className="text-[10px] uppercase font-bold text-center px-1">{getCategoryName(article.category)}</span>
                          </>
                        )}
                      </div>
                      <div className="flex-grow pr-10">
                        <div className="flex gap-2 text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">
                          <span className="text-[#cf1f46]">Original Research</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#2d2d2d] group-hover:text-[#cf1f46] transition mb-2 leading-snug">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.abstract}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800">{article.author}</span>
                          <div className="flex gap-4">
                            <button className="text-[#cf1f46] hover:underline text-sm font-bold flex items-center">
                              {t('feed', 'view_article')} <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                            <button className="text-gray-500 hover:text-[#cf1f46] transition">
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white p-12 text-center border border-gray-200">
                <p className="text-gray-500 text-lg mb-4">{t('feed', 'no_articles')}</p>
                <button onClick={() => {setSearchInput(''); setActiveSearchTerm(''); setSelectedCategory('Tümü')}} className="text-[#cf1f46] font-bold hover:underline">{t('feed', 'clear_filters')}</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/4 space-y-8">
            {/* Action Card */}
            <div className="bg-white p-6 border-t-4 border-[#cf1f46] shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-[#2d2d2d]">{t('nav', 'submit')}</h3>
              <p className="text-sm text-gray-600 mb-6">Publish your research with us and reach a global audience. We offer rigorous peer review and fast publication.</p>
              <button onClick={() => setActiveTab('submit')} className="w-full bg-[#cf1f46] text-white font-bold py-3 hover:bg-[#a61938] transition">
                Start Submission
              </button>
            </div>

            {/* Subject Browser */}
            <div className="bg-white p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-[#2d2d2d] border-b border-gray-100 pb-2">{t('feed', 'explore_subject')}</h3>
              <div className="space-y-2">
                {CATEGORIES.filter(c => c !== "Tümü").map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className="block w-full text-left text-[#cf1f46] hover:text-[#222222] text-sm py-1 hover:underline decoration-1">
                    {getCategoryName(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#fcfcfc] p-6 border border-[#e1e1e1]">
              <h4 className="font-bold text-[#cf1f46] mb-4">GlobalİSTE Metrics</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Impact Factor</span>
                <span className="font-bold text-[#222222]">5.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CiteScore</span>
                <span className="font-bold text-[#222222]">9.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};