document.addEventListener('DOMContentLoaded', function () {
    // カードホバー仕様
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });

    var heroContainer = document.getElementById('heroContainer');
    var scrollHint = document.getElementById('scrollHint');
    var progressNav = document.getElementById('progressNav');
    var contentSections = document.querySelectorAll('.content-section');

    // フェードアウトパラメータ
    var fadeStart = 100;
    var fadeDistance = 400;
    var transitionDuration = 0.5;

    // CSS トランジション時間
    heroContainer.style.transition = 'opacity ' + transitionDuration + 's ease-in-out';

    // スクロールイベントを監視
    window.addEventListener('scroll', function () {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // 画像の透明度を計算
        var opacity;

        if (scrollPosition <= fadeStart) {
            opacity = 1;
        } else if (scrollPosition >= fadeStart + fadeDistance) {
            opacity = 0;
        } else {
            var progress = (scrollPosition - fadeStart) / fadeDistance;
            opacity = 1 - progress;
        }

        // ナビゲーションバーの透明度を計算
        var navOpacity = 1 - opacity;

        // 画像コンテナに透明度を適用
        heroContainer.style.opacity = opacity;

        // スクロールヒントに透明度を適用
        scrollHint.style.opacity = opacity;

        // 性能改善：-pointer-events は必要時のみ設定
        if (opacity <= 0.01) {
            heroContainer.style.pointerEvents = 'none';
            scrollHint.style.pointerEvents = 'none';
        } else {
            heroContainer.style.pointerEvents = 'auto';
            scrollHint.style.pointerEvents = 'auto';
        }

        if (navOpacity > 0.1) {
            progressNav.classList.add('visible');
            progressNav.style.opacity = navOpacity;
        } else {
            progressNav.classList.remove('visible');
            progressNav.style.opacity = '0';
        }

        // コンテンツ領域のアニメーション
        contentSections.forEach(function (section) {
            var sectionTop = section.getBoundingClientRect().top;
            var triggerHeight = window.innerHeight * 0.8;

            if (sectionTop < triggerHeight) {
                section.classList.add('visible');
            }
        });
    });

    // 初期化
    setTimeout(function () {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});