// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyDgGanI0xfwbMbF2Q20eftio7Hc6iyPVgI",
  authDomain: "insancemerlang-e9c87.firebaseapp.com",
  projectId: "insancemerlang-e9c87",
  storageBucket: "insancemerlang-e9c87.firebasestorage.app",
  messagingSenderId: "1009245252263",
  appId: "1:1009245252263:web:637bfe528eddfc0dc18982"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const barangCollection = collection(db, "barang")

export async function tampilkanDaftarBarang() {
  // ambil snapshot data dari koleksi siswa
  const snapshot = await getDocs(barangCollection)
  
  // ambil element tabel data
  const tabel = document.getElementById("tabelData")
  
  //kosongkan isi tablel 
  tabel.innerHTML = ""
  
  //loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data 
    const data = doc.data()
    const id = doc.id
    
    // buat element baris baru
    const baris = document.createElement("tr")
    
    const kolomNourut = document.createElement("td")
    kolomNourut.textContent = tabel.rows.length + 1
    
    //buat element kolom untuk nis
    const kolomNamaBarang = document.createElement("td")
    kolomNamaBarang.textContent = data.namabarang
    
    //buat element kolom untuk nama
    const kolomHarga = document.createElement("td")
    kolomHarga.textContent = data.harga
    
    // buat kolom kelas
    const kolomStok = document.createElement("td")
    kolomStok.textContent = data.stok
    
    // buat element kolom untuk Aksi
    const kolomAksi = document.createElement("td")
    
    // buat tombol edit
    const tombolEdit = document.createElement("a")
    tombolEdit.textContent = "Edit"
    tombolEdit.href = "edit.html?id=" + id
    tombolEdit.className = "button edit"
    
    //buat tombol hapus
    const tombolHapus = document.createElement("button")
    tombolHapus.textContent = "Hapus"
    tombolHapus.className = "button delete"
    tombolHapus.onclick = async () => {
      await hapusBarang(id)
    }
    
    //tambahkan element ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    //tambah kolom kedalam baris
    baris.appendChild(kolomNourut)
    baris.appendChild(kolomNamaBarang)
    baris.appendChild(kolomHarga)
    baris.appendChild(kolomStok)
    baris.appendChild(kolomAksi)
    
    //tambahkan baris kedalam tabel
    tabel.appendChild(baris)
  })
}

//fungsi untuk menambahkan data barang
export async function tambahDataBarang() {
  //ambil nilai dari form
  const namabarang = document.getElementById('namabarang').value
  const harga = document.getElementById('harga').value
  const stok = document.getElementById('stok').value
  //tambahkan data ke firestore
  await addDoc(barangCollection, {
    namabarang: namabarang,
    harga: harga,
    stok: stok
  })
  
  //alihkan ke halaman daftar barang
  window.location.href = 'daftar.html'
}

//fungsi untuk menghapus data barang
export async function hapusBarang(id) {
  if (!confirm("yakin ingin menghapus data ini?")) return
  //menghapus dokumen barang berdasarkan id
  await deleteDoc(doc(db, "barang", id))
  
  // refresh data siswa
  await tampilkanDaftarBarang()
}


//fungsi untuk menampilkan data barang berdasarkan id
export async function ambilDataBarang(id) {
  const docRef = doc(db, "barang", id)
  const docSnap = await getDoc(docRef)
  
  return await docSnap.data()
}

//fiungsi untuk mengubah data barang
export async function ubahDataBarang(id, namaBarang, harga, stok) {
  await updateDoc(doc(db, "barang", id), {
    namaBarang: namaBarang,
    harga: harga,
    stok: stok
  })
  
  //alihlkan ke halaman daftar barang
  window.location.href = 'daftar.html'
  // Tab to edit
}