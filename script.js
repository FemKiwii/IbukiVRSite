/* =========================================================
   CONFIG — this is the only section you should need to edit.
   ========================================================= */
const CONFIG = {
    // Uploaded to the repo root
    backgroundImage: "Background1440.png",

    // Full logo shown uncropped (not a circular avatar)
    avatar: "IbukiLogo.png",
    badge: "",

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
        { icon: "colored-icons/shield.svg", url: "https://throne.com/ibukivr" },
        { icon: "colored-icons/fansly.svg", url: "REPLACE_WITH_FANSLY_URL" }
    ],

    // No Discord ID given yet — leave disabled until you have one to plug in.
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
            links: [
                { icon: "colored-icons/twitter.svg", title: "X", subtitle: "main social", url: "https://x.com/I_BukiVr" },
                { icon: "colored-icons/kofi.svg", title: "Ko-fi", subtitle: "support me", url: "https://ko-fi.com/ibuki_vr" },
                { icon: "colored-icons/shield.svg", title: "Throne", subtitle: "my wishlist", url: "https://throne.com/ibukivr" },
                { icon: "colored-icons/fansly.svg", title: "Fansly", subtitle: "18+ content", url: "REPLACE_WITH_FANSLY_URL" }
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
        a.innerHTML = iconImg(s.icon);
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
            a.innerHTML = `
                <span class="link-icon">${iconImg(link.icon)}</span>
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
