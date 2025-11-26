/* i18n.js – απλό client‑side μεταφραστικό σύστημα */
(() => {
    const STORAGE_KEY = 'lang';
    const DEFAULT_LANG = 'el';               // Greek = default

    // -----------------------------------------------------------------
    // 1️⃣ Φόρτωση του dictionary από το <script id="translations">
    // -----------------------------------------------------------------
    const raw = document.getElementById('translations').textContent;
    const dict = JSON.parse(raw);

    // -----------------------------------------------------------------
    // 2️⃣ Λειτουργίες αποθήκευσης/ανάκτησης γλώσσας
    // -----------------------------------------------------------------
    const getLang = () => localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    const setLang = (lang) => {
        localStorage.setItem(STORAGE_KEY, lang);
        applyTranslations(lang);
        highlightFlag(lang);
    };

    // -----------------------------------------------------------------
    // 3️⃣ Εφαρμογή μεταφράσεων σε όλα τα στοιχεία με data-i18n
    // -----------------------------------------------------------------
    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const txt = dict[key] && dict[key][lang];
            if (!txt) return;

            // Αν είναι INPUT/TEXTAREA, αλλάζουμε placeholder/value
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.type === 'email' || el.type === 'text' || el.type === 'tel') {
                    el.placeholder = txt;
                } else {
                    el.value = txt;
                }
            } else {
                el.textContent = txt;
            }
        });
    };

    // -----------------------------------------------------------------
    // 4️⃣ Επισήμανση ενεργής σημαίας
    // -----------------------------------------------------------------
    const highlightFlag = (lang) => {
        document.querySelectorAll('.lang-switcher a')
                .forEach(a => a.classList.toggle('active', a.dataset.lang === lang));
    };

    // -----------------------------------------------------------------
    // 5️⃣ Εκκίνηση – προσθήκη event listeners στα flags
    // -----------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        const current = getLang();
        applyTranslations(current);
        highlightFlag(current);

        document.querySelectorAll('.lang-switcher a').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                setLang(a.dataset.lang);
            });
        });
    });
})();
