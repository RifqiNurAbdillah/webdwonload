document.getElementById("downloadTTForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = document.getElementById("videoUrl").value;
    const results = document.getElementById("results");

    results.innerHTML = `
        <div class="text-center text-secondary">
            <div class="spinner-border text-primary"></div>
            <p class="mt-2">Mengambil video...</p>
        </div>
    `;

    const api = `https://api.ryzumi.vip/api/downloader/ttdl?url=${encodeURIComponent(url)}`;

    try {
        const req = await fetch(api);
        const json = await req.json();

        if (!json.success) {
            results.innerHTML = `<p>❌ Gagal mengambil video!</p>`;
            return;
        }

        const videoData = json.data.data;
        const thumb = videoData.cover;
        const title = videoData.title || "Video TikTok";

        let html = `
            <div class="result-box text-center">
                <img src="${thumb}" alt="Thumbnail" class="img-fluid mb-2">
                <h5>${title}</h5>
                <p><strong>Pilih Kualitas:</strong></p>
                <div class="d-flex flex-column align-items-center">
                    <button class="download-btn btn btn-primary mb-2 w-50"
                            onclick="downloadVideo('${videoData.play}', '${title}.mp4')">
                        Download Normal
                    </button>
                    <button class="download-btn btn btn-success mb-2 w-50"
                            onclick="downloadVideo('${videoData.hdplay}', '${title}-HD.mp4')">
                        Download HD
                    </button>
                </div>
            </div>
        `;

        results.innerHTML = html;

    } catch (err) {
        results.innerHTML = `<p>Terjadi error: ${err.message}</p>`;
    }
});

// Fungsi untuk mendownload video
function downloadVideo(url, filename) {
    fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(err => alert("Download gagal: " + err));
}
