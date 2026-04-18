# GlobalİSTE Akademik Dergi Platformu

Bu proje, İskenderun Teknik Üniversitesi (İSTE) için tasarlanmış modern, çok dilli bir akademik dergi yönetim sistemidir.

## Özellikler

*   **Çok Dilli Destek:** İngilizce ve Türkçe dil seçenekleri.
*   **Makale Gönderimi:** Yazarlar için kolaylaştırılmış makale gönderim sihirbazı.
*   **Editör Hub (Admin Paneli):** Makaleleri yayınlama, silme ve yönetme.
*   **Yapay Zeka Asistanı (Gemini):** Kullanıcı sorularını yanıtlayan entegre chatbot.
*   **Dinamik Arama:** Anlık filtreleme ve sonuçlara odaklanma.
*   **Hibrit Veritabanı:** Supabase (Bulut) veya Mock Data (Yerel) ile çalışabilme.

## Kurulum ve Çalıştırma

1.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

2.  Projeyi başlatın:
    ```bash
    npm run dev
    ```

## 🗄️ Veritabanı Kurulumu (Supabase)

Bu proje varsayılan olarak "Mock Modu"nda (sahte veri ile) çalışır. Gerçek bir veritabanı bağlamak için aşağıdaki adımları izleyin:

### 1. Supabase Hesabı ve Projesi Oluşturun
1.  [Supabase.com](https://supabase.com) adresine gidin ve ücretsiz bir hesap oluşturun.
2.  "New Project" butonuna tıklayın ve projenize bir isim verin.

### 2. Tabloları Oluşturun
1.  Supabase panelinde sol menüden **SQL Editor** kısmına gelin.
2.  "New Query" diyerek boş bir sayfa açın.
3.  Proje dosylarında bulunan `db_schema.sql` dosyasının içeriğini kopyalayın ve buraya yapıştırın.
4.  Sağ alttaki **Run** butonuna basarak tabloyu oluşturun.

### 3. API Anahtarlarını Alın
1.  Supabase panelinde **Project Settings** (Dişli simgesi) -> **API** yolunu izleyin.
2.  `Project URL` ve `anon` `public` anahtarlarını kopyalayın.

### 4. Projeye Bağlayın
Projenin ana dizininde (root folder) `.env` adında bir dosya oluşturun ve kopyaladığınız bilgileri aşağıdaki gibi yapıştırın:

```env
VITE_SUPABASE_URL=https://sizin-proje-id.supabase.co
VITE_SUPABASE_ANON_KEY=sizin-anon-key-buraya
```

### 5. Yeniden Başlatın
Uygulamayı durdurup tekrar `npm run dev` ile başlatın. Konsolda "Supabase connection initialized" yazısını görmelisiniz. Artık eklediğiniz makaleler buluta kaydedilecektir.

## Kullanılan Teknolojiler

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **İkonlar:** Lucide React
*   **AI:** Google Gemini API
*   **Veritabanı:** Supabase (PostgreSQL)

## Geliştirici Notları

*   Admin paneline erişmek için "Giriş Yap" butonuna tıklamanız yeterlidir (otomatik admin girişi simüle edilir).
*   Demo verilerini yüklemek için Editör Paneli'ndeki "Demo Veri Yükle" butonunu kullanın. Bu buton Supabase bağlıysa veritabanına, değilse yerel hafızaya veri yazar.
 
# By AYMEN IBRAHIM HMOOD
* Gitub: https://github.com/aimniv
* Linkedin: https://www.linkedin.com/in/aymen-ibrahim-hmood-337977293/