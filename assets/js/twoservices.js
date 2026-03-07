document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('hero-slider');
    const track = document.getElementById('slider-track');
    const dots = slider.querySelectorAll('[data-slide]');
    
    let currentSlide = 0;
    const totalSlides = 2;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let autoPlayTimeout;
    let lastInteractionTime = 0;
    const autoPlayDelay = 4000;

    function updateSlider(animate = true) {
        currentTranslate = currentSlide * -slider.offsetWidth;
        prevTranslate = currentTranslate;
        
        if (animate) {
            track.style.transition = 'transform 0.5s ease-out';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${currentTranslate}px)`;
        
        dots.forEach((dot, index) => {
            const isActive = index === currentSlide;
            dot.classList.toggle('bg-connect-red', isActive);
            dot.classList.toggle('w-6', isActive);
            dot.classList.toggle('bg-white/50', !isActive);
            dot.classList.toggle('w-2', !isActive);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function startAutoPlay() {
        clearTimeout(autoPlayTimeout);
        autoPlayTimeout = setTimeout(() => {
            nextSlide();
            startAutoPlay();
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearTimeout(autoPlayTimeout);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    function handleStart(pos) {
        isDragging = true;
        startPos = pos;
        lastInteractionTime = Date.now();
        track.style.transition = 'none';
        stopAutoPlay();
    }

    function handleMove(pos) {
        if (!isDragging) return;
        const diff = pos - startPos;
        currentTranslate = prevTranslate + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function handleEnd(pos) {
        if (!isDragging) return;
        isDragging = false;
        lastInteractionTime = Date.now();
        
        const diff = pos - startPos;
        
        if (diff < 0) {
            nextSlide();
        } else if (diff > 0) {
            prevSlide();
        } else {
            updateSlider();
        }
        
        resetAutoPlay();
    }

    slider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        handleStart(e.pageX);
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        handleMove(e.pageX);
    });
    
    slider.addEventListener('mouseup', (e) => handleEnd(e.pageX));
    
    slider.addEventListener('mouseleave', () => {
        if (isDragging) {
            handleEnd(startPos);
        }
    });

    slider.addEventListener('touchstart', (e) => {
        handleStart(e.touches[0].clientX);
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        handleEnd(e.changedTouches[0].clientX);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            lastInteractionTime = Date.now();
            currentSlide = index;
            updateSlider();
            resetAutoPlay();
        });
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', () => {
        lastInteractionTime = Date.now();
        resetAutoPlay();
    });

    window.addEventListener('resize', () => updateSlider(true));

    updateSlider();
    startAutoPlay();
});