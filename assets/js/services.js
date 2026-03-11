  var navSwiper = new Swiper("#navSwiper", {
        spaceBetween: 12,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
    });
    
    var contentSwiper = new Swiper("#contentSwiper", {
        spaceBetween: 0,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        thumbs: {
            swiper: navSwiper,
        },
    });