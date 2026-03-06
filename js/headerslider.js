document.addEventListener('DOMContentLoaded', function() {
      
      const progressCircle = document.getElementById('progress-circle');
      const progressText = document.getElementById('progress-text');
      const currentSlideEl = document.getElementById('current-slide');
      const totalSlidesEl = document.getElementById('total-slides');

      const swiper = new Swiper(".mySwiper", {
        spaceBetween: 0,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        speed: 800,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        on: {
          autoplayTimeLeft(s, time, progress) {
            
            const circumference = 125.6;
            const offset = circumference * progress;
            progressCircle.style.strokeDashoffset = offset;
            
            
            const secondsLeft = Math.ceil(time / 1000);
            progressText.textContent = secondsLeft;
          },
          slideChange() {
            currentSlideEl.textContent = this.realIndex + 1;
          },
          init() {
            
            totalSlidesEl.textContent = this.slides.length ; 
            currentSlideEl.textContent = this.realIndex + 1;
          }
        }
      });

      
      document.getElementById('btn-prev').addEventListener('click', () => {
        swiper.slidePrev();
      });

      document.getElementById('btn-next').addEventListener('click', () => {
        swiper.slideNext();
      });
    });