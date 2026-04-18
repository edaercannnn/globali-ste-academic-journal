import React, { useState } from 'react';
import { Trash2, ChevronLeft, ChevronRight, FileText, UserPlus, CheckSquare, Send, Archive, AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/mockDb';
import { Article } from '../types';

interface Props {
  articles: Article[];
  showNotification: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const ITEMS_PER_PAGE = 5;

type TabType = 'inbox' | 'review' | 'decision' | 'production' | 'published' | 'archive';

export const AdminView: React.FC<Props> = ({ articles, showNotification }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('inbox');
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const handleSeed = async () => {
    if (!user) return;
    await db.seedDemoData();
    showNotification("Demo data loaded", "success");
  };

  const updateStatus = async (id: string, newStatus: Article['status']) => {
    if (!user) return;
    try {
      await db.updateArticleStatus(id, newStatus);
      showNotification(`Status updated to ${newStatus}`, "info");
    } catch (error) {
      showNotification("Error updating status", "error");
    }
  };

  const confirmDelete = async () => {
    if (!user || !articleToDelete) return;
    
    try {
        await db.deleteArticle(articleToDelete);
        showNotification(t('admin', 'delete_success'), "success");
        // If deleting the last item on the last page, go back one page
        // We calculate pagination again since state updates might not be immediate
        const filtered = getFilteredArticles(); // This uses current state, but after delete it will be one less
        // Actually, db.deleteArticle is async and triggers parent update. 
        // We just need to handle page index safety.
        if (paginatedArticles.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
    } catch (error) {
        showNotification(t('admin', 'delete_error'), "error");
    } finally {
        setArticleToDelete(null);
    }
  };

  const handleAction = (action: string, id: string) => {
    // Mock actions
    switch (action) {
      case 'assign_reviewer':
        const reviewer = prompt("Enter reviewer email:");
        if (reviewer) {
          updateStatus(id, 'under_review');
          showNotification(`Reviewer ${reviewer} assigned`, "success");
        }
        break;
      case 'accept':
        updateStatus(id, 'accepted');
        break;
      case 'reject':
        updateStatus(id, 'rejected');
        break;
      case 'publish':
        updateStatus(id, 'published');
        break;
      case 'revision':
        updateStatus(id, 'revision');
        break;
      default:
        break;
    }
  };

  // Filter articles by tab
  const getFilteredArticles = () => {
    switch (activeTab) {
      case 'inbox': return articles.filter(a => a.status === 'pending');
      case 'review': return articles.filter(a => a.status === 'under_review' || a.status === 'revision');
      case 'decision': return articles.filter(a => a.status === 'under_review' || a.status === 'revision'); // Shared for demo
      case 'production': return articles.filter(a => a.status === 'accepted');
      case 'published': return articles.filter(a => a.status === 'published');
      case 'archive': return articles.filter(a => a.status === 'rejected');
      default: return [];
    }
  };

  const filteredArticles = getFilteredArticles();

  // Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(curr => curr + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(curr => curr - 1);
  };

  const getStatusLabel = (status: Article['status']) => {
    return t('admin', `status_${status}`);
  };

  const getStatusColor = (status: Article['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'revision': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 px-6 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2d2d2d]">{t('admin', 'title')}</h1>
            <p className="text-gray-500 mt-1">{t('admin', 'subtitle')}</p>
          </div>
          <button onClick={handleSeed} className="bg-white border border-[#cf1f46] text-[#cf1f46] px-4 py-2 rounded font-bold hover:bg-[#cf1f46] hover:text-white transition shadow-sm text-sm">
            {t('admin', 'demo_btn')}
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-t-lg mb-0 overflow-x-auto">
          <div className="flex text-sm font-medium text-gray-600 border-b border-gray-200">
            {[
              { id: 'inbox', icon: FileText },
              { id: 'review', icon: UserPlus },
              { id: 'production', icon: CheckSquare },
              { id: 'published', icon: Send },
              { id: 'archive', icon: Archive }
            ].map((tab) => {
               const TabIcon = tab.icon;
               const count = articles.filter(a => {
                 if (tab.id === 'inbox') return a.status === 'pending';
                 if (tab.id === 'review') return a.status === 'under_review' || a.status === 'revision';
                 if (tab.id === 'production') return a.status === 'accepted';
                 if (tab.id === 'published') return a.status === 'published';
                 if (tab.id === 'archive') return a.status === 'rejected';
                 return false;
               }).length;
               
               return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as TabType); setCurrentPage(1); }}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-[#cf1f46] text-[#cf1f46] bg-red-50/30' 
                      : 'border-transparent hover:text-[#cf1f46] hover:bg-gray-50'
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  <span>{t('admin', `tab_${tab.id}`)}</span>
                  {count > 0 && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-1">{count}</span>}
                </button>
               );
            })}
          </div>
        </div>

        {/* Main Table Area */}
        <div className="bg-white shadow-sm border border-gray-200 border-t-0 rounded-b-lg overflow-hidden min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b w-1/3">{t('admin', 'col_article')}</th>
                  <th className="p-4 border-b w-1/6">{t('admin', 'col_author')}</th>
                  <th className="p-4 border-b w-1/6">{t('admin', 'col_status')}</th>
                  <th className="p-4 border-b text-right w-1/3">{t('admin', 'col_actions')}</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-100">
                {paginatedArticles.length > 0 ? (
                  paginatedArticles.map(art => (
                    <tr key={art.id} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="font-bold text-[#222222] mb-1 line-clamp-2">{art.title}</div>
                        <div className="text-xs text-gray-400">{art.date} • {art.category}</div>
                      </td>
                      <td className="p-4 text-sm font-medium">{art.author}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-bold uppercase rounded border ${getStatusColor(art.status)}`}>
                          {getStatusLabel(art.status)}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          
                          {/* Inbox Actions */}
                          {art.status === 'pending' && (
                            <>
                              <button onClick={() => handleAction('assign_reviewer', art.id)} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 font-bold border border-blue-100">
                                {t('admin', 'btn_assign_reviewer')}
                              </button>
                              <button onClick={() => handleAction('reject', art.id)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100 font-bold border border-red-100">
                                {t('admin', 'btn_reject')}
                              </button>
                            </>
                          )}

                          {/* Review Actions */}
                          {(art.status === 'under_review' || art.status === 'revision') && (
                            <>
                              <button onClick={() => handleAction('accept', art.id)} className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded hover:bg-green-100 font-bold border border-green-100">
                                Accept
                              </button>
                              <button onClick={() => handleAction('revision', art.id)} className="text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded hover:bg-orange-100 font-bold border border-orange-100">
                                Revise
                              </button>
                              <button onClick={() => handleAction('reject', art.id)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100 font-bold border border-red-100">
                                {t('admin', 'btn_reject')}
                              </button>
                            </>
                          )}

                          {/* Production Actions */}
                          {art.status === 'accepted' && (
                            <button onClick={() => handleAction('publish', art.id)} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 font-bold shadow-sm">
                              {t('admin', 'btn_publish')}
                            </button>
                          )}

                          {/* General Actions */}
                          <button onClick={() => setArticleToDelete(art.id)} className="p-2 text-gray-400 hover:text-red-600 transition rounded-full hover:bg-red-50" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FileText className="h-12 w-12 mb-3 opacity-20" />
                        <p>No articles found in this section.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredArticles.length > 0 && (
            <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
              <span className="text-xs text-gray-500">
                Showing <span className="font-bold">{startIndex + 1}</span> to <span className="font-bold">{Math.min(startIndex + ITEMS_PER_PAGE, filteredArticles.length)}</span> of <span className="font-bold">{filteredArticles.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={goToPrevPage} 
                  disabled={currentPage === 1}
                  className="p-1.5 border border-gray-300 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition text-gray-600"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-bold text-gray-700 px-2">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 border border-gray-300 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition text-gray-600"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-6 text-center">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('admin', 'confirm_delete')}</h3>
                    <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The article will be permanently removed from the database.</p>
                    
                    <div className="flex gap-3 justify-center">
                        <button 
                            onClick={() => setArticleToDelete(null)}
                            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmDelete}
                            className="px-5 py-2.5 bg-[#cf1f46] text-white font-bold rounded hover:bg-[#a61938] transition flex items-center gap-2 shadow-sm"
                        >
                            <Trash2 className="h-4 w-4" /> Delete Article
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};