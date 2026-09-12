/* =========================================================
   CONFIG — this is the only section you should need to edit.
   Fill in real values here once your links are ready.
   ========================================================= */
const CONFIG = {
    // Optional blurred photo behind everything. Leave "" for a plain dark background.
    backgroundImage: "",

    avatar: "REPLACE_WITH_AVATAR_IMAGE_URL",
    // Optional small overlay badge in the corner of the avatar. Leave "" to hide it.
    badge: "",

    // Use { text: "...", accent: true } on any word/part you want colored, or just a plain string.
    name: "Ibuki",

    tags: ["VRCHAT", "AVATAR CREATOR", "COMMISSIONS OPEN"],

    bio: [
        "hey i'm ibuki, i make VRChat avatars",
        "check out my links :3"
    ],

    // Small icon row inside the socials card. "color" sets the square's background.
    socials: [
        { icon: "discord", url: "https://discord.gg/REPLACE", color: "#5865F2" },
        { icon: "twitter", url: "https://x.com/REPLACE", color: "#111111" },
        { icon: "bluesky", url: "https://bsky.app/profile/REPLACE", color: "#1185FE" },
        { icon: "heart", url: "https://ko-fi.com/REPLACE", color: "#e0457b" }
    ],

    // Optional live-ish status line under the socials row.
    // Set enabled: true + a real Discord user ID to pull LIVE status via the public Lanyard API
    // (https://github.com/Phineas/lanyard — free, no auth, but your Discord must be in Lanyard's server).
    // Leave enabled: false to show static fallback text instead.
    status: {
        enabled: false,
        discordId: "",
        fallbackHandle: "@REPLACE",
        fallbackText: "check discord for status",
        fallbackAvatar: "REPLACE_WITH_AVATAR_IMAGE_URL"
    },

    // Sections of link rows. Give a section a "divider" label to show a "✦ LABEL ✦" separator above it;
    // leave divider null/omitted on the first section for a plain flat list at the top.
    sections: [
        {
            divider: null,
            links: [
                { icon: "shop",  color: "#b4e23c", title: "Gumroad",  subtitle: "commission storefront", url: "https://REPLACE.gumroad.com" },
                { icon: "shop",  color: "#b4e23c", title: "Jinxxy",   subtitle: "commission storefront", url: "https://jinxxy.com/REPLACE" },
                { icon: "shop",  color: "#b4e23c", title: "Booth",    subtitle: "commission storefront", url: "https://REPLACE.booth.pm" },
                { icon: "website", color: "#7a7284", title: "Portfolio", subtitle: "past commission work", url: "https://REPLACE" }
            ]
        },
        {
            divider: "ABOUT ME",
            links: [
                { icon: "website", color: "#8b5cf6", title: "TOS", subtitle: "commission terms", url: "https://REPLACE" },
                { icon: "shop",    color: "#8b5cf6", title: "Throne", subtitle: "my wishlist", url: "https://throne.com/REPLACE" }
            ]
        }
    ],

    footerText: "ibuki • vrchat avatar creator ♥"
};

/* =========================================================
   ICON LIBRARY — SVG paths, reused for both the socials row
   and the main link icons. Add more here if you need a
   platform that isn't listed.
   ========================================================= */
const ICONS = {
    discord: '<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>',
    twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    bluesky: '<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.912 0 3.087 0 3.787c0 .7.384 5.731.635 6.575.826 2.79 3.768 3.736 6.478 3.415.156-.023.312-.041.472-.041-.16.023-.316.041-.472.06-3.916.586-7.402 2.023-2.836 7.156 5.02 5.033 6.884-1.077 7.723-3.859.839 2.782 2.083 8.673 7.617 3.859 4.284-3.859 1.148-6.57-2.767-7.156a4.271 4.271 0 01-.472-.06c.16 0 .316.018.472.041 2.71.321 5.652-.625 6.478-3.415.251-.844.635-5.875.635-6.575 0-.7-.139-1.875-.902-2.222-.66-.3-1.664-.622-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/>',
    heart: '<path d="M12 21s-6.716-4.35-9.428-8.485C.665 9.76 1.42 6.2 4.53 4.99c2.07-.81 4.13-.04 5.47 1.62C11.34 8.27 12 9.6 12 9.6s.66-1.33 1.99-2.99c1.34-1.66 3.4-2.43 5.47-1.62 3.11 1.21 3.87 4.77 1.96 7.53C18.716 16.65 12 21 12 21z"/>',
    shop: '<path d="M19 7h-1.35A5.5 5.5 0 0 0 7.35 7H6a2 2 0 0 0-2 2l-.83 9.13A2 2 0 0 0 5.16 20.3 2 2 0 0 0 5 20h14a2 2 0 0 0 1.99-2.2L20 9a2 2 0 0 0-1-2zm-7-3a3.5 3.5 0 0 1 3.44 3H8.56A3.5 3.5 0 0 1 12 4zM9 11a1 1 0 0 1-1-1V9h1v1a3 3 0 0 0 6 0V9h1v1a1 1 0 0 1-2 0v-.17A4 4 0 0 1 9 10.83z"/>',
    website: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
    gift: '<path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    shield: '<path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"/>'
};

function svgIcon(key) {
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${ICONS[key] || ICONS.website}</svg>`;
}

/* =========================================================
   RENDER
   ========================================================= */
function render() {
    // Background
    if (CONFIG.backgroundImage) {
        document.getElementById('bg-layer').style.backgroundImage = `url('${CONFIG.backgroundImage}')`;
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
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.background = s.color;
        a.innerHTML = svgIcon(s.icon);
        socialsRow.appendChild(a);
    });

    // Status row (live via Lanyard, or static fallback)
    if (CONFIG.status.enabled && CONFIG.status.discordId) {
        fetch(`https://api.lanyard.rest/v1/users/${CONFIG.status.discordId}`)
            .then(r => r.json())
            .then(data => {
                if (!data.success) throw new Error('lanyard lookup failed');
                showStatus({
                    avatar: `https://cdn.discordapp.com/avatars/${CONFIG.status.discordId}/${data.data.discord_user.avatar}.png`,
                    handle: '@' + data.data.discord_user.username,
                    text: data.data.discord_status,
                    dotColor: { online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d' }[data.data.discord_status] || '#747f8d'
                });
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
        document.getElementById('status-avatar').src = avatar;
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
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.setProperty('--row-color', link.color);
            a.innerHTML = `
                <span class="link-icon">${svgIcon(link.icon)}</span>
                <span class="link-text">
                    <span class="link-title">${link.title}</span><br>
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

document.addEventListener('DOMContentLoaded', render);
