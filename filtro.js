document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#filtro button');
    const productos = document.querySelectorAll('main article');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filtro = button.getAttribute('data-filter');
            productos.forEach(producto => {
                if (filtro === 'todos') {
                    producto.style.display = 'block';
                } else {
                    if (producto.classList.contains(filtro)) {
                        producto.style.display = 'block';
                    } else {
                        producto.style.display = 'none';
                    }
                }
            });
        });
    });
});