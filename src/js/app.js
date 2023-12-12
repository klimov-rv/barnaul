document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.site-wrap').classList.add('dom-loaded');

    if ($('.bubble_card').length > 0) {

        document.querySelector('.bubble_card__close').addEventListener('click', e => {
            e.target.closest('.bubble_card').classList.add('is-closed');
        })

        window.addEventListener('scroll', () => {
            document.querySelector('.bubble_card').classList.toggle('is-scrolled', window.scrollY > 300);
        })

    }

    // magnificPopup  
    if ($('.popup-with-zoom-anim').length > 0) {
        $('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });
    }

});