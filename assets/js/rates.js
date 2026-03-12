let currentTab = "gpon";
let isBusiness = false;
let swipers = {};
let initializedSwipers = {};

const getSwiperConfig = (key) => ({
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    speed: 400,
    navigation: {
        nextEl: `#wrapper-${key} .swiper-button-next`,
        prevEl: `#wrapper-${key} .swiper-button-prev`,
    },
    breakpoints: {
        640: {
            slidesPerView: 2.2,
            spaceBetween: 20,
            centeredSlides: true,
        },
        1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
            centeredSlides: true,
        },
    },
    observer: true,
    observeParents: true,
    resizeObserver: true,
});

function initSwiper(key, selector) {
    if (!initializedSwipers[key]) {
        swipers[key] = new Swiper(selector, getSwiperConfig(key));
        initializedSwipers[key] = true;
    } else {
        swipers[key].update();
    }
}

function switchTab(tabName) {
    currentTab = tabName;

    document.querySelectorAll(".tarif-tab").forEach((tab) => {
        const isActive = tab.dataset.tab === tabName;
        tab.classList.toggle("active", isActive);
        tab.classList.toggle("text-gray-900", isActive);
        tab.classList.toggle("text-gray-500", !isActive);
    });

    document.querySelectorAll(".swiper-container-wrapper").forEach((wrapper) => {
        wrapper.classList.add("hidden");
    });

    let targetKey;
    let targetWrapperId;
    let targetSwiperId;

    if (tabName === "gpon") {
        document.getElementById("typeToggle").style.display = "flex";
        targetKey = isBusiness ? "gpon-biznes" : "gpon-ferdi";
        targetWrapperId = `wrapper-${targetKey}`;
        targetSwiperId = `swiper-${targetKey}`;
    } else {
        document.getElementById("typeToggle").style.display = "none";
        targetKey = tabName;
        targetWrapperId = `wrapper-${tabName}`;
        targetSwiperId = `swiper-${tabName}`;
    }

    const targetWrapper = document.getElementById(targetWrapperId);
    const targetSwiper = document.getElementById(targetSwiperId);
    
    if (targetWrapper && targetSwiper) {
        targetWrapper.classList.remove("hidden");
        
        setTimeout(() => {
            initSwiper(targetKey, `#${targetSwiperId}`);
        }, 10);
    }
}

function toggleType() {
    isBusiness = !isBusiness;

    const btn = document.getElementById("toggleBtn");
    const labelFerdi = document.getElementById("labelFerdi");
    const labelBiznes = document.getElementById("labelBiznes");

    btn.classList.toggle("ferdi-mode", !isBusiness);

    labelFerdi.classList.toggle("text-gray-900", !isBusiness);
    labelFerdi.classList.toggle("text-gray-500", isBusiness);

    labelBiznes.classList.toggle("text-gray-900", isBusiness);
    labelBiznes.classList.toggle("text-gray-500", !isBusiness);

    if (currentTab === "gpon") {
        switchTab("gpon");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    isBusiness = false;
    const btn = document.getElementById("toggleBtn");
    const labelFerdi = document.getElementById("labelFerdi");
    const labelBiznes = document.getElementById("labelBiznes");

    btn.classList.add("ferdi-mode");
    labelFerdi.classList.add("text-gray-900");
    labelFerdi.classList.remove("text-gray-500");
    labelBiznes.classList.add("text-gray-500");
    labelBiznes.classList.remove("text-gray-900");

    switchTab("gpon");
});