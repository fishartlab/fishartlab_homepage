/*  上部のナビゲーション */
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.features');
    const navLinks = document.querySelectorAll('.progress-nav-link');
    const progressFill = document.querySelector('.progress-fill');

    // スクロール時にアクティブなセクションを更新
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // 進捗バーの更新
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressFill.style.width = scrollPercent + '%';
    });

    // スムーズスクロール
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 120,
                behavior: 'smooth'
            });
        });
    });
});