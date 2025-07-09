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
// --- Admin Login & Upload Logic ---

const ADMIN_EMAILS = [
    "lukevplusnzima@gmail.com",
    "abrahammsofi@gmail.com"
];
const ADMIN_PASSWORD = "visionary2025";

const adminUploadIcon = document.getElementById('admin-upload-icon');
const adminLoginModal = document.getElementById('admin-login-modal');
const adminUploadModal = document.getElementById('admin-upload-modal');
const closeAdminLogin = document.getElementById('close-admin-login');
const closeAdminUpload = document.getElementById('close-admin-upload');
const adminLoginForm = document.getElementById('admin-login-form');
const adminUploadForm = document.getElementById('admin-upload-form');
const adminLoginError = document.getElementById('admin-login-error');
const adminUploadSuccess = document.getElementById('admin-upload-success');

// Hide admin icon by default
adminUploadIcon.style.display = 'none';

// Show login modal on double-click About Us icon
const aboutLink = document.getElementById('about-link');
if (aboutLink) {
    aboutLink.ondblclick = function() {
        if (localStorage.getItem('isAdmin') !== 'true') {
            adminLoginModal.style.display = 'flex';
        }
    };
}

// Show admin icon if already logged in
if (localStorage.getItem('isAdmin') === 'true') {
    adminUploadIcon.style.display = 'block';
}

// Handle login
adminLoginForm.onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('admin-email').value.trim().toLowerCase();
    const password = document.getElementById('admin-password').value;
    if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        adminLoginModal.style.display = 'none';
        adminUploadIcon.style.display = 'block';
        adminLoginError.style.display = 'none';
        adminLoginForm.reset();
    } else {
        adminLoginError.style.display = 'block';
    }
};

// Close modals
closeAdminLogin.onclick = () => adminLoginModal.style.display = 'none';
closeAdminUpload.onclick = () => adminUploadModal.style.display = 'none';
window.addEventListener('click', function(event) {
    if (event.target === adminLoginModal) adminLoginModal.style.display = 'none';
    if (event.target === adminUploadModal) adminUploadModal.style.display = 'none';
});

// Show upload modal
adminUploadIcon.onclick = function() {
    adminUploadModal.style.display = 'flex';
    adminUploadSuccess.style.display = 'none';
};

// Handle upload (demo only)
adminUploadForm.onsubmit = function(e) {
    e.preventDefault();
    adminUploadSuccess.style.display = 'block';
    setTimeout(() => {
        adminUploadModal.style.display = 'none';
        adminUploadSuccess.style.display = 'none';
        adminUploadForm.reset();
    }, 1500);
};