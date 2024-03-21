## Instalasi Awal di Termux


1. **Update dan Upgrade Termux:**
   ```
   pkg update && upgrade
   ```
   Saat diminta, ketik `y` untuk melanjutkan dengan update atau upgrade.

2. **Instal wget:**
   ```
   pkg install wget
   ```

3. **Unduh dan Jalankan Script Instalasi:**
   ```
   wget https://dana-api.imtaqin.id/install.sh
   termux-setup-storage
   ```
   Ketika diminta, klik "Izinkan" untuk memberi akses penyimpanan, kemudian lanjutkan dengan:
   ```
   bash install.sh
   ```
   Konfirmasi dengan `y` jika diminta selama proses instalasi.

4. **Unduh dan Jalankan Script Tambahan:**
   ```
   wget https://dana-api.imtaqin.id/i.sh
   bash i.sh
   ```
   Gunakan `ls` untuk memeriksa isi direktori dan `cd dana` untuk berpindah ke direktori `dana`.

5. **Install dependencies:**
    
    ```
   npm install
   ```
6. **Mulai Node:**
   ```
   node start
   ```
   Di sini, Anda akan diminta untuk memasukkan ID Google Sheet yang ingin Anda integrasikan.

### Konfigurasi Google Sheet

- **Salin format Google Sheet** dari link berikut untuk menggunakan struktur data yang sesuai: [Format Sheet](https://docs.google.com/spreadsheets/d/1cEm1ViKRspqzZwRiZJEMaw9RvIu7P1ASSWhFlrMKeKM/edit?usp=sharing).
- **Buat Service Account** di Google Cloud Platform dengan memastikan Google Drive dan Google Sheets API sudah aktif untuk proyek Anda.

## Mengganti Service Account Credentials

### Langkah 1: Konfigurasi di Google Cloud Platform

- **Buka Google Cloud Console** dan pilih atau buat proyek baru.
- **Aktifkan Google Sheets dan Google Drive API** di bagian "API & Services".
- **Buat Service Account**, isi detail yang diperlukan, dan berikan peran yang sesuai. Di tab "Keys", buat key baru dalam format JSON yang akan diunduh. File ini akan digunakan sebagai `cred.json`.

### Langkah 2: Mengganti `cred.json` di Termux

1. **Hapus file `cred.json` yang lama** (jika ada) dengan perintah `rm cred.json`.
2. **Transfer file key JSON** yang baru dari GCP ke perangkat Android Anda.
3. **Salin file key JSON ke direktori `dana`** di Termux menggunakan perintah:
   ```
   cp /storage/emulated/0/Download/your-new-key.json /data/data/com.termux/files/home/dana/cred.json
   ```

Dengan file `cred.json` yang baru:

- **Jalankan ulang script** dengan `node start` untuk menggunakan kredensial baru.
- **Masukkan Sheet ID** yang diperoleh dari URL Google Sheets Anda. Pastikan service account memiliki akses dengan membagikan sheet ke email service account yang tercantum dalam file JSON.
- **Ikuti instruksi script** untuk setup lanjutan atau informasi tambahan yang diperlukan oleh Google Sheets API.

Dengan mengikuti langkah-langkah ini, Anda akan berhasil mengintegrasikan Termux dengan Google Sheets, memungkinkan pengelolaan data secara efisien dan otomatis langsung dari perangkat Android Anda.
