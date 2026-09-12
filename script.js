/* =========================================================
   CONFIG — this is the only section you should need to edit.
   ========================================================= */
const CONFIG = {
    // Optimized WebP (284KB) instead of the old 6MB PNG, with a JPG fallback
    // for browsers that don't support WebP background-image.
    backgroundImage: "Background1920w.webp",
    backgroundImageFallback: "Background1920w-q82.jpg",

    // Full logo shown uncropped (not a circular avatar)
    avatar: "IbukiLogo.webp",
    badge: "AvatarIcon.webp",

    name: "iBukiVR",

    // TODO: no tag pills were given yet — add short words here if you want them,
    // e.g. ["MUSIC LOVER", "VRCHAT", "18+"], or leave the array empty for none.
    tags: [],

    bio: [
        "hi i'm iBuki, a music loving elf",
        "who vibes with energy like stars ✧"
    ],

    // Small icon row inside the socials card.
    // NOTE: file paths below assume these exact names inside your "colored-icons" folder —
    // rename the files to match, or tell me the real names and I'll fix the paths.
    socials: [
        { icon: "colored-icons/twitter.svg", url: "https://x.com/I_BukiVr" },
        { icon: "colored-icons/kofi.svg", url: "https://ko-fi.com/ibuki_vr" },
        { icon: "colored-icons/throne-gradient.svg", url: "https://throne.com/ibukivr" },
        { icon: "colored-icons/fansly.svg", url: "REPLACE_WITH_FANSLY_URL", ageGate: true }
    ],

    // No Discord ID given yet — leave disabled until you have one to plug in.
    // To enable: 1) put your Discord user ID in discordId, 2) set enabled: true,
    // 3) join the public Lanyard Discord (discord.gg/lanyard) — Lanyard can only
    // see your presence for servers it shares with you. For the "now playing"
    // widget specifically, also turn on Discord Settings > Activity Privacy >
    // "Display current activity as a status message" and connect Spotify under
    // Settings > Connections with "Display Spotify as your status" enabled.
    status: {
        enabled: false,
        discordId: "",
        fallbackHandle: "",
        fallbackText: "",
        fallbackAvatar: ""
    },

    sections: [
        {
            divider: null,
            // Add badge: "NEW" (or "HOT", etc.) to any link below to show a
            // little pill next to its title, e.g.:
            // { icon: "...", title: "...", subtitle: "...", url: "...", badge: "NEW" }
            links: [
                { icon: "colored-icons/twitter.svg", title: "X", subtitle: "@I_BukiVr", url: "https://x.com/I_BukiVr" },
                { icon: "colored-icons/kofi.svg", title: "Ko-fi", subtitle: "@ibuki_vr", url: "https://ko-fi.com/ibuki_vr" },
                { icon: "colored-icons/throne-gradient.svg", title: "Throne", subtitle: "@ibukivr", url: "https://throne.com/ibukivr" },
                { icon: "colored-icons/fansly.svg", title: "Fansly", subtitle: "18+ content", url: "REPLACE_WITH_FANSLY_URL", ageGate: true }
            ]
        }
        // TODO: once you're ready for a second group (like the "ABOUT ME" divider
        // in the reference), add another section here, e.g.:
        // { divider: "ABOUT ME", links: [ { icon: "...", title: "...", subtitle: "...", url: "..." } ] }
    ],

    // TODO: no footer line was given yet
    footerText: "iBukiVR ♥"
};

function iconImg(path) {
    return `<img src="${path}" alt="">`;
}

/* =========================================================
   RENDER
   ========================================================= */
