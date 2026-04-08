/**
 * @file script.js
 * @description Dinamik Portfolyo Yönetimi, Daktilo Efekti ve Tema Kontrolü
 */

// 1. Proje Verileri (Veri setini daha detaylı hale getirdik)
const tumProjeler = [
    { 
        ad: "Last Summer Kurumsal Kimlik", 
        kategori: "tasarim", // Küçük harf ve Türkçe karakterden kaçınmak filtrelemede daha güvenlidir
        detay: "Adobe Illustrator ile hazırlanan teknoloji odaklı marka çalışması.",
        ikon: "bi-palette" 
    },
    { 
        ad: "Tablo ve Form Uygulaması", 
        kategori: "web", 
        detay: "HTML5 ve CSS3 standartlarına uygun veri giriş paneli.",
        ikon: "bi-table" 
    },
    { 
        ad: "Kişisel Portfolyo Blog", 
        kategori: "web", 
        detay: "Vanilla JS ile geliştirilmiş dinamik içerik yönetimli web sitesi.",
        ikon: "bi-code-slash" 
    },
    { 
        ad: "python ile QR oluşturucu", 
        kategori: "web", 
        detay: "ptyhon ve QR code kütüphanesi ile verilerin linkleri QR kodlara dönüştüren fonksiyonel araç.",
        ikon: "bi-check2-square"  
    },
    { 
        ad: "", 
        kategori: "mobil", 
        detay: "Responsive (Mobil uyumlu) CSS Grid yapısıyla geliştirilen finans aracı.",
        ikon: "bi-phone" 
    }
];

// DOM Elementleri (Sürekli sorgulamamak için değişkene atıyoruz - Performans dostu)
const projeListesiDiv = document.getElementById("projeListesi");
const daktiloElementi = document.getElementById("daktiloYazi");
const temaButonu = document.getElementById("temaTetikleyici"); // HTML'deki ID ile eşleşmeli

// 2. Projeleri Ekrana Basma Fonksiyonu
// Liste boş gelirse veya undefined olursa hata vermemesi için varsayılan değer ekledik.
const projeleriGoster = (liste = []) => {
    if (!projeListesiDiv) return;

    // .map() kullanarak string oluşturmak, döngü içinde innerHTML+= yapmaktan çok daha hızlıdır.
    projeListesiDiv.innerHTML = liste.map(proje => `
        <div class="col-lg-4 col-md-6 mb-4 proje-kart-sarmal">
            <div class="card h-100 proje-karti shadow-sm border-0">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <i class="bi ${proje.ikon} text-primary fs-3 me-3"></i>
                        <h5 class="card-title m-0">${proje.ad}</h5>
                    </div>
                    <span class="badge bg-secondary mb-2">${proje.kategori.toUpperCase()}</span>
                    <p class="card-text text-muted small">${proje.detay}</p>
                </div>
            </div>
        </div>
    `).join('');
};

// 3. Filtreleme Fonksiyonu
const projeleriFiltrele = (kategori) => {
    // Aktif buton görselini güncellemek için bir tetikleyici
    const butonlar = document.querySelectorAll('.filtre-btn');
    butonlar.forEach(btn => btn.classList.toggle('aktif', btn.getAttribute('onclick').includes(kategori)));

    if (kategori === 'hepsi') {
        projeleriGoster(tumProjeler);
    } else {
        const filtrelenmis = tumProjeler.filter(p => p.kategori === kategori);
        projeleriGoster(filtrelenmis);
    }
};

// 4. Gelişmiş Daktilo Efekti (Kendi Kendini Döndüren Yapı)
const yazi = "Merhaba, Senanur. Yazılımcı ve Tasarımcıyım.";
let index = 0;

const daktilo = () => {
    if (index < yazi.length) {
        daktiloElementi.innerHTML += yazi.charAt(index);
        index++;
        setTimeout(daktilo, 100); // Yazma hızı
    } else {
        // İsteğe bağlı: Metin bitince 3 saniye bekle ve temizleyip baştan başla
        setTimeout(() => {
            daktiloElementi.innerHTML = "";
            index = 0;
            daktilo();
        }, 3000);
    }
};

// 5. Karanlık Mod Yönetimi (LocalStorage Destekli)
const temaYonetimi = () => {
    if (!temaButonu) return;

    temaButonu.addEventListener("click", () => {
        const yeniTema = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', yeniTema);
        localStorage.setItem('kayitliTema', yeniTema);
    });

    // Sayfa yüklendiğinde tercihi hatırla
    const hafizadakiTema = localStorage.getItem('kayitliTema');
    if (hafizadakiTema) {
        document.documentElement.setAttribute('data-theme', hafizadakiTema);
    }
};

// Sayfa Hazır Olduğunda Çalıştır
document.addEventListener("DOMContentLoaded", () => {
    projeleriGoster(tumProjeler);
    daktilo();
    temaYonetimi();
});