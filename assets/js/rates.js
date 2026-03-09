let currentType = 'ferdi';
let currentTab = 'gpon';

function toggleType() {
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleCircle = document.getElementById('toggleCircle');
    const labelFerdi = document.getElementById('labelFerdi');
    const labelBiznes = document.getElementById('labelBiznes');

    if (currentType === 'ferdi') {
        currentType = 'biznes';
        toggleBtn.classList.remove('bg-gray-300');
        toggleBtn.classList.add('bg-gray-900');
        toggleCircle.classList.add('translate-x-7');
        labelFerdi.classList.remove('text-gray-900');
        labelFerdi.classList.add('text-gray-500');
        labelBiznes.classList.remove('text-gray-500');
        labelBiznes.classList.add('text-gray-900');
        
        showOnlyGponTab();
    } else {
        currentType = 'ferdi';
        toggleBtn.classList.remove('bg-gray-900');
        toggleBtn.classList.add('bg-gray-300');
        toggleCircle.classList.remove('translate-x-7');
        labelFerdi.classList.remove('text-gray-500');
        labelFerdi.classList.add('text-gray-900');
        labelBiznes.classList.remove('text-gray-900');
        labelBiznes.classList.add('text-gray-500');
        
        showAllTabs();
    }
    
    updateCards();
}

function showOnlyGponTab() {
    const tabs = document.querySelectorAll('.tarif-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === 'gpon') {
            tab.style.display = 'block';
            tab.classList.add('active', 'border-b-2', 'border-gray-900', 'text-gray-900');
            tab.classList.remove('text-gray-500');
        } else {
            tab.style.display = 'none';
            tab.classList.remove('active', 'border-b-2', 'border-gray-900', 'text-gray-900');
            tab.classList.add('text-gray-500');
        }
    });
    currentTab = 'gpon';
}

function showAllTabs() {
    const tabs = document.querySelectorAll('.tarif-tab');
    tabs.forEach(tab => {
        tab.style.display = 'block';
        if (tab.dataset.tab === 'gpon') {
            tab.classList.add('active', 'border-b-2', 'border-gray-900', 'text-gray-900');
            tab.classList.remove('text-gray-500');
        } else {
            tab.classList.remove('active', 'border-b-2', 'border-gray-900', 'text-gray-900');
            tab.classList.add('text-gray-500');
        }
    });
    currentTab = 'gpon';
}

function switchTab(tabName) {
    if (currentType === 'biznes' && tabName !== 'gpon') {
        return;
    }
    
    currentTab = tabName;
    
    document.querySelectorAll('.tarif-tab').forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active', 'border-b-2', 'border-gray-900', 'text-gray-900');
            tab.classList.remove('text-gray-500');
        } else {
            tab.classList.remove('active', 'border-b-2', 'border-gray-900', 'text-gray-900');
            tab.classList.add('text-gray-500');
        }
    });
    
    updateCards();
}

function updateCards() {
    document.querySelectorAll('.tarif-cards').forEach(cards => {
        cards.classList.add('hidden');
    });
    
    const selector = `.tarif-cards.${currentTab}.${currentType}`;
    const targetCards = document.querySelector(selector);
    
    if (targetCards) {
        targetCards.classList.remove('hidden');
    } else {
        if (currentType === 'biznes') {
            currentTab = 'gpon';
            document.querySelector('.tarif-cards.gpon.biznes').classList.remove('hidden');
        }
    }
}

function scrollCards(direction) {
    const container = document.getElementById('cardsContainer');
    const scrollAmount = 300;
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCards();
});