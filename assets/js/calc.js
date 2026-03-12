
function calcToggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`accordion-icon-${id}`);
    
    if (!content || !icon) return;
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}


function calcSwitchInternetTab(tabName) {
    const contents = ['ferdi', 'biznes', 'adsl'];
    contents.forEach(name => {
        const el = document.getElementById(`content-${name}`);
        if (el) el.classList.add('hidden');
    });
    
    const tabs = ['ferdi', 'biznes', 'adsl'];
    tabs.forEach(name => {
        const el = document.getElementById(`tab-${name}`);
        if (el) {
            el.className = 'flex-1 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors';
        }
    });
    
    const selectedContent = document.getElementById(`content-${tabName}`);
    const selectedTab = document.getElementById(`tab-${tabName}`);
    
    if (selectedContent) selectedContent.classList.remove('hidden');
    if (selectedTab) {
        selectedTab.className = 'flex-1 py-3 px-4 text-sm font-medium text-white bg-gray-900 border-b-2 border-gray-900 transition-colors';
    }
}


function calcSwitchTvTab(tabName) {
    const contents = ['nntv', 'ektv'];
    contents.forEach(name => {
        const el = document.getElementById(`tv-content-${name}`);
        if (el) el.classList.add('hidden');
    });
    
    const tabs = ['nntv', 'ektv'];
    tabs.forEach(name => {
        const el = document.getElementById(`tv-tab-${name}`);
        if (el) {
            el.className = 'flex-1 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors';
        }
    });
    
    const selectedContent = document.getElementById(`tv-content-${tabName}`);
    const selectedTab = document.getElementById(`tv-tab-${tabName}`);
    
    if (selectedContent) selectedContent.classList.remove('hidden');
    if (selectedTab) {
        selectedTab.className = 'flex-1 py-3 px-4 text-sm font-medium text-white bg-gray-900 border-b-2 border-gray-900 transition-colors';
    }
}


function calcUpdateTotal() {
    let total = 0;
    const selectedItems = [];
    
    const calcSection = document.getElementById('calc');
    if (!calcSection) return;
    
    const radios = calcSection.querySelectorAll('input[type="radio"]:checked');
    
    radios.forEach(radio => {
        const price = parseFloat(radio.getAttribute('data-price'));
        const name = radio.getAttribute('value');
        
        if (!isNaN(price) && name) {
            total += price;
            selectedItems.push({
                name: name,
                price: price.toFixed(2)
            });
        }
    });
    
    const totalEl = document.getElementById('total-price');
    if (totalEl) {
        totalEl.textContent = total.toFixed(2);
    }
    
    // Siyahını yenilə
    const itemsList = document.getElementById('selected-items');
    if (itemsList) {
        if (selectedItems.length === 0) {
            itemsList.innerHTML = '<li class="text-gray-400 italic text-sm">Hələ heç bir tarif seçilməyib</li>';
        } else {
            itemsList.innerHTML = selectedItems.map(item => 
                `<li class="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                    <span class="font-medium text-gray-700">${item.name}</span>
                    <span class="text-red-600 font-semibold">${item.price} AZN</span>
                </li>`
            ).join('');
        }
    }
}

