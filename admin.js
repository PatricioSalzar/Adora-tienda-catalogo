        // Variables globales
        let isAdminMode = false;
        let isEditMode = false;
        
        // Credenciales de administrador (cambiar por algo más seguro en producción)
        const ADMIN_CREDENTIALS = {
            password: 'adora2024'
        };


         function openAdminLogin() {
            document.getElementById('adminModal').style.display = 'block';
        }

        function closeAdminLogin() {
            document.getElementById('adminModal').style.display = 'none';
            document.getElementById('adminPass').value = '';
        }

        function adminLogin() {
            const password = document.getElementById('adminPass').value;
            
            if (password === ADMIN_CREDENTIALS.password) {
                isAdminMode = true;
                document.getElementById('adminPanel').style.display = 'block';
                document.getElementById('adminStatus').style.display = 'block';
                closeAdminLogin();
                alert('¡Bienvenido al panel de administración!');
            } else {
                alert('Credenciales incorrectas');
            }
        }

        function logoutAdmin() {
            isAdminMode = false;
            isEditMode = false;
            document.getElementById('adminPanel').style.display = 'none';
            document.getElementById('adminStatus').style.display = 'none';
            
            // Remover controles de edición
            document.querySelectorAll('.edit-controls').forEach(control => {
                control.remove();
            });
            document.querySelectorAll('.edit-mode').forEach(article => {
                article.classList.remove('edit-mode');
            });
            
            alert('Sesión de administrador cerrada');
        }

        function toggleEditMode() {
            if (!isAdminMode) return;
            
            isEditMode = !isEditMode;
            const articles = document.querySelectorAll('main article');
            
            if (isEditMode) {
                articles.forEach(article => {
                    article.classList.add('edit-mode');
                    
                    // Agregar controles de edición
                    const controls = document.createElement('div');
                    controls.className = 'edit-controls';
                    controls.innerHTML = `
                        <button onclick="editProduct(this)" title="Editar">✏️</button>
                        <button onclick="deleteProduct(this)" title="Eliminar">🗑️</button>
                    `;
                    article.appendChild(controls);
                });
                alert('Modo edición activado - Click en los iconos para editar o eliminar productos');
            } else {
                articles.forEach(article => {
                    article.classList.remove('edit-mode');
                    const controls = article.querySelector('.edit-controls');
                    if (controls) controls.remove();
                });
                alert('Modo edición desactivado');
            }
        }

        function showAddProductForm() {
            if (!isAdminMode) return;
            document.getElementById('productForm').style.display = 'block';
        }

        function hideAddProductForm() {
            document.getElementById('productForm').style.display = 'none';
            // Limpiar formulario
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productImage').value = '';
        }

        function addProduct() {
            if (!isAdminMode) return;
            
            const name = document.getElementById('productName').value;
            const price = document.getElementById('productPrice').value;
            const category = document.getElementById('productCategory').value;
            const image = document.getElementById('productImage').value || 'img/default.jpg';
            
            if (!name || !price) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }
            
            // Crear nuevo artículo
            const article = document.createElement('article');
            article.className = category;
            article.innerHTML = `
                <h3>${name}</h3>
                <img src="${image}" width="100" onerror="this.src='img/default.jpg'">
                <h2>${price}</h2>
            `;
            
            // Agregar al contenedor
            document.getElementById('productContainer').appendChild(article);
            
            // Si estamos en modo edición, agregar controles
            if (isEditMode) {
                article.classList.add('edit-mode');
                const controls = document.createElement('div');
                controls.className = 'edit-controls';
                controls.innerHTML = `
                    <button onclick="editProduct(this)" title="Editar">✏️</button>
                    <button onclick="deleteProduct(this)" title="Eliminar">🗑️</button>
                `;
                article.appendChild(controls);
            }
            
            hideAddProductForm();
            alert('Producto agregado exitosamente!');
        }

        function deleteProduct(button) {
            if (!isAdminMode || !confirm('¿Estás seguro de eliminar este producto?')) return;
            
            const article = button.closest('article');
            article.remove();
            alert('Producto eliminado');
        }

        function editProduct(button) {
            if (!isAdminMode) return;
            
            const article = button.closest('article');
            const name = article.querySelector('h3').textContent;
            const price = article.querySelector('h2').textContent;
            
            const newName = prompt('Nuevo nombre del producto:', name);
            if (newName && newName !== name) {
                article.querySelector('h3').textContent = newName;
            }
            
            const newPrice = prompt('Nuevo precio:', price);
            if (newPrice && newPrice !== price) {
                article.querySelector('h2').textContent = newPrice;
            }
        }

        // Cerrar modal al hacer click fuera
        window.onclick = function(event) {
            const modal = document.getElementById('adminModal');
            if (event.target == modal) {
                closeAdminLogin();
            }
        }