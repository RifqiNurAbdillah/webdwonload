document.getElementById("downloadFBForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = document.getElementById("videoUrl").value;
    const results = document.getElementById("results");

    results.innerHTML = `
        <div class="text-center text-secondary">
            <div class="spinner-border text-primary"></div>
            <p class="mt-2">Fetching video...</p>
        </div>
    `;

    const api = `https://api.ryzumi.vip/api/downloader/fbdl?url=${encodeURIComponent(url)}`;

    try {
        const req = await fetch(api);
        const json = await req.json();

        if (!json.status) {
            results.innerHTML = `<p>❌ Failed to fetch video!</p>`;
            return;
        }

        const thumb = json.data[0].thumbnail;
        let html = `
            <div class="result-box">
                <img src="${thumb}" alt="Thumbnail">
                <p><strong>Choose Quality:</strong></p>
        `;

        json.data.forEach(item => {
            html += `
                <a class="download-btn" href="${item.url}" target="_blank">
                    Download ${item.resolution}
                </a>
            `;
        });

        html += `</div>`;
        results.innerHTML = html;

    } catch (err) {
        results.innerHTML = `<p>Error: ${err.message}</p>`;
    }
});