function render() {
    // Background — fall back to the flat url() for older browsers, then
    // upgrade to image-set() (WebP-first, JPG fallback) where supported.
    if (CONFIG.backgroundImage) {
        const bgLayer = document.getElementById('bg-layer');
        const fallback = CONFIG.backgroundImageFallback || CONFIG.backgroundImage;
        bgLayer.style.backgroundImage = `url('${fallback}')`;
        const canUseImageSet = window.CSS && CSS.supports && (
            CSS.supports('background-image', "image-set(url('x.webp') type('image/webp'))") ||
            CSS.supports('background-image', "-webkit-image-set(url('x.webp') type('image/webp'))")
        );
        if (canUseImageSet && CONFIG.backgroundImageFallback) {
            const prefix = CSS.supports('background-image', "image-set(url('x.webp') type('image/webp'))") ? 'image-set' : '-webkit-image-set';
            bgLayer.style.backgroundImage = `${prefix}(url('${CONFIG.backgroundImage}') type('image/webp'), url('${fallback}') type('image/jpeg'))`;
        }
    }

    // Avatar + badge
    document.getElementById('avatar').src = CONFIG.avatar;
    if (CONFIG.badge) {
        const badgeEl = document.getElementById('badge');
        badgeEl.src = CONFIG.badge;
        badgeEl.hidden = false;
    }

    // Name
    document.getElementById('name').textContent = CONFIG.name;

    // Tags
    const tagsEl = document.getElementById('tags');
    CONFIG.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsEl.appendChild(span);
    });

    // Bio
    const bioEl = document.getElementById('bio');
    CONFIG.bio.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        bioEl.appendChild(p);
    });

    // Socials row
    const socialsRow = document.getElementById('socials-row');
    CONFIG.socials.forEach(s => {
        const a = document.createElement('a');
        a.className = 'social-icon';
        const label = s.icon.split('/').pop().replace(/-gradient|\.svg$/g, '');
        a.setAttribute('aria-label', label);
        a.title = label.charAt(0).toUpperCase() + label.slice(1);
        if (s.ageGate) {
            a.href = '#';
            a.addEventListener('click', (e) => handleGatedClick(e, s.url));
        } else {
            a.href = s.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }
        a.innerHTML = iconImg(s.icon);
        socialsRow.appendChild(a);
    });

    // Status row (live via Lanyard, or static fallback)
    if (CONFIG.status.enabled && CONFIG.status.discordId) {
        fetch(`https://api.lanyard.rest/v1/users/${CONFIG.status.discordId}`)
            .then(r => r.json())
            .then(data => {
                if (!data.success) throw new Error('lanyard lookup failed');
                const d = data.data;
                if (d.listening_to_spotify && d.spotify) {
                    // Now-playing takes priority over plain online/idle/dnd status
                    showStatus({
                        avatar: d.spotify.album_art_url,
                        handle: d.spotify.song,
                        text: `🎧 ${d.spotify.artist}`,
                        dotColor: '#1DB954'
                    });
                } else {
                    showStatus({
                        avatar: `https://cdn.discordapp.com/avatars/${CONFIG.status.discordId}/${d.discord_user.avatar}.png`,
                        handle: '@' + d.discord_user.username,
                        text: d.discord_status,
                        dotColor: { online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d' }[d.discord_status] || '#747f8d'
                    });
                }
            })
            .catch(() => showStaticStatus());
    } else if (CONFIG.status.fallbackHandle) {
        showStaticStatus();
    }

    function showStaticStatus() {
        showStatus({
            avatar: CONFIG.status.fallbackAvatar,
            handle: CONFIG.status.fallbackHandle,
            text: CONFIG.status.fallbackText,
            dotColor: '#747f8d'
        });
    }

    function showStatus({ avatar, handle, text, dotColor }) {
        const row = document.getElementById('status-row');
        const statusAvatarEl = document.getElementById('status-avatar');
        statusAvatarEl.src = avatar;
        statusAvatarEl.loading = 'lazy';
        document.getElementById('status-handle').textContent = handle;
        document.getElementById('status-label').textContent = text;
        document.getElementById('status-dot').style.background = dotColor;
        row.hidden = false;
    }

    // Link sections
    const wrapper = document.getElementById('links-wrapper');
    CONFIG.sections.forEach(section => {
        if (section.divider) {
            const div = document.createElement('div');
            div.className = 'divider';
            div.innerHTML = `<span class="diamond">✦</span><span>${section.divider}</span><span class="diamond">✦</span>`;
            wrapper.appendChild(div);
        }
        section.links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'link-row';
            if (link.ageGate) {
                a.href = '#';
                a.addEventListener('click', (e) => handleGatedClick(e, link.url));
            } else {
                a.href = link.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            a.innerHTML = `
                <span class="link-icon">${iconImg(link.icon)}</span>
                <span class="link-text">
                    <span class="link-title">${link.title}${link.badge ? `<span class="link-badge">${link.badge}</span>` : ''}</span><br>
                    <span class="link-subtitle">${link.subtitle}</span>
                </span>
                <span class="link-arrow">→</span>
            `;
            wrapper.appendChild(a);
        });
    });

    // Footer
    document.getElementById('footer-text').textContent = CONFIG.footerText;
}

document.addEventListener('DOMContentLoaded', () => {
    render();
    initStarField();
    initAgeGate();
    initShareButton();

    const visitBadge = document.getElementById('visit-badge');
    if (visitBadge) {
        visitBadge.addEventListener('error', () => visitBadge.remove());
    }
});

/* =========================================================
   SHARE BUTTON — native share sheet on mobile, clipboard copy
   as the fallback everywhere else.
   ========================================================= */
