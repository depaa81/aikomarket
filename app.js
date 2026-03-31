/* ================================
        APP.JS FINAL (STABLE)
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const BOT_TOKEN = "8584528083:AAGaRQptiUxf6yxnBEIOHxkwriW8hqVO1PE";
  const CHAT_ID = "5733132494";

  // =======================
// DATA PRODUK (AIKOLUV)
// =======================
const products = [

  // 🎬 JASA EDIT
  {id:1,name:"JJ 1 Menit",price:15000,category:"edit"},
  {id:2,name:"JJ Basic",price:8000,category:"edit"},
  {id:3,name:"JJ Medium",price:10000,category:"edit"},
  {id:4,name:"JJ Premium",price:20000,category:"edit"},
  {id:5,name:"JJ Custom",price:0,category:"edit"},

  // 🎨 DESIGN
  {id:6,name:"Canva Basic",price:5000,category:"design"},
  {id:7,name:"Canva Medium",price:10000,category:"design"},
  {id:8,name:"Canva Premium",price:15000,category:"design"},
  {id:9,name:"Logo",price:5000,category:"design"},
  {id:10,name:"Poster",price:8000,category:"design"},

  // 📱 APK
  {id:11,name:"Alight Motion 1 Tahun",price:4000,category:"apk"},

  {id:12,name:"Canva 7 Day",price:6000,category:"apk"},
  {id:13,name:"Canva 14 Day",price:12000,category:"apk"},
  {id:14,name:"Canva 1 Month",price:14000,category:"apk"},

  {id:15,name:"CapCut Pro 7 Day",price:7000,category:"apk"},
  {id:16,name:"CapCut Pro 1 Month",price:14000,category:"apk"},
  {id:17,name:"CapCut Pro 45 Day",price:19000,category:"apk"},

  {id:18,name:"YouTube Premium 1 Month",price:7500,category:"apk"},
  {id:19,name:"YouTube Premium 2 Month",price:15000,category:"apk"},

  {id:20,name:"Viu Premium 1 Tahun",price:5000,category:"apk"},

  {id:21,name:"Wink 7 Day",price:3000,category:"apk"},
  {id:22,name:"Wink 1 Month",price:6000,category:"apk"},

  {id:23,name:"Spotify 1 Month",price:25000,category:"apk"},
  {id:24,name:"Spotify 2 Month",price:45000,category:"apk"},

  // Bstation
  {id:25,name:"Bstation Sharing 1 Bulan",price:8000,category:"apk"},
  {id:26,name:"Bstation Sharing 3 Bulan",price:23000,category:"apk"},
  {id:27,name:"Bstation Sharing 1 Tahun",price:25000,category:"apk"},
  {id:28,name:"Bstation Private 1 Bulan",price:30000,category:"apk"},

  // Netflix
  {id:29,name:"Netflix 2 User 1 Hari",price:3000,category:"apk"},
  {id:30,name:"Netflix 2 User 1 Minggu",price:9000,category:"apk"},
  {id:31,name:"Netflix 2 User 1 Bulan",price:20000,category:"apk"},

  {id:32,name:"Netflix 1 User 1 Hari",price:4000,category:"apk"},
  {id:33,name:"Netflix 1 User 1 Minggu",price:10000,category:"apk"},
  {id:34,name:"Netflix 1 User 1 Bulan",price:25000,category:"apk"},

  // Loklok
  {id:35,name:"Loklok Sharing Basic 1 Bulan",price:20000,category:"apk"},
  {id:36,name:"Loklok Sharing Standar 1 Bulan",price:25000,category:"apk"},
  {id:37,name:"Loklok Private Basic 1 Bulan",price:60000,category:"apk"},
  {id:38,name:"Loklok Private Standar 1 Bulan",price:90000,category:"apk"}
];

  function formatRupiah(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const productListEl = document.getElementById("productList");
  const orderCardEl = document.getElementById("orderCard");
  const hamburger = document.getElementById("hamburgerBtn");
  const waBtn = document.getElementById("waFloatingBtn");
  const waPopup = document.getElementById("waPopup");
  const waCSLink = document.getElementById("waCSLink");
  const waInfo = document.getElementById("waInfoPopup");
  const closeWaInfo = document.getElementById("closeWaInfo");
  const openPay = document.getElementById("openPaymentInfo");
  const paymentModal = document.getElementById("paymentModal");

  let currentOrder = null;

  /* ===========================
     RENDER PRODUK
  =========================== */
  function renderProducts() {
    productListEl.innerHTML = "";

    products.forEach(p => {
      const box = document.createElement("div");
      box.className = "product";
      box.innerHTML = `
        <div class="thumb">${p.name.split(" ")[0]}</div>
        <div class="pmeta">
          <h3>${p.name}</h3>
          <p>Rp ${formatRupiah(p.price)}</p>
        </div>
        <button class="buy" data-id="${p.id}">Buy</button>
      `;
      productListEl.appendChild(box);
    });

    productListEl.onclick = (e) => {
      const btn = e.target.closest(".buy");
      if (!btn) return;

      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      selectProduct(product);
    };
  }

  /* ===========================
     PILIH PRODUK
  =========================== */
  function selectProduct(product) {
    currentOrder = {
      id: "ORD" + Date.now(),
      name: product.name,
      price: product.price,
      finalPrice: product.price,
      discount: 0,
      voucher: null,
      date: new Date().toLocaleString("id-ID")
    };

    orderCardEl.classList.remove("empty");
    orderCardEl.innerHTML = `
      <h3>Detail Pesanan</h3>
      <p><b>ID:</b> ${currentOrder.id}</p>
      <p><b>Produk:</b> ${currentOrder.name}</p>
      <p><b>Harga:</b> Rp ${formatRupiah(currentOrder.price)}</p>

      <div class="field">
        <label>Masukkan Voucher</label>
        <input id="voucherInput" class="voucher-input" type="text" placeholder="Masukkan kode voucher...">
        <button class="btn" id="applyVoucherBtn" style="width:100%;margin-top:6px;">Terapkan Voucher</button>
      </div>

      <div id="voucherResult"></div>

      <div class="field" style="margin-top:15px;">
        <label>Upload Bukti Transfer</label>
        <input type="file" id="proof">
        <img id="preview" class="proof-preview" alt="preview"/>
      </div>

      <button class="btn success" id="sendProof" style="width:100%;margin-top:10px;">
        Kirim Bukti
      </button>

      <a id="waMessage" target="_blank" rel="noopener noreferrer">
        <button class="btn ghost" style="width:100%;margin-top:10px;">
          WhatsApp Penjual
        </button>
      </a>
    `;

    document.getElementById("applyVoucherBtn").onclick = applyVoucher;
    document.getElementById("proof").onchange = previewProof;
    document.getElementById("sendProof").onclick = sendProofToTelegram;

    updateWaSellerLink();
  }

  /* ===========================
     VOUCHER SYSTEM
  =========================== */
  function applyVoucher() {
    const codeEl = document.getElementById("voucherInput");
    const resultEl = document.getElementById("voucherResult");

    const code = codeEl.value.trim().toUpperCase();
    const voucher = VOUCHERS.find(v => v.code === code);

    if (!voucher) {
      resultEl.innerHTML = "";
      currentOrder.finalPrice = currentOrder.price;
      currentOrder.discount = 0;
      currentOrder.voucher = null;
      showPopupNotif("Kode voucher tidak ditemukan!");
      updateWaSellerLink();
      return;
    }

    if (currentOrder.price < voucher.min) {
      showPopupNotif(`Minimal pembelian Rp ${formatRupiah(voucher.min)} untuk voucher ini`);
      return;
    }

    const pot = Math.round(currentOrder.price * voucher.cut);
    const total = currentOrder.price - pot;

    currentOrder.discount = pot;
    currentOrder.finalPrice = total;
    currentOrder.voucher = voucher;

    resultEl.innerHTML = `
      <p><b>Voucher:</b> ${voucher.code}</p>
      <p>Potongan: Rp ${formatRupiah(pot)}</p>
      <p><b>Total Bayar: Rp ${formatRupiah(total)}</b></p>
    `;

    showPopupNotif("Voucher berhasil diterapkan!");
    updateWaSellerLink();
  }

  /* ===========================
     PREVIEW GAMBAR
  =========================== */
  function previewProof(e) {
    const file = e.target.files[0];
    const img = document.getElementById("preview");
    img.src = URL.createObjectURL(file);
  }

  /* ===========================
     SIMPAN RIWAYAT (BARU)
  =========================== */
  function saveToHistory() {
    let history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    history.push(currentOrder);
    localStorage.setItem("orderHistory", JSON.stringify(history));
  }

  /* ===========================
     KIRIM KE TELEGRAM
  =========================== */
  async function sendProofToTelegram() {
    if (!currentOrder) return alert("Tidak ada pesanan.");

    const fileEl = document.getElementById("proof");
    if (!fileEl.files.length) return alert("Upload bukti dulu.");

    try {
      const form = new FormData();
      form.append("chat_id", CHAT_ID);
      form.append("photo", fileEl.files[0]);
      form.append("caption",
  `📦 *BUKTI TRANSFER*\n\n` +
  `🆔 ID: ${currentOrder.id}\n` +
  `📄 Produk: ${currentOrder.name}\n` +
  `💰 Total Bayar: Rp ${formatRupiah(currentOrder.finalPrice)}\n` +
  `🏷 Voucher: ${currentOrder.voucher ? currentOrder.voucher.code : "Tidak ada"}\n` +
  `➖ Potongan: Rp ${formatRupiah(currentOrder.discount)}\n\n` +
  `📅 ${currentOrder.date}`
);

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: "POST", body: form
      });

      saveToHistory(); // <-- Tambahan Penting!

      showPopupNotif("Bukti terkirim ke Telegram!");

    } catch (err) {
      alert("Gagal mengirim ke Telegram.");
      console.error(err);
    }
  }

  /* ===========================
     POPUP NOTIF
  =========================== */
  function showPopupNotif(text) {
    const box = document.createElement("div");
    box.className = "popup-notif";
    box.innerText = text;
    document.body.appendChild(box);

    setTimeout(() => box.classList.add("show"), 20);
    setTimeout(() => {
      box.classList.remove("show");
      setTimeout(() => box.remove(), 250);
    }, 2500);
  }

  /* ===========================
     WHATSAPP SELLER LINK
  =========================== */
  function updateWaSellerLink() {
    const wa = document.getElementById("waMessage");
    if (!wa) return;

    wa.href =
      "https://wa.me/62895410796933?text=" +
      encodeURIComponent(
        `Halo kak, saya sudah melakukan pemesanan.\n\n` +
        `ID Pesanan: ${currentOrder.id}\n` +
        `Produk: ${currentOrder.name}\n` +
        `Total Bayar: Rp ${formatRupiah(currentOrder.finalPrice)}`
      );
  }

  /* ===========================
     DRAWER MENU + SOSMED
=========================== */
const drawer = document.createElement("div");

