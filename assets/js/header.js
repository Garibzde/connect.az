
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuIcon = document.getElementById('menu-icon');
      const currentYearElem = document.getElementById('f-year');
      let isMenuOpen = false;

      mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
          mobileMenu.classList.remove('-translate-x-full');
          mobileMenu.classList.add('translate-x-0');
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
        } else {
          mobileMenu.classList.add('-translate-x-full');
          mobileMenu.classList.remove('translate-x-0');
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      });

      
      const mobileAccordionBtns = document.querySelectorAll('.mobile-accordion-btn');
      
      mobileAccordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const content = this.nextElementSibling;
          const icon = this.querySelector('i');
          const isOpen = !content.classList.contains('hidden');
          
       
          document.querySelectorAll('.mobile-accordion-content').forEach(c => {
            if (c !== content) {
              c.classList.add('hidden');
              c.previousElementSibling.querySelector('i').classList.remove('rotate-180');
            }
          });
          
          
          if (isOpen) {
            content.classList.add('hidden');
            icon.classList.remove('rotate-180');
          } else {
            content.classList.remove('hidden');
            icon.classList.add('rotate-180');
          }
        });
      });

      
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && isMenuOpen) {
          mobileMenu.classList.add('-translate-x-full');
          mobileMenu.classList.remove('translate-x-0');
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
          isMenuOpen = false;
        }
      });
      currentYearElem.textContent = `© Copyright ${new Date().getFullYear()}. Bütün hüquqları qorunur`;

      
      
     