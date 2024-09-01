// /js/app.js

// Funzione per ottenere tutti i prodotti
async function fetchProducts() {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY',
            }
        });
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Funzione per renderizzare i prodotti nella pagina principale
const renderProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Pulisce la lista prima di aggiungere nuovi elementi
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
};

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

// Inizializzazione delle funzioni al caricamento della pagina
//document.addEventListener('DOMContentLoaded', () => {
//    const page = window.location.pathname.split('/').pop();
//    if (page === 'index.html') {
//        fetchProducts();
//    } else if (page === 'product.html') {
//        const urlParams = new URLSearchParams(window.location.search);
//        const productId = urlParams.get('id');
//        fetchProductDetails(productId);
//    }
//});

// Funzione per aggiungere un prodotto
async function addProduct(product) {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'POST',
            headers: {
               // 'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY'
            },
            body: JSON.stringify(product)
        });
        const result = await response.json();
        console.log('Product added:', result);
        //if (!response.ok) {
        //    throw new Error('Errore durante l\'aggiunta del prodotto');
        //}
        alert('Prodotto aggiunto con successo');
        fetchProducts(); // Ricarica la lista dei prodotti
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Funzione per aggiornare un prodotto
const updateProduct = async (id, product) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY'
            },
            body: JSON.stringify(product)
        });
        const result = await response.json();
        console.log('Product updated:', result);
        if (!response.ok) {
            throw new Error('Errore durante la modifica del prodotto');
        }
        alert('Prodotto modificato con successo');
        fetchProducts(); // Ricarica la lista dei prodotti
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

// Funzione per eliminare un prodotto
const deleteProduct = async (id) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ0OTE5NTY5OGY0ODAwMTVlNDZkNDgiLCJpYXQiOjE3MjUyMDY5MzMsImV4cCI6MTcyNjQxNjUzM30.CoUhuwju4UNyrBnqBKpwAPP9ohFWPTVoNPENeYoWFXY'
            }
        });
        if (!response.ok) {
            throw new Error('Errore durante l\'eliminazione del prodotto');
        }
        alert('Prodotto eliminato con successo');
        fetchProducts(); // Ricarica la lista dei prodotti
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

// Inizializzazione delle funzioni al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop();
    if (page === 'index.html') {
        fetchProducts();
    } else if (page === 'product.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        fetchProductDetails(productId);
    } else if (page === 'backoffice.html') {
        // Inizializza la gestione dei prodotti
        fetchProducts();  // Carica i prodotti per la gestione
    }
});