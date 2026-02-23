document.addEventListener('DOMContentLoaded', async () => {

    lucide.createIcons();

    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

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

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    tl.from('#hero-title', { opacity: 0, y: 50, duration: 1.2, ease: 'power4.out' })
      .from('#hero-subtext', { opacity: 0, y: 30, duration: 0.8 }, '-=0.7')
      .from('#hero-btns', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('#hero-stars', { opacity: 0, scale: 0.5, duration: 0.5 }, '-=0.5');

    gsap.from('.menu-card', {
        scrollTrigger: {
            trigger: '#menu-grid',
            start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out'
    });

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
});
