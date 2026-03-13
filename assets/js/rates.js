let currentTab = "gpon";
let isBusiness = false;

const swipers = {};
const initializedSwipers = {};

function getSlidesCount(selector) {
    return document.querySelectorAll(`${selector} .swiper-slide`).length;
}

function getStartIndex(selector) {
    const slidesCount = getSlidesCount(selector);
    if (slidesCount <= 1) return 0;

    // İlk real kartdan başlasın
    return 0;
}

function getResponsiveSlidesPerView(slidesCount) {
    return {
        mobile: slidesCount <= 1 ? 1 : Math.min(1.2, slidesCount),
        tablet: slidesCount <= 1 ? 1 : Math.min(2.2, slidesCount),
        desktop: slidesCount >= 4 ? 3.5 : slidesCount
    };
}

function getSwiperConfig(key, selector) {
    const slidesCount = getSlidesCount(selector);
    const isSingleSlide = slidesCount <= 1;
    const views = getResponsiveSlidesPerView(slidesCount);

    return {
        slidesPerView: views.mobile,
        centeredSlides: !isSingleSlide,
        spaceBetween: 24,
        loop: slidesCount > 4,
        speed: 500,
        initialSlide: 0,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        resizeObserver: true,

        navigation: {
            nextEl: `#wrapper-${key} .swiper-button-next`,
            prevEl: `#wrapper-${key} .swiper-button-prev`,
        },

        breakpoints: {
            640: {
                slidesPerView: views.tablet,
                centeredSlides: !isSingleSlide,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: views.desktop,
                centeredSlides: !isSingleSlide,
                spaceBetween: 24,
            },
        },

        on: {
            init(swiper) {
                updateSliderUI(key, selector, swiper);
            },
            slideChange(swiper) {
                updateSliderUI(key, selector, swiper);
            },
            resize(swiper) {
                updateSliderUI(key, selector, swiper);
            },
        },
    };
}

function updateSliderUI(key, selector, swiper) {
    const wrapper = document.getElementById(`wrapper-${key}`);
    if (!wrapper) return;

    const slidesCount = getSlidesCount(selector);

    const leftOverlay = wrapper.querySelector(".left-overlay");
    const rightOverlay = wrapper.querySelector(".right-overlay");
    const prevBtn = wrapper.querySelector(".swiper-button-prev");
    const nextBtn = wrapper.querySelector(".swiper-button-next");

    // tək kart üçün hər şeyi gizlət
    if (slidesCount <= 1) {
        if (leftOverlay) leftOverlay.style.display = "none";
        if (rightOverlay) rightOverlay.style.display = "none";
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
    }

    // overlay yalnız desktopda
    if (window.innerWidth <= 1023) {
        if (leftOverlay) leftOverlay.style.display = "none";
        if (rightOverlay) rightOverlay.style.display = "none";
    } else {
        if (leftOverlay) leftOverlay.style.display = "block";
        if (rightOverlay) rightOverlay.style.display = "block";
    }

    // düymələr mobilde gizli
    if (window.innerWidth <= 768) {
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
    } else {
        if (prevBtn) prevBtn.style.display = "flex";
        if (nextBtn) nextBtn.style.display = "flex";
    }
}

function initSwiper(key, selector) {
    const startIndex = getStartIndex(selector);

    if (!initializedSwipers[key]) {
        const config = getSwiperConfig(key, selector);
        swipers[key] = new Swiper(selector, config);
        initializedSwipers[key] = true;

        requestAnimationFrame(() => {
            if (!swipers[key]) return;

            swipers[key].update();
            swipers[key].updateSize();
            swipers[key].updateSlides();

            if (swipers[key].params.loop) {
                swipers[key].slideToLoop(startIndex, 0, false);
            } else {
                swipers[key].slideTo(startIndex, 0, false);
            }

            updateSliderUI(key, selector, swipers[key]);
        });
    } else {
        requestAnimationFrame(() => {
            if (!swipers[key]) return;

            swipers[key].update();
            swipers[key].updateSize();
            swipers[key].updateSlides();
            swipers[key].updateProgress();

            if (swipers[key].params.loop) {
                swipers[key].slideToLoop(startIndex, 0, false);
            } else {
                swipers[key].slideTo(startIndex, 0, false);
            }

            updateSliderUI(key, selector, swipers[key]);
        });
    }
}

function updateTabStyles(tabName) {
    document.querySelectorAll(".tarif-tab").forEach((tab) => {
        const isActive = tab.dataset.tab === tabName;

        tab.classList.toggle("active", isActive);
        tab.classList.toggle("text-gray-900", isActive);
        tab.classList.toggle("text-gray-500", !isActive);
    });
}

function hideAllWrappers() {
    document.querySelectorAll(".swiper-container-wrapper").forEach((wrapper) => {
        wrapper.classList.add("hidden");
    });
}

function updateToggleUI() {
    const btn = document.getElementById("toggleBtn");
    const labelFerdi = document.getElementById("labelFerdi");
    const labelBiznes = document.getElementById("labelBiznes");

    if (!btn || !labelFerdi || !labelBiznes) return;

    btn.classList.toggle("ferdi-mode", !isBusiness);
    labelFerdi.classList.toggle("text-gray-900", !isBusiness);
    labelFerdi.classList.toggle("text-gray-500", isBusiness);
    labelBiznes.classList.toggle("text-gray-900", isBusiness);
    labelBiznes.classList.toggle("text-gray-500", !isBusiness);
}

function getTargetData(tabName) {
    if (tabName === "gpon") {
        const key = isBusiness ? "gpon-biznes" : "gpon-ferdi";
        return {
            key,
            wrapperId: `wrapper-${key}`,
            swiperId: `swiper-${key}`,
            showToggle: true,
        };
    }

    return {
        key: tabName,
        wrapperId: `wrapper-${tabName}`,
        swiperId: `swiper-${tabName}`,
        showToggle: false,
    };
}

function switchTab(tabName) {
    currentTab = tabName;

    updateTabStyles(tabName);
    hideAllWrappers();

    const { key, wrapperId, swiperId, showToggle } = getTargetData(tabName);

    const typeToggle = document.getElementById("typeToggle");
    if (typeToggle) {
        typeToggle.style.display = showToggle ? "flex" : "none";
    }

    const targetWrapper = document.getElementById(wrapperId);
    if (!targetWrapper) return;

    targetWrapper.classList.remove("hidden");

    requestAnimationFrame(() => {
        initSwiper(key, `#${swiperId}`);
    });
}

function toggleType() {
    isBusiness = !isBusiness;
    updateToggleUI();

    if (currentTab === "gpon") {
        switchTab("gpon");
    }
}

window.addEventListener("resize", () => {
    const { key, swiperId } = getTargetData(currentTab);
    const selector = `#${swiperId}`;

    if (swipers[key]) {
        swipers[key].update();
        swipers[key].updateSize();
        swipers[key].updateSlides();
        updateSliderUI(key, selector, swipers[key]);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updateToggleUI();
    switchTab("gpon");
});