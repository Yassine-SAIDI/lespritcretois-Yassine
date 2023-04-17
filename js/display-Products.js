// load datas
const dataJson = JSON.parse(sessionStorage.getItem('datas'));

// Display Products
const displayProducts = (dataJson) => {
    const products = dataJson.products;
    let itemsContainer = document.querySelector('#produits ul')

    // built items container if it dosn't exist
    // if(!itemsContainer) {
    const container = document.querySelector('#produits nav')
    itemsContainer = document.createElement('ul');
    container.prepend(itemsContainer);
    // }

    // loop display products
    for (let product of products) {
        itemsContainer.insertAdjacentHTML('beforeend', `
        <li>
        <a href="produit-simple.html?id=${product.id}">
        <img src="img/products/${product.category}/${product.subCategory}/${product.image}">
        </a>
        <a href="produit-simple.html?id=${product.id}">
        <h3>${product.name}</h3>
        <span>${product.price} €</span>
        </a>
        </li>
        `);
    }
}

displayProducts(dataJson);



const displayMode = () => {
    const btList = document.querySelector('#bt-display-products i:first-child')
    const btVignette = document.querySelector('#bt-display-products i:last-child')
    const myNav = document.querySelector('#produits nav')

    btList.addEventListener('click', () => {
        myNav.classList.add('display-products-list')
    })

    btVignette.addEventListener('click', () => {
        myNav.classList.remove('display-products-list')
    })
}
displayMode()
