document.addEventListener('DOMContentLoaded', async () => {

    lucide.createIcons();

    /* ========================
       NAV SCROLL
    ======================== */
    const nav = document.getElementById('main-nav');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    /* ========================
       TESTIMONIAL TICKER
    ======================== */
    const ticker = document.getElementById('testimonial-ticker');
    const reviews = [
        { text: "MANTAPPP POLLL! Sambelnya nendang banget 🔥", author: "Arini L." },
        { text: "Tempatnya asik buat arisan & nongkrong.", author: "Bagas P." },
        { text: "Restoran rasa bintang 5, harga merakyat!", author: "Maya C." },
        { text: "Dimsum Mentai favorit anak-anak, lumer!", author: "Rina W." },
        { text: "Pelayanan super ramah, berasa di rumah sendiri.", author: "Doni K." }
    ];

    if (ticker) {
        const items = [...reviews, ...reviews, ...reviews];
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'flex items-center space-x-4 px-12';
            div.innerHTML = `
                <span class="text-yellow-400 text-lg flex">
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                </span>
                <span class="text-xl font-serif italic text-white">"${item.text}"</span>
                <span class="text-sm opacity-60 text-[#F5F5DC]"> — ${item.author}</span>
            `;
            ticker.appendChild(div);
        });
        lucide.createIcons();
    }

    /* ========================
       GSAP ANIMATIONS
    ======================== */
    gsap.registerPlugin(ScrollTrigger);

    // Hero — staggered fade-up, ringan & smooth
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .from('#hero-stars',  { opacity: 0, y: 20, duration: 0.7 })
        .from('#hero-title',  { opacity: 0, y: 40, duration: 0.9 }, '-=0.3')
        .from('#hero-subtext',{ opacity: 0, y: 25, duration: 0.7 }, '-=0.5')
        .from('#hero-btns',   { opacity: 0, y: 20, duration: 0.6 }, '-=0.4');

    // Menu cards — fade-up with stagger, hanya animasi opacity + translateY
    gsap.from('.menu-card', {
        scrollTrigger: {
            trigger: '#menu-grid',
            start: 'top 82%',
            once: true,
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
    });

    // Why Us cards (section bg-[#F5F5DC])
    gsap.from('.rounded-3xl', {
        scrollTrigger: {
            trigger: '.rounded-3xl',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
    });

    // Ambiance section — kiri fade-in dari kiri, kanan dari kanan
    gsap.from('#space .space-y-8', {
        scrollTrigger: {
            trigger: '#space',
            start: 'top 80%',
            once: true,
        },
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
    });

    gsap.from('#space .rounded-\\[40px\\]', {
        scrollTrigger: {
            trigger: '#space',
            start: 'top 80%',
            once: true,
        },
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
    });

    // Feature containers inside Ambiance — stagger ringan
    gsap.from('#space .grid .flex', {
        scrollTrigger: {
            trigger: '#space .grid',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3,
    });

    // Events cards
    gsap.from('#events .border', {
        scrollTrigger: {
            trigger: '#events',
            start: 'top 80%',
            once: true,
        },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
    });

    // Contact section
    gsap.from('#contact .space-y-8 > *', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 82%',
            once: true,
        },
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
    });

    /* ========================
       SMOOTH SCROLL
    ======================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = nav.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ========================
       EXIT INTENT POPUP
       (dipindah dari inline HTML ke sini agar terorganisir)
    ======================== */
    const popup    = document.getElementById('exit-popup');
    const popupBox = document.getElementById('exit-popup-box');
    const closeBtn = document.getElementById('close-popup');

    if (!popup || !popupBox || !closeBtn) return;

    let shown = false;

    function showPopup() {
        if (shown) return;
        shown = true;
        popup.classList.remove('opacity-0', 'pointer-events-none');
        popupBox.classList.remove('scale-90');
        popupBox.classList.add('scale-100');
    }

    function hidePopup() {
        popup.classList.add('opacity-0', 'pointer-events-none');
        popupBox.classList.remove('scale-100');
        popupBox.classList.add('scale-90');
    }

    // Desktop exit intent
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) showPopup();
    });

    // Mobile: muncul setelah 15 detik
    setTimeout(showPopup, 15000);

    // Mobile: muncul saat scroll 70%
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if (scrolled > 0.7) showPopup();
    }, { passive: true });

    closeBtn.addEventListener('click', hidePopup);
});
