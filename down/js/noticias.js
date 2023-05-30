var noticiasSwiper = new Swiper('#swipper-noticias', {
    effect: 'slide',
    slidesPerView: 3,
    noSwiping: false,
    allowSlidePrev: false,
    allowSlideNext: false,
    initialSlide: 0,
    loop: false,
    speed: 600,
    autoplay: false,
    keyboard: false,
    breakpoints: {
        1139: {
            slidesPerView: 3,
            noSwiping: true,
            allowSlidePrev: true,
            allowSlideNext: true,
            spaceBetween: 0
        },
        991: {
            slidesPerView: 2.5,
            noSwiping: true,
            allowSlidePrev: true,
            allowSlideNext: true,
            spaceBetween: 0
        },
        767: {
            slidesPerView: 2,
            noSwiping: true,
            allowSlidePrev: true,
            allowSlideNext: true,
            spaceBetween: 0
        },
        575: {
            slidesPerView: 2,
            noSwiping: true,
            allowSlidePrev: true,
            allowSlideNext: true,
            spaceBetween: 0
        },
        425: {
            slidesPerView: 1.3,
            noSwiping: true,
            allowSlidePrev: true,
            allowSlideNext: true,
            spaceBetween: 0
        }
    },
});