import { Article } from './types';

export const CATEGORIES = ["Tümü", "Clinical Medicine", "Biomedicine", "Life Sciences", "Physics", "Engineering", "Social Sciences", "Computer Science"];

export const CATEGORIES_TRANSLATION: Record<string, Record<string, string>> = {
  all: { en: "All", tr: "Tümü" },
  "Clinical Medicine": { en: "Clinical Medicine", tr: "Klinik Tıp" },
  "Biomedicine": { en: "Biomedicine", tr: "Biyotıp" },
  "Life Sciences": { en: "Life Sciences", tr: "Yaşam Bilimleri" },
  "Physics": { en: "Physics", tr: "Fizik" },
  "Engineering": { en: "Engineering", tr: "Mühendislik" },
  "Social Sciences": { en: "Social Sciences", tr: "Sosyal Bilimler" },
  "Computer Science": { en: "Computer Science", tr: "Bilgisayar Bilimleri" }
};

export const DEMO_ARTICLES: Article[] = [
  {
    id: 'demo-1',
    title: "CRISPR-Cas9 Gene Editing: Ethical Implications in Human Embryos",
    author: "Dr. Sarah Jenkins",
    category: "Biomedicine",
    abstract: "This study explores the moral and ethical landscape of germline editing using CRISPR technology. We analyze current international regulations and propose a new framework for ethical oversight in clinical applications.",
    image: "https://picsum.photos/800/600",
    date: "2024-01-15",
    views: 1240,
    downloads: 450,
    status: "published",
    doi: "10.1016/j.biomed.2024.01.001",
    references: [
      "Doudna, J. A., & Charpentier, E. (2014). The new frontier of genome engineering with CRISPR-Cas9. Science, 346(6213).",
      "Baltimore, D., et al. (2015). A prudent path forward for genomic engineering and germline gene modification. Science, 348(6230), 36-38.",
      "Lander, E. S. (2016). The heroes of CRISPR. Cell, 164(1-2), 18-28."
    ],
    figures: [
      { url: "https://picsum.photos/800/400?random=1", caption: "Figure 1: Mechanism of CRISPR-Cas9 action." },
      { url: "https://picsum.photos/800/400?random=2", caption: "Figure 2: Survey of ethical guidelines across 20 countries." }
    ]
  },
  {
    id: 'demo-2',
    title: "Quantum Entanglement in Macroscopic Systems",
    author: "Prof. Akira Tanaka",
    category: "Physics",
    abstract: "We demonstrate sustained entanglement between two macroscopic mechanical oscillators. The experiment was conducted at 15mK and shows violation of Bell's inequalities for massive objects.",
    image: "https://picsum.photos/800/601",
    date: "2024-02-02",
    views: 890,
    downloads: 210,
    status: "published",
    doi: "10.1016/j.phys.2024.02.012",
    references: [
      "Einstein, A., Podolsky, B., & Rosen, N. (1935). Can quantum-mechanical description of physical reality be considered complete? Physical review, 47(10), 777.",
      "Aspect, A., Dalibard, J., & Roger, G. (1982). Experimental test of Bell's inequalities using time-varying analyzers. Physical review letters, 49(25), 1804."
    ],
    figures: [
      { url: "https://picsum.photos/800/400?random=3", caption: "Figure 1: Schematic of the optomechanical system." }
    ]
  },
  {
    id: 'demo-3',
    title: "AI in Healthcare: A 5-Year Systematic Review",
    author: "Dr. Elena Rodriguez",
    category: "Computer Science",
    abstract: "A comprehensive review of deep learning algorithms in radiology. We analyzed over 500 papers published between 2019 and 2024 to determine the efficacy of AI diagnostics compared to human experts.",
    image: "https://picsum.photos/800/602",
    date: "2024-03-10",
    views: 2100,
    downloads: 800,
    status: "under_review",
    doi: "10.1016/j.cs.2024.03.045",
    references: [
      "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. nature, 521(7553), 436-444.",
      "Esteva, A., et al. (2017). Dermatologist-level classification of skin cancer with deep neural networks. Nature, 542(7639), 115-118."
    ],
    figures: [
      { url: "https://picsum.photos/800/400?random=4", caption: "Figure 1: Growth of AI publications in radiology." },
      { url: "https://picsum.photos/800/400?random=5", caption: "Figure 2: Performance comparison matrix." }
    ]
  },
  {
    id: 'demo-4',
    title: "Sustainable Urban Planning in Post-Industrial Cities",
    author: "Marcus Aurelius",
    category: "Engineering",
    abstract: "Analysis of green infrastructure integration in Detroit and Manchester.",
    date: "2024-03-15",
    views: 50,
    status: 'pending',
    downloads: 0
  },
  {
    id: 'demo-5',
    title: "The Impact of Social Media on Adolescent Mental Health",
    author: "Dr. Jean Twenge",
    category: "Social Sciences",
    abstract: "Longitudinal study of 5000 teenagers regarding screen time and depression.",
    date: "2024-03-12",
    views: 120,
    status: 'revision',
    downloads: 10
  }
];

export const TRANSLATIONS = {
  en: {
    brand: "GlobalİSTE",
    nav: {
      home: "Home",
      journals: "Journals & Books",
      submit: "Submit your paper",
      dashboard: "Editor Panel",
      researchers: "For Authors & Reviewers",
      librarians: "For Librarians",
      editors: "For Editors",
      about: "About Us",
      signin: "Sign in",
      help: "Help",
      lang_select: "Select region/language",
      library: "My Library"
    },
    hero: {
      title: "Move from curiosity to discovery",
      subtitle: "Innovative solutions that help advance human progress in science and healthcare.",
      search_placeholder: "Search for peer-reviewed journals, articles, book chapters and open access content",
      search_btn: "Search",
      advanced_search: "Advanced search",
      browse_journals: "Browse journals"
    },
    hubs: {
      title: "Resources for impact makers",
      authors_title: "Authors",
      authors_desc: "Launch your publication journey today. Resources to promote your research.",
      editors_title: "Editors",
      editors_desc: "Empowering future breakthroughs. Tools to support your editorial role.",
      reviewers_title: "Reviewers",
      reviewers_desc: "Your expertise strengthens confidence in tomorrow's science.",
      librarians_title: "Librarians",
      librarians_desc: "Empowering knowledge. Access management and usage insights."
    },
    feed: {
      highlights: "Latest Insights",
      no_articles: "No results found matching your criteria.",
      clear_filters: "Clear filters",
      explore_subject: "Browse by Subject",
      view_article: "View Article",
      download_pdf: "Download PDF"
    },
    submit: {
      title: "Welcome to the Author Hub",
      subtitle: "Launch your publication journey today so your research can help make a better future.",
      step: "Submission Step 1",
      subject: "Select Discipline",
      author: "Lead Author",
      manuscript_title: "Manuscript Title",
      abstract: "Abstract",
      keywords: "Keywords",
      doi: "DOI (Optional)",
      file_label: "Upload Manuscript",
      file_desc: "PDF, DOCX (Max 20MB)",
      button: "Submit Paper",
      success: "Submission successful.",
      error: "Error submitting paper."
    },
    admin: {
      title: "Editorial Dashboard",
      subtitle: "Manage the entire publication lifecycle.",
      tab_inbox: "Inbox",
      tab_review: "Under Review",
      tab_decision: "Decision Required",
      tab_production: "Production",
      tab_published: "Published",
      tab_archive: "Archive",
      
      status_pending: "Pre-check",
      status_under_review: "In Review",
      status_revision: "Revision",
      status_accepted: "Accepted",
      status_rejected: "Rejected",
      status_published: "Published",
      
      col_article: "Article",
      col_author: "Author",
      col_status: "Status",
      col_actions: "Actions",
      
      btn_assign_reviewer: "Assign Reviewer",
      btn_decision: "Make Decision",
      btn_publish: "Publish",
      btn_reject: "Reject",
      btn_view_files: "Files",
      
      demo_btn: "Load Demo Data",
      confirm_delete: "Are you sure you want to delete this article?",
      delete_success: "Article deleted successfully.",
      delete_error: "Error deleting article."
    },
    library: {
      title: "My Library",
      desc: "Your personal collection of saved articles.",
      empty: "Your library is empty. Save articles to read them later.",
      save: "Save to Library",
      saved: "Saved to Library",
      remove: "Remove"
    },
    footer: {
      rights: "Copyright © 2024 GlobalİSTE, except certain content provided by third parties.",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      cookies: "Cookie Notice",
      sitemap: "Sitemap",
      contact: "Contact Us",
      help: "Help Center",
      careers: "Careers"
    },
    pages: {
      journals_title: "Our Journals",
      journals_desc: "Explore our portfolio of high-impact journals across all disciplines.",
      researchers_title: "Author & Reviewer Hub",
      researchers_content: "Whether you are writing your next article or reviewing a peer's work, we have the resources to support you.",
      author_section_title: "For Authors",
      author_section_desc: "Nine free resources to promote your research. Understand our policies and guidelines to help you publish ethically.",
      reviewer_section_title: "For Reviewers",
      reviewer_section_desc: "Peer review is at the heart of the academic publishing process. Access the Reviewer Hub to manage your entire review experience.",
      
      librarians_title: "Librarian Hub",
      librarians_content: "We partner with libraries to ensure seamless access to critical research. Discover our institutional subscription packages, usage statistics portals, and open access agreements.",
      
      about_title: "About GlobalİSTE",
      about_content: "GlobalİSTE is a leading global leader for advanced information and decision support in science and healthcare. We help researchers make new discoveries and collaborate with their colleagues.",
      
      contact_title: "Contact Us",
      contact_content: "Get in touch with our editorial or support teams for assistance.",
      privacy_title: "Privacy Policy",
      privacy_content: "Four ways you can use the GlobalİSTE Privacy Center. How we provide transparency for your personal data.",
      terms_title: "Terms and Conditions",
      terms_content: "Welcome to GlobalİSTE. By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.",
      help_title: "Help Center",
      help_content: "Find answers to frequently asked questions about submission, peer review, open access, and account management.",
      scopus_title: "Scopus",
      scopus_content: "Scopus is the largest abstract and citation database of peer-reviewed literature: scientific journals, books and conference proceedings.",
      sciencedirect_title: "ScienceDirect",
      sciencedirect_content: "ScienceDirect is the world's leading source for scientific, technical, and medical research. Explore journals, books and articles.",
      mendeley_title: "Mendeley",
      mendeley_content: "Mendeley is a free reference manager and academic social network that can help you organize your research, collaborate with others online, and discover the latest research.",
      find_journal_title: "Find a Journal",
      find_journal_content: "Match your manuscript with the most suitable journals using our advanced journal finder tool based on title and abstract.",
      author_webshop_title: "Author Webshop",
      author_webshop_content: "Professional language editing, translation, and illustration services to help you prepare your manuscript for submission."
    },
    login: {
      title: "Sign in",
      subtitle: "Enter your credentials to access your account.",
      email: "Email",
      password: "Password",
      btn: "Sign In",
      success: "Signed in successfully."
    },
    modal: {
        title: "Choose region and language",
        desc: "Select another country or region to use content specific to your location or visit the global website.",
        americas: "Americas/Global",
        europe: "Europe/Middle East",
        asia: "Asia Pacific"
    }
  },
  tr: {
    brand: "GlobalİSTE",
    nav: {
      home: "Ana Sayfa",
      journals: "Dergiler ve Kitaplar",
      submit: "Makale Gönder",
      dashboard: "Editör Paneli",
      researchers: "Yazarlar ve Hakemler",
      librarians: "Kütüphaneciler",
      editors: "Editörler İçin",
      about: "Hakkımızda",
      signin: "Giriş Yap",
      help: "Yardım",
      lang_select: "Bölge/dil seçin",
      library: "Kütüphanem"
    },
    hero: {
      title: "Meraktan keşfe yolculuk", 
      subtitle: "Bilim ve sağlık alanında insanlığın ilerlemesine yardımcı olan yenilikçi çözümler.",
      search_placeholder: "Hakemli dergiler, makaleler ve açık erişim içeriklerde arayın",
      search_btn: "Ara",
      advanced_search: "Gelişmiş arama",
      browse_journals: "Dergilere Göz At"
    },
    hubs: {
      title: "Etki yaratanlar için kaynaklar",
      authors_title: "Yazarlar",
      authors_desc: "Yayın yolculuğunuzu bugün başlatın. Araştırmanızı tanıtmak için kaynaklar.",
      editors_title: "Editörler",
      editors_desc: "Geleceğin buluşlarını güçlendirmek. Editöryal rolünüzü destekleyecek araçlar.",
      reviewers_title: "Hakemler",
      reviewers_desc: "Uzmanlığınız yarının bilimine olan güveni güçlendirir.",
      librarians_title: "Kütüphaneciler",
      librarians_desc: "Bilgiyi güçlendirmek. Erişim yönetimi ve kullanım içgörüleri."
    },
    feed: {
      highlights: "Son Yayınlar",
      no_articles: "Kriterlerinize uygun sonuç bulunamadı.",
      clear_filters: "Filtreleri Temizle",
      explore_subject: "Konuya Göre Göz At",
      view_article: "Makaleyi Görüntüle",
      download_pdf: "PDF İndir"
    },
    submit: {
      title: "Yazar Merkezine Hoş Geldiniz",
      subtitle: "Yayın yolculuğunuzu bugün başlatın, araştırmanız daha iyi bir geleceğe katkıda bulunsun.",
      step: "Gönderim Adımı 1",
      subject: "Disiplin Seçin",
      author: "Sorumlu Yazar",
      manuscript_title: "Makale Başlığı",
      abstract: "Özet",
      keywords: "Anahtar Kelimeler",
      doi: "DOI (İsteğe Bağlı)",
      file_label: "Dosya Yükle",
      file_desc: "PDF, DOCX (Maks 20MB)",
      button: "Makaleyi Gönder",
      success: "Gönderim başarılı.",
      error: "Gönderim hatası."
    },
    admin: {
      title: "Editör Paneli",
      subtitle: "Tüm yayın sürecini yönetin.",
      tab_inbox: "Gelen Kutusu",
      tab_review: "Değerlendirmede",
      tab_decision: "Karar Bekleyen",
      tab_production: "Yayım Süreci",
      tab_published: "Yayınlanan",
      tab_archive: "Arşiv",
      
      status_pending: "Ön Kontrol",
      status_under_review: "Değerlendirmede",
      status_revision: "Revizyon",
      status_accepted: "Kabul Edildi",
      status_rejected: "Reddedildi",
      status_published: "Yayınlandı",
      
      col_article: "Makale",
      col_author: "Yazar",
      col_status: "Durum",
      col_actions: "İşlemler",
      
      btn_assign_reviewer: "Hakem Ata",
      btn_decision: "Karar Ver",
      btn_publish: "Yayınla",
      btn_reject: "Reddet",
      btn_view_files: "Dosyalar",
      
      demo_btn: "Demo Veri Yükle",
      confirm_delete: "Bu makaleyi silmek istediğinizden emin misiniz?",
      delete_success: "Makale başarıyla silindi.",
      delete_error: "Makale silinirken hata oluştu."
    },
    library: {
      title: "Kütüphanem",
      desc: "Kaydettiğiniz makalelerden oluşan kişisel koleksiyonunuz.",
      empty: "Kütüphaneniz boş. Daha sonra okumak için makaleleri kaydedin.",
      save: "Kütüphaneye Kaydet",
      saved: "Kütüphaneye Kaydedildi",
      remove: "Çıkar"
    },
    footer: {
      rights: "Telif Hakkı © 2024 GlobalİSTE, üçüncü şahıslar tarafından sağlanan bazı içerikler hariç.",
      privacy: "Gizlilik Politikası",
      terms: "Şartlar ve Koşullar",
      cookies: "Çerez Bildirimi",
      sitemap: "Site Haritası",
      contact: "İletişim",
      help: "Yardım Merkezi",
      careers: "Kariyer"
    },
    pages: {
      journals_title: "Dergilerimiz",
      journals_desc: "Tüm disiplinlerdeki yüksek etkili dergi portföyümüzü keşfedin.",
      researchers_title: "Yazar ve Hakem Merkezi",
      researchers_content: "İster bir sonraki makalenizi yazıyor olun, ister bir meslektaşınızın çalışmasını inceliyor olun, sizi destekleyecek kaynaklarımız var.",
      author_section_title: "Yazarlar İçin",
      author_section_desc: "Araştırmanızı tanıtmak için dokuz ücretsiz kaynak. Etik bir şekilde yayın yapmanıza yardımcı olacak politikalarımızı ve yönergelerimizi anlayın.",
      reviewer_section_title: "Hakemler İçin",
      reviewer_section_desc: "Hakem değerlendirmesi akademik yayın sürecinin kalbidir. Tüm inceleme deneyiminizi yönetmek için Hakem Merkezi'ne erişin.",
      
      librarians_title: "Kütüphaneci Merkezi",
      librarians_content: "Kritik araştırmalara sorunsuz erişim sağlamak için kütüphanelerle ortaklık yapıyoruz. Kurumsal abonelik paketlerimizi keşfedin.",
      
      about_title: "GlobalİSTE Hakkında",
      about_content: "GlobalİSTE, bilim ve sağlık alanında gelişmiş bilgi ve karar desteği konusunda küresel bir liderdir. Araştırmacıların yeni keşifler yapmasına yardımcı oluyoruz.",
      
      contact_title: "İletişim",
      contact_content: "Yardım için editör veya destek ekiplerimizle iletişime geçin.",
      privacy_title: "Gizlilik Politikası",
      privacy_content: "GlobalİSTE Gizlilik Merkezi'ni kullanmanın dört yolu. Kişisel verileriniz için nasıl şeffaflık sağlıyoruz.",
      terms_title: "Kullanım Şartları",
      terms_content: "GlobalİSTE'ye hoş geldiniz. Bu web sitesine erişerek, aşağıdaki kullanım şartlarını kabul etmiş olursunuz.",
      help_title: "Yardım Merkezi",
      help_content: "Gönderim, hakem değerlendirmesi, açık erişim ve hesap yönetimi hakkında sıkça sorulan soruların yanıtlarını bulun.",
      scopus_title: "Scopus",
      scopus_content: "Scopus, hakemli literatürün en büyük özet ve atıf veritabanıdır: bilimsel dergiler, kitaplar ve konferans bildirileri.",
      sciencedirect_title: "ScienceDirect",
      sciencedirect_content: "ScienceDirect, bilimsel, teknik ve tıbbi araştırmalar için dünyanın önde gelen kaynağıdır. Dergileri, kitapları ve makaleleri keşfedin.",
      mendeley_title: "Mendeley",
      mendeley_content: "Mendeley, araştırmanızı düzenlemenize, çevrimiçi işbirliği yapmanıza ve en son araştırmaları keşfetmenize yardımcı olan ücretsiz bir referans yöneticisi ve akademik sosyal ağdır.",
      find_journal_title: "Dergi Bulucu",
      find_journal_content: "Başlık ve özetinize dayanarak makalenizi en uygun dergilerle eşleştirmek için gelişmiş dergi bulma aracımızı kullanın.",
      author_webshop_title: "Yazar Mağazası",
      author_webshop_content: "Makalenizi gönderime hazırlamanıza yardımcı olacak profesyonel dil düzenleme, çeviri ve illüstrasyon hizmetleri."
    },
    login: {
      title: "Giriş Yap",
      subtitle: "Hesabınıza erişmek için kimlik bilgilerinizi girin.",
      email: "E-posta",
      password: "Şifre",
      btn: "Giriş Yap",
      success: "Başarıyla giriş yapıldı."
    },
    modal: {
        title: "Bölge ve dil seçin",
        desc: "Konumunuza özel içerikleri kullanmak için başka bir ülke veya bölge seçin veya küresel web sitesini ziyaret edin.",
        americas: "Amerika/Küresel",
        europe: "Avrupa/Orta Doğu",
        asia: "Asya Pasifik"
    }
  }
};