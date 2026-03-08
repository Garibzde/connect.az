 const services = [
        {
            title: "NNTV",
            desc: "NNTV - OTT TV xidməti, IP TV xidmətinin bir növü olub, Teleyayımın internet üzərindən ötürülməsi texnologiyasıdır.",
            image: "assets/img/nntv.webp" 
        },
        {
            title: "Qoşulma",
            desc: "Connect TV-yə qoşulmaq üçün şirkətə Müştəri Xidmətləri, Diler şəbəkələri və Məlumat Mərkəzi (159), www.connect.az saytında onlayn çat vasitəsilə müraciət edib müqavilə bağlaya bilərsiniz.",
            image: "assets/img/services1.png" 
        },
        {
            title: "Texniki servis",
            desc: "Problem şirkət tərəfindən olarsa texniki servis ödənişsiz həyata keçirilir, bunun əksi olan halda abunəçi texniki servisə görə qeyd olunan məbləği ödəyir.",
            image: "assets/img/tel.png" 
        },
        {
            title: "Efir-kabel (rəqəmsal tv)",
            desc: "\"CONNECT\" TV Rəqəmsal efir-kabel TV kanallarının yayımı şəbəkəsidir, Bakı və Abşeron yarımadasını əhatə edir.",
            image: "assets/img/nntv.webp" 
        },
        {
            title: "Fiber-optik internet",
            desc: "Fiber optik şəbəkənin çəkilməsi insanların daha sürətli, daha keyfiyyətli və daha sərfəli internet xidmətlərindən istifadə etməsinə imkan yaradır. Çünki bu texnologiya məhdudiyyət tanımır.",
            image: "assets/img/fiber-optic.png" 
        }
    ];

    let currentIndex = 0;

    function switchService(index) {
        currentIndex = index;
        
       
        document.querySelectorAll('.service-tab').forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        
        const title = document.getElementById('serviceTitle');
        const desc = document.getElementById('serviceDesc');
        const image = document.getElementById('serviceImage');
        
        
        title.style.opacity = '0';
        desc.style.opacity = '0';
        image.style.opacity = '0';
        
        setTimeout(() => {
            title.textContent = services[index].title;
            desc.textContent = services[index].desc;
            image.src = services[index].image;
            image.alt = services[index].title;
            
            // Fade in
            title.style.opacity = '1';
            desc.style.opacity = '1';
            image.style.opacity = '1';
        }, 200);
    }

    function nextService() {
        currentIndex = (currentIndex + 1) % services.length;
        switchService(currentIndex);
        scrollToTab(currentIndex);
    }

    function prevService() {
        currentIndex = (currentIndex - 1 + services.length) % services.length;
        switchService(currentIndex);
        scrollToTab(currentIndex);
    }

    function scrollToTab(index) {
        const container = document.getElementById('tabsContainer');
        const tab = container.children[index];
        if (tab) {
            const containerWidth = container.offsetWidth;
            const tabLeft = tab.offsetLeft;
            const tabWidth = tab.offsetWidth;
            const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }

    
    document.addEventListener('DOMContentLoaded', () => {
        switchService(0);
    });