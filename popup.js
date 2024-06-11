document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('executeScriptButton').addEventListener('click', function() {
    // Jalankan JavaScript saat tombol ditekan
    executeScript();
  });
});

function executeScript() {
  // Contoh: Ubah warna latar belakang halaman menjadi kuning
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: executeInPage
    });
  });
}

function executeInPage() {
  
            // Ambil semua elemen div pada halaman
            var divs = document.getElementsByTagName('div');
            var combinedText = '';

            // Iterasi melalui semua elemen div
            for (var i = 0; i < divs.length; i++) {
                var divText = divs[i].innerText || divs[i].textContent;

                // Cek apakah teks di dalam div diawali dengan "sult"
                if (divText.startsWith('sult')) {
                    combinedText += divText + '\n'; // Tambahkan teks ke string gabungan
                }
            }

            if (combinedText) {
                copyToClipboard(combinedText); // Salin teks gabungan ke clipboard
                console.log("Text copied to clipboard: " + combinedText);
                alert("Berhasil di Copy");
            }else{
              alert("Hanya berlaku di web voucher sultan saat di print");
            }

        // Fungsi untuk menyalin teks ke clipboard
        function copyToClipboard(text) {
            // Buat elemen textarea sementara
            var textarea = document.createElement('textarea');
            textarea.value = text;

            // Tambahkan textarea ke dokumen
            document.body.appendChild(textarea);

            // Pilih teks dalam textarea
            textarea.select();

            try {
                // Salin teks yang dipilih ke clipboard
                document.execCommand('copy');
                console.log('Text successfully copied to clipboard');
            } catch (err) {
                console.error('Could not copy text: ', err);
            }

            // Hapus textarea dari dokumen
            document.body.removeChild(textarea);
        }
}
