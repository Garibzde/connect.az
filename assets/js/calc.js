 function toggleAccordion(id) {
        const content = document.getElementById(`content-${id}`);
        const icon = document.getElementById(`accordion-icon-${id}`);
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');       
        
    }

    function switchTab(category, tabName) {
        document.getElementById('content-ferdi').classList.add('hidden');
        document.getElementById('content-biznes').classList.add('hidden');
        document.getElementById('content-adsl').classList.add('hidden');
        
        document.getElementById('tab-ferdi').className = 'flex-1 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors';
        document.getElementById('tab-biznes').className = 'flex-1 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors';
        document.getElementById('tab-adsl').className = 'flex-1 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors';
        
        document.getElementById(`content-${tabName}`).classList.remove('hidden');
        document.getElementById(`tab-${tabName}`).className = 'flex-1 py-3 px-4 text-sm font-medium text-white bg-gray-900 border-b-2 border-gray-900 transition-colors';
    }

    function switchTvTab(tabName) {
        document.getElementById('tv-content-nntv').classList.add('hidden');
        document.getElementById('tv-content-ektv').classList.add('hidden');
        
        document.getElementById('tv-tab-nntv').className = 'flex-1 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors';
        document.getElementById('tv-tab-ektv').className = 'flex-1 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors';
        
        document.getElementById(`tv-content-${tabName}`).classList.remove('hidden');
        document.getElementById(`tv-tab-${tabName}`).className = 'flex-1 py-3 px-4 text-sm font-medium text-white bg-gray-900 border-b-2 border-gray-900 transition-colors';
    }

    function calculateTotal() {
        let total = 0;
        const selectedItems = [];
        
        const radios = document.querySelectorAll('input[type="radio"]:checked');
        
        radios.forEach(radio => {
            const price = parseFloat(radio.getAttribute('data-price'));
            const name = radio.getAttribute('value');
            
            if (price && name) {
                total += price;
                selectedItems.push({
                    name,
                    price: price.toFixed(2)
                });
            }
        });
        
        document.getElementById('total-price').textContent = total.toFixed(2);
        
        const itemsList = document.getElementById('selected-items');
        if (selectedItems.length === 0) {
            itemsList.innerHTML = '<li class="text-gray-400 italic text-sm">Hələ heç bir tarif seçilməyib</li>';
        } else {
            itemsList.innerHTML = selectedItems.map(item => 
                `<li class="flex justify-between items-center py-1 border-b border-gray-200 last:border-0">
                    <span class="font-medium text-gray-700">${item.name}</span>
                    <span class="text-red-600 font-semibold">${item.price} AZN</span>
                </li>`
            ).join('');
        }
    }

 