import React, { useState } from 'react';
import { ChevronRight, Download, CheckCircle, FileCode, FileText, Bookmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Article } from '../types';

interface Props {
  article: Article | null;
  setActiveTab: (tab: string) => void;
  isSaved: boolean;
  toggleSave: (id: string) => void;
}

export const ArticleDetailView: React.FC<Props> = ({ article, setActiveTab, isSaved, toggleSave }) => {
  const { t, getCategoryName } = useLanguage();
  const [activeSection, setActiveSection] = useState<'abstract' | 'figures' | 'references'>('abstract');
  const [isDownloading, setIsDownloading] = useState<'pdf' | 'html' | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!article) return null;

  const handleDownload = (type: 'pdf' | 'html') => {
    setIsDownloading(type);
    setTimeout(() => {
      setIsDownloading(null);
      setDownloadSuccess(true);
      
      // Simulate download
      const element = document.createElement("a");
      const content = type === 'pdf' 
        ? `[PDF SIMULATION]\nTitle: ${article.title}\nAuthor: ${article.author}\nAbstract: ${article.abstract}`
        : `<html><body><h1>${article.title}</h1><p><strong>${article.author}</strong></p><p>${article.abstract}</p></body></html>`;
      
      const mimeType = type === 'pdf' ? 'text/plain' : 'text/html';
      const ext = type === 'pdf' ? 'pdf' : 'html';

      const file = new Blob([content], {type: mimeType});
      element.href = URL.createObjectURL(file);
      element.download = `${article.title.substring(0, 20).replace(/\s+/g, '_')}.${ext}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-12 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        <button onClick={() => setActiveTab('home')} className="text-[#cf1f46] hover:underline mb-4 text-sm flex items-center font-bold">
          <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Back to Search Results
        </button>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-3/4">
            <div className="mb-6">
              <span className="text-[#cf1f46] font-bold uppercase tracking-wider text-xs">{getCategoryName(article.category)}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 mb-4 leading-tight">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="font-bold text-[#222222]">{article.author}</span>
                <span>|</span>
                <span>Published: {article.date}</span>
                <span>|</span>
                <span>DOI: {article.doi || "10.1016/j.gl.2024.001"}</span>
              </div>
            </div>

            <div className="flex gap-4 border-b border-gray-200 mb-8 bg-white">
              <button 
                onClick={() => setActiveSection('abstract')}
                className={`pb-2 px-2 font-bold transition outline-none border-b-4 ${activeSection === 'abstract' ? 'border-[#cf1f46] text-[#2d2d2d]' : 'border-transparent text-gray-500 hover:text-[#cf1f46]'}`}
              >
                Abstract
              </button>
              <button 
                onClick={() => setActiveSection('figures')}
                className={`pb-2 px-2 font-bold transition outline-none border-b-4 ${activeSection === 'figures' ? 'border-[#cf1f46] text-[#2d2d2d]' : 'border-transparent text-gray-500 hover:text-[#cf1f46]'}`}
              >
                Figures
              </button>
              <button 
                onClick={() => setActiveSection('references')}
                className={`pb-2 px-2 font-bold transition outline-none border-b-4 ${activeSection === 'references' ? 'border-[#cf1f46] text-[#2d2d2d]' : 'border-transparent text-gray-500 hover:text-[#cf1f46]'}`}
              >
                References
              </button>
            </div>

            <div className="prose max-w-none text-gray-800 leading-relaxed text-lg min-h-[300px]">
              {activeSection === 'abstract' && (
                <div className="animate-fade-in-up">
                  <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">Abstract</h3>
                  <p className="mb-6">{article.abstract}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              )}
              
              {activeSection === 'figures' && (
                <div className="space-y-8 animate-fade-in-up">
                  <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">Figures & Data</h3>
                  {article.figures && article.figures.length > 0 ? (
                    article.figures.map((fig, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 border border-gray-200 rounded">
                        <img src={fig.url} alt={fig.caption} className="w-full h-auto max-h-[400px] object-cover mb-2" />
                        <p className="text-sm font-bold text-gray-700">{fig.caption}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-50 p-8 text-center text-gray-500 border border-gray-200 rounded">
                      No figures available for this article.
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'references' && (
                <div className="animate-fade-in-up">
                  <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">References</h3>
                  {article.references && article.references.length > 0 ? (
                    <ol className="list-decimal pl-5 space-y-2 text-base">
                      {article.references.map((ref, idx) => (
                        <li key={idx} className="pl-2">{ref}</li>
                      ))}
                    </ol>
                  ) : (
                    <div className="bg-gray-50 p-8 text-center text-gray-500 border border-gray-200 rounded">
                      References not available.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/4 space-y-6">
            <div className="bg-[#fcfcfc] p-6 border-l-4 border-[#cf1f46]">
              <h4 className="font-bold text-[#cf1f46] mb-4">Access this article</h4>
              
              <div className="space-y-3">
                 <button 
                  onClick={() => toggleSave(article.id)}
                  className={`w-full font-bold py-3 px-4 rounded-sm transition flex items-center justify-center gap-2 border ${
                      isSaved 
                      ? 'bg-gray-100 text-[#cf1f46] border-[#cf1f46]' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[#cf1f46] hover:text-[#cf1f46]'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} /> 
                  {isSaved ? t('library', 'saved') : t('library', 'save')}
                </button>

                <button 
                  onClick={() => handleDownload('pdf')}
                  disabled={!!isDownloading}
                  className="w-full bg-[#cf1f46] hover:bg-[#a61938] text-white font-bold py-3 px-4 rounded-sm transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading === 'pdf' ? (
                    <>Downloading...</>
                  ) : (
                    <>
                      <FileText className="h-5 w-5" /> Download PDF
                    </>
                  )}
                </button>

                <button 
                  onClick={() => handleDownload('html')}
                  disabled={!!isDownloading}
                  className="w-full bg-[#222222] hover:bg-black text-white font-bold py-3 px-4 rounded-sm transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading === 'html' ? (
                    <>Downloading...</>
                  ) : (
                    <>
                      <FileCode className="h-5 w-5" /> Download HTML
                    </>
                  )}
                </button>
              </div>

              {downloadSuccess && (
                <div className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-sm mt-3 flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" /> Download Complete
                </div>
              )}
              
              <p className="text-xs text-gray-500 text-center mt-3">Institutional Login Required</p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h4 className="font-bold text-sm text-gray-600 uppercase mb-4">Metrics</h4>
              <div className="flex justify-between text-sm mb-2 text-gray-800">
                <span>Views</span>
                <span className="font-bold">{article.views}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-800">
                <span>Citations</span>
                <span className="font-bold">14</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};