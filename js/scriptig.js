document.getElementById('downloadIGForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const urlInput = document.getElementById('igUrl').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>';

    try {
        const apiURL = `https://api.ryzumi.vip/api/downloader/igdl?url=${encodeURIComponent(urlInput)}`;
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.status && data.data.length > 0) {
            resultsDiv.innerHTML = '';
            data.data.forEach(item => {
                const box = document.createElement('div');
                box.className = 'result-box';

                const img = document.createElement('img');
                img.src = item.thumbnail;
                img.alt = 'Video Thumbnail';
                box.appendChild(img);

                // Tambahkan tombol DI BAWAH gambar
                const btn = document.createElement('a');
                btn.href = item.url;
                btn.className = 'download-btn';
                btn.textContent = 'Download Video';
                btn.target = '_blank';
                btn.style.display = 'block';       // pastikan tombol tampil di baris baru
                btn.style.marginTop = '10px';      // beri jarak dari gambar
                box.appendChild(btn);

                resultsDiv.appendChild(box);
            });

        } else {
            resultsDiv.innerHTML = '<p class="text-danger">Failed to fetch video. Check the URL!</p>';
        }
    } catch (error) {
        resultsDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error(error);
    }
});