// Modal logic
const contactModal = document.getElementById('contact-modal');
const aboutModal = document.getElementById('about-modal');
const contactLinks = [document.getElementById('contact-link'), document.getElementById('contact-link-footer')];
const aboutLinks = [document.getElementById('about-link')];
const closeModalBtn = document.getElementById('close-modal');
const closeAboutBtn = document.getElementById('close-about-modal');

contactLinks.forEach(link => {
    if (link) link.onclick = (e) => {
        e.preventDefault();
        contactModal.style.display = 'flex';
    };
});
aboutLinks.forEach(link => {
    if (link) link.onclick = (e) => {
        e.preventDefault();
        aboutModal.style.display = 'flex';
    };
});
if (closeModalBtn) closeModalBtn.onclick = () => contactModal.style.display = 'none';
if (closeAboutBtn) closeAboutBtn.onclick = () => aboutModal.style.display = 'none';
window.onclick = function(event) {
    if (event.target === contactModal) contactModal.style.display = "none";
    if (event.target === aboutModal) aboutModal.style.display = "none";
};

// Music stats logic (localStorage for demo)
function getStats(songId) {
    return {
        views: Number(localStorage.getItem(`views-${songId}`) || 0),
        downloads: Number(localStorage.getItem(`downloads-${songId}`) || 0),
        plays: Number(localStorage.getItem(`plays-${songId}`) || 0)
    };
}
function setStats(songId, stats) {
    localStorage.setItem(`views-${songId}`, stats.views);
    localStorage.setItem(`downloads-${songId}`, stats.downloads);
    localStorage.setItem(`plays-${songId}`, stats.plays);
}
function updateStatsDisplay(songId) {
    const stats = getStats(songId);
    document.getElementById(`views-${songId}`).textContent = stats.views;
    document.getElementById(`downloads-${songId}`).textContent = stats.downloads;
    document.getElementById(`plays-${songId}`).textContent = stats.plays;
}

// On page load, increment views and update display
document.querySelectorAll('.music-card').forEach(card => {
    const songId = card.getAttribute('data-song');
    let stats = getStats(songId);
    stats.views += 1;
    setStats(songId, stats);
    updateStatsDisplay(songId);
});

// Play Now logic
const audioPlayer = document.getElementById('audio-player');
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.onclick = function() {
        const file = btn.getAttribute('data-file');
        audioPlayer.src = file;
        audioPlayer.style.display = 'block';
        audioPlayer.play();
        // Update live plays
        const card = btn.closest('.music-card');
        const songId = card.getAttribute('data-song');
        let stats = getStats(songId);
        stats.plays += 1;
        setStats(songId, stats);
        updateStatsDisplay(songId);
    };
});
// Download logic (improved for all browsers)
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const url = btn.getAttribute('href');
        const fileName = url.split('/').pop();
        // Create a temporary link and trigger click
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Update download count
        const card = btn.closest('.music-card');
        const songId = card.getAttribute('data-song');
        let stats = getStats(songId);
        stats.downloads += 1;
        setStats(songId, stats);
        updateStatsDisplay(songId);
    });
});