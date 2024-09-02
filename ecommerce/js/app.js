document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const page = window.location.pathname.split('/').pop();

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            submitProductForm();
        });
    }

    if (page === 'index.html' || page === 'backoffice.html') {
        fetchProducts();
    } else if (page === 'product.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        fetchProductDetails(productId);
    }
});

// Funzione per ottenere i dettagli di un singolo prodotto
const fetchProductDetails = async (id) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY' 
            }
        });
        const product = await response.json();
        renderProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

// Funzione per renderizzare i dettagli del prodotto
const renderProductDetails = (product) => {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Marca: ${product.brand}</p>
        <p>Prezzo: ${product.price}€</p>
    `;
};


// Funzione per gestire l'invio del form
const submitProductForm = async () => {
    const form = document.getElementById('product-form');
    
    // Raccoglie i dati dal form
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const price = document.getElementById('price').value;

    const productData = {
        name: name,
        description: description,
        brand: brand,
        imageUrl: imageUrl,
        price: price
    };

    // Imposta le opzioni di richiesta
    const requestOptions = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY'
        },
        body: JSON.stringify(productData)
    };

    // Effettua la richiesta al server
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', requestOptions);

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Product saved:', jsonResponse);
            alert('Prodotto salvato con successo!');
            form.reset(); // Resetta il form dopo il salvataggio
            fetchProducts(); // Aggiorna la lista dei prodotti se necessario
        } else {
            throw new Error('Failed to save the product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Errore nel salvare il prodotto: ' + error.message);
    }
};


async function fetchProducts() {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY' }
        });
        const products = await response.json();
        const page = window.location.pathname.split('/').pop();
        if (page === 'index.html') {
            renderProducts(products);
        } else if (page === 'backoffice.html') {
            renderProductsBO(products);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Funzione per renderizzare i prodotti frontpage
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <a href="product.html?id=${product._id}">Vedi Dettagli</a>
        `;
        productList.appendChild(productCard);
    });
}

// Funzione per renderizzare i prodotti backoffice
function renderProductsBO(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <input type="text" class="edit-field" value="${product.name}" data-id="${product._id}" data-field="name"/>
            <textarea class="edit-field" data-id="${product._id}" data-field="description">${product.description}</textarea>
            <input type="text" class="edit-field" value="${product.brand}" data-id="${product._id}" data-field="brand"/>
            <input type="text" class="edit-field" value="${product.imageUrl}" data-id="${product._id}" data-field="imageUrl"/>
            <input type="number" class="edit-field" value="${product.price}" data-id="${product._id}" data-field="price"/>
            <button onclick="saveProductChanges('${product._id}')">Salva Modifiche</button>
            <button onclick="deleteProduct('${product._id}')">Elimina</button>
        `;
        productList.appendChild(productCard);
    });
}

// Funzione per eliminare un prodotto
const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY' }
        });

        if (response.ok) {
            alert('Prodotto eliminato con successo!');
            fetchProducts(); // Ricarica la lista dei prodotti
        } else {
            throw new Error('Failed to delete the product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Errore nell\'eliminazione del prodotto: ' + error.message);
    }
};

// Funzione per salvare le modifiche di un prodotto
const saveProductChanges = async (productId) => {
    const productData = {};
    document.querySelectorAll(`.edit-field[data-id='${productId}']`).forEach(field => {
        productData[field.getAttribute('data-field')] = field.value;
    });

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Prodotto aggiornato con successo!');
            fetchProducts(); // Ricarica la lista dei prodotti per mostrare i cambiamenti
        } else {
            throw new Error('Failed to update the product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Errore nell\'aggiornamento del prodotto: ' + error.message);
    }
};