function initShareButton() {
    const btn = document.getElementById('share-btn');
    const label = document.getElementById('share-btn-label');
    if (!btn || !label) return;
    const originalLabel = label.textContent;

    btn.addEventListener('click', async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: CONFIG.name, text: CONFIG.bio.join(' '), url });
            } catch (err) {
                // User cancelled the share sheet — not an error, do nothing.
            }
            return;
        }
        try {
            await navigator.clipboard.writeText(url);
            flashLabel('Copied! ✓');
        } catch (err) {
            flashLabel('Copy failed');
        }
    });

    function flashLabel(text) {
        label.textContent = text;
        setTimeout(() => { label.textContent = originalLabel; }, 1800);
    }
}

/* =========================================================
   AGE GATE — for 18+ links (e.g. Fansly). Some states/countries
   legally require an affirmative age check before linking out to
   adult content. We only ask for a date of birth to compute age;
   we don't store or transmit the DOB itself anywhere.
   ========================================================= */
let pendingGateUrl = null;

function handleGatedClick(e, url) {
    e.preventDefault();
    if (sessionStorage.getItem('ageVerified18') === 'true') {
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
    }
    pendingGateUrl = url;
    const overlay = document.getElementById('age-gate-overlay');
    const dobInput = document.getElementById('age-gate-dob');
    const errorEl = document.getElementById('age-gate-error');
    dobInput.value = '';
    errorEl.textContent = '';
    overlay.hidden = false;
    dobInput.focus();
}

function closeAgeGate() {
    document.getElementById('age-gate-overlay').hidden = true;
    pendingGateUrl = null;
}

function confirmAgeGate() {
    const dobInput = document.getElementById('age-gate-dob');
    const errorEl = document.getElementById('age-gate-error');

    if (!dobInput.value) {
        errorEl.textContent = 'Please enter your date of birth.';
        return;
    }

    const dob = new Date(dobInput.value + 'T00:00:00');
    if (isNaN(dob.getTime()) || dob > new Date()) {
        errorEl.textContent = 'Please enter a valid date of birth.';
        return;
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age >= 18) {
        sessionStorage.setItem('ageVerified18', 'true');
        const url = pendingGateUrl;
        closeAgeGate();
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        errorEl.textContent = 'You must be 18 or older to view this content.';
    }
}

function initAgeGate() {
    const overlay = document.getElementById('age-gate-overlay');
    if (!overlay) return;

    document.getElementById('age-gate-confirm').addEventListener('click', confirmAgeGate);
    document.getElementById('age-gate-cancel').addEventListener('click', closeAgeGate);
    document.getElementById('age-gate-dob').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') confirmAgeGate();
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAgeGate();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.hidden) closeAgeGate();
    });
}

/* =========================================================
   STAR FIELD — a light canvas particle effect, tinted yellow.
   Adapted from a connected-dot background into a twinkling
   star look. Adjust STAR_COLOR / STAR_COUNT below to taste.
   ========================================================= */
function initStarField() {
    const canvas = document.getElementById('bg-stars');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // The raw brand hex (#54590C -> 84,89,12) is too dark/olive to read as a
    // twinkling star against a bright bokeh photo, so we use the same
    // lightened working-tint as --accent-2 in style.css — same yellow family,
    // actually visible.
    // Two-tone star palette: brand yellow (#54590C) and brand blue (#0C2E59).
    // Both raw hexes are too dark/muddy to read as tiny dots against the
    // navy bokeh photo, so each uses the same lightened working-tint already
    // established elsewhere on the site (--accent-2 and --accent in style.css).
    const STAR_COLORS = [
        '184, 192, 18',  // brand yellow, lightened
        '47, 111, 201'   // brand blue #0C2E59, lightened
    ];
    const STAR_COUNT = 130;

    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = (Math.random() - 0.5) * 0.15;
            this.size = Math.random() * 1.8 + 0.6;
            this.twinkleSpeed = Math.random() * 0.015 + 0.005;
            this.twinklePhase = Math.random() * Math.PI * 2;
            this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
            // ~1 in 12 stars is a bigger four-point sparkle instead of a plain dot
            this.isSparkle = Math.random() < 0.08;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            this.twinklePhase += this.twinkleSpeed;
        }

        draw() {
            const twinkle = (Math.sin(this.twinklePhase) + 1) / 2; // 0 -> 1
            const alpha = 0.2 + twinkle * 0.6;
            ctx.shadowBlur = this.size * (this.isSparkle ? 6 : 4);
            ctx.shadowColor = `rgba(${this.color}, ${alpha})`;
            ctx.fillStyle = `rgba(${this.color}, ${alpha})`;

            if (this.isSparkle) {
                const s = this.size * 2.4;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - s);
                ctx.quadraticCurveTo(this.x, this.y, this.x + s, this.y);
                ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + s);
                ctx.quadraticCurveTo(this.x, this.y, this.x - s, this.y);
                ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - s);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.update();
            s.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
