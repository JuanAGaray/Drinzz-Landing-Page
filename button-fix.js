// Script con hash en la URL
document.addEventListener('DOMContentLoaded', function() {
    console.log('Button script with hash loaded');
    
    let lastClickTime = 0;
    const CLICK_DEBOUNCE = 300; // 300ms entre clicks
    
    // Función para resetear todos los botones
    function resetAllButtons() {
        const buttons = document.querySelectorAll('.section-alcohol-btn');
        buttons.forEach(btn => {
            btn.classList.remove('activo');
            btn.classList.add('inactivo');
        });
    }
    
    // Función para activar un botón
    function activateButton(button) {
        button.classList.remove('inactivo');
        button.classList.add('activo');
    }
    
    // Función para cambiar la sección
    function showSection(type) {
        const menuSinAlcohol = document.getElementById('menu-sin-alcohol');
        const menuConAlcohol = document.getElementById('menu-con-alcohol');
        
        if (type === 'sin-alcohol') {
            if (menuSinAlcohol) menuSinAlcohol.style.display = 'grid';
            if (menuConAlcohol) menuConAlcohol.style.display = 'none';
        } else if (type === 'con-alcohol') {
            if (menuSinAlcohol) menuSinAlcohol.style.display = 'none';
            if (menuConAlcohol) menuConAlcohol.style.display = 'grid';
        }
    }
    
    // Función para manejar el hash
    function handleHash() {
        const hash = window.location.hash;
        console.log('Current hash:', hash);
        
        resetAllButtons();
        
        if (hash === '#sin-alcohol') {
            const sinAlcoholButtons = document.querySelectorAll('.sin-alcohol-btn');
            sinAlcoholButtons.forEach(btn => activateButton(btn));
            showSection('sin-alcohol');
        } else {
            // Por defecto mostrar con alcohol
            const conAlcoholButtons = document.querySelectorAll('.con-alcohol-btn');
            conAlcoholButtons.forEach(btn => activateButton(btn));
            showSection('con-alcohol');
        }
    }
    
    // Estado inicial basado en hash
    setTimeout(() => {
        handleHash();
        console.log('Initial state set based on hash');
    }, 100);
    
    // Event listeners para botones con prevención de doble click
    document.addEventListener('click', function(e) {
        // Buscar el botón padre si se clickeó en un elemento hijo
        let button = e.target;
        while (button && !button.classList.contains('section-alcohol-btn')) {
            button = button.parentElement;
        }
        
        if (button && button.classList.contains('section-alcohol-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTime = Date.now();
            
            // Debounce: prevenir clicks muy rápidos
            if (currentTime - lastClickTime < CLICK_DEBOUNCE) {
                console.log('Click too fast, ignoring');
                return;
            }
            lastClickTime = currentTime;
            
            const type = button.getAttribute('data-type');
            console.log('Button clicked, type:', type, 'target:', e.target);
            
            // Prevenir doble click
            if (button.classList.contains('activo')) {
                console.log('Button already active, ignoring click');
                return;
            }
            
            // Cambiar hash en la URL
            window.location.hash = type;
            
            // El hashchange event se encargará del resto
        }
    });
    
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', function() {
        handleHash();
    });
});
