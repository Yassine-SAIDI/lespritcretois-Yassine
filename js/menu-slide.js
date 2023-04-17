// //////////////////////////////////////////////////////
// // Creation du menu slide present sur toutes les pages
// //////////////////////////////////////////////////////


// les const et les variables
const data = JSON.parse(sessionStorage.getItem('datas'));
const menuCategory = document.querySelector('#menu-categories')
let category = data.category
let products = data.products

menuCategory.innerHTML = `<nav><ul></ul></nav>` // l'inseration de la nav 

const menuOn = () => {
    document.querySelector('#menu-categories').style.left = "0"
}
const menuOff = () => {
    document.querySelector('#menu-categories').style.left = "-100vw"
}

// fct qui gérer le menu
export function loadMenuSlide(category, products) {
    // add event to open menu
    const btOpenMenu = document.querySelector('#bt-categories');
    btOpenMenu.addEventListener('click', function (e) {
        const thisBtOpenMenu = this;
        if (menuCategory.style.left === "-100vw") {
            menuOn();
        } else {
            menuOff();
        }
    });

    // boucle sur les categories et les sous categories
    // category
    for (const item of category) {
        const subCategory = item.subCategory;
        const categoryName = item.name;
        const categorySlug = item.slug;
        const categoryHtml = `
        <li><a href="${categoryName}/" class="bt-menu-slide category">${categoryName}</a>
        <ul class="${categorySlug}">
        </ul>
        </li>`

        menuCategory.querySelector('ul').insertAdjacentHTML("beforeend", categoryHtml)

        // subCategory
        for (const subItem of subCategory) {
            const subCategoryName = subItem.name;
            const subCategorySlug = subItem.slug;
            const subCategoryHtml = `
            <li><a class="bt-menu-slide"
            href="produits-categorie.html?cat=${categoryName}&amp;subcat=${subCategorySlug}">${subCategoryName}</a></li>
                `

            menuCategory.querySelector(`.${categorySlug}`).insertAdjacentHTML("beforeend", subCategoryHtml)
        }

    }


    // display a random Product
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const product = `<div>
        <p>Nouveauté</p>
        <a href="produit-simple.html?id=${randomProduct.id}"><img src="img/products/${randomProduct.category}/${randomProduct.subCategory}/${randomProduct.image}"></a>
        <span>${randomProduct.name}</span>
        <span>${randomProduct.price.toFixed(2)} €</span>
    </div>`
    menuCategory.innerHTML += product



    // Ajouter un écouteur d'événement sur les liens de catégories
    const categoryLinks = document.querySelectorAll('.category'); // selectionner que les categories
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Empêcher le comportement par défaut du lien
            const subCategoryUl = this.nextElementSibling; // Sélectionner la sous-catégorie suivante
            if (subCategoryUl.style.display === 'block') {
                subCategoryUl.style.display = 'none'; // Cacher la sous-catégorie si elle est déjà affichée
            } else {
                subCategoryUl.style.display = 'block'; // Afficher la sous-catégorie si elle est cachée
            }
        });
    });

}
loadMenuSlide(category, products);