drawer.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: white;
  padding: 20px;
  transform: translateX(-300px);
  transition: .25s;
  z-index: 9999;
  box-shadow: 3px 0 20px rgba(0,0,0,0.25);
  overflow-y: auto;
`;

drawer.innerHTML = `
  <h2 style="color:#0d6efd;margin-bottom:15px;">Menu</h2>

  <button class="drawer-item" onclick="location.href='voucher.html'">Daftar Voucher</button>
  <button class="drawer-item" onclick="location.href='informasi.html'">Informasi Toko</button>
  <button class="drawer-item" onclick="location.href='riwayat.html'">Riwayat Transaksi</button>

  <h3 class="dropdown-header" id="toggleSosmed">
    Sosial Media &#9660;
  </h3>

  <div class="dropdown-sosmed">
    <button class="drawer-item" onclick="window.open('https://instagram.com/','_blank')">Instagram</button>
    <button class="drawer-item" onclick="window.open('https://tiktok.com/','_blank')">TikTok</button>
    <button class="drawer-item" onclick="window.open('https://youtube.com/','_blank')">YouTube</button>
    <button class="drawer-item" onclick="window.open('https://facebook.com/','_blank')">Facebook</button>
  </div>
`;

document.body.appendChild(drawer);

hamburger.onclick = () => {
  const isOpen = drawer.style.transform === "translateX(0px)";
  drawer.style.transform = isOpen ? "translateX(-300px)" : "translateX(0px)";
};

const sosmedToggle = drawer.querySelector("#toggleSosmed");
const sosmedContent = drawer.querySelector(".dropdown-sosmed");

sosmedContent.style.maxHeight = "0px";
sosmedContent.style.overflow = "hidden";
sosmedContent.style.transition = "max-height .4s ease";

let sosmedOpen = false;

sosmedToggle.onclick = () => {
  sosmedOpen = !sosmedOpen;
  sosmedContent.style.maxHeight = sosmedOpen ? sosmedContent.scrollHeight + "px" : "0px";
  sosmedToggle.innerHTML = sosmedOpen
    ? "Sosial Media &#9650;"   // ▲
    : "Sosial Media &#9660;";  // ▼
};

document.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && e.target !== hamburger) {
    drawer.style.transform = "translateX(-300px)";
  }
});


  /* ===========================
     WA CUSTOMER SERVICE
  =========================== */
  waBtn.onclick = () => {
    waPopup.classList.remove("hidden");
  };

  waPopup.onclick = (e) => {
    if (!e.target.closest(".wa-popup-box")) {
      waPopup.classList.add("hidden");
    }
  };

  waCSLink.href =
    "https://wa.me/62895410796933?text=" +
    encodeURIComponent("Halo admin, saya butuh bantuan Customer Service.");

  /* ===========================
     WA INFO POPUP
  =========================== */
  waInfo.classList.remove("hidden");

  closeWaInfo.onclick = () => {
    waInfo.classList.add("hidden");
  };

  waInfo.onclick = (e) => {
    if (!e.target.closest(".wa-info-box")) {
      waInfo.classList.add("hidden");
    }
  };

  /* ===========================
     PAYMENT MODAL
  =========================== */
  openPay.onclick = () => {
    paymentModal.classList.remove("hidden");
  };

  paymentModal.onclick = (e) => {
    if (!e.target.closest(".modal-box")) {
      paymentModal.classList.add("hidden");
    }
  };

  /* ===========================
     START
  =========================== */
  renderProducts();
});
