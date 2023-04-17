// display les produits à partir de menu categories

// les const et les variables
const currentUrl = new URL(window.location.href);
const getCategory = currentUrl.searchParams.get('cat');
const getSubCategory = currentUrl.searchParams.get('subcat');
const data = JSON.parse(sessionStorage.getItem('datas'));
const products = data.products
const categories = data.category
const picture = document.querySelector('#produits-categorie')
const MyH2 = picture.previousElementSibling

// boucle et afficher le produit 
for (let categorie of categories) {
    if (categorie.name == getCategory) { //condition pour vérifier la categorie
        MyH2.innerHTML = `Categorie : ${categorie.name}`;

        for (let product of products) {
            if (product.subCategory == getSubCategory) { // condition pour vérifier sous categorie
                picture.innerHTML = `<a href="produit-simple.html?id=${product.id}">
                <img src="img/products/${product.category}/${product.subCategory}/${product.image}" alt="${product.name}">
                </a>`;
            }
        }
    }
}
