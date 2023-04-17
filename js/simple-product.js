//////// Display simple product ////////

// importation des modules
import { displayPriceCart } from "./modules/displayPriceCart.js"; // afficher le panier dans la page et le mettre à jour
import { openmessage } from "./modules/messageAfterAdding.js"; // fct qui affiger le message de rester ou finaliser la commande

// les const et les variables
const currentUrl = new URL(window.location.href);
const getUrlId = currentUrl.searchParams.get('id');
const data = JSON.parse(sessionStorage.getItem('datas'));
const container = document.querySelector('#produit-simple')
let item;

// fct qui gérer l'affichage du produit et le calcule
const displayItem = (data) => {

    // loop to defined the item
    for (let product of data.products) {
        if (product.id == getUrlId) {
            item = product;
        }
    }
    // destructuration
    const { id, category, subCategory, name, description, image, price } = item;

    container.insertAdjacentHTML('beforeend', `
                <article>
                    <h3>${name}</h3>
                    <div>
                        <figure><img src="img/products/${category}/${subCategory}/${image}" alt="${name}"></figure>
                        <div>
                            ${description}
                            <footer>
                                <form id="panier">
                                <input type="number" min="1" step="1" value="1" id="price">
                                <span id="calcul-price">${price.toFixed(2)} €</span>
                                <button type="submit" class="bt-panier"id="bt-panier" href="panier.html?id=1">Ajouter au panier</button>
                                </form>
                            </footer>
                        </div>
                    </div>
                </article>
                `);


    // calcul the price and add the evet listener 
    const quantityInput = document.querySelector('#price');
    const calculPrice = document.querySelector('#calcul-price');
    quantityInput.addEventListener('input', () => {
        const quantity = quantityInput.value;
        const total = quantity * price;
        calculPrice.textContent = `${total.toFixed(2)} €`;
    });


    // add the product to the cart
    const cartForm = document.querySelector('#panier')
    cartForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération du contenu actuel du panier
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            cart = {};
        }

        // Ajout du produit au panier avec le prix et la quantité
        const quantity = quantityInput.value;
        const totalPrice = quantity * price;
        const cartItemId = `product ${id}`;

        if (cart.hasOwnProperty(cartItemId)) {
            // Si le produit est déjà dans le panier, incrémenter la quantité et le prix total
            cart[cartItemId].quantity = Number(cart[cartItemId].quantity) + Number(quantity);
            cart[cartItemId].totalPrice += totalPrice;
        } else {
            // Si le produit n'est pas encore dans le panier, l'ajouter avec la quantité et le prix total
            cart[cartItemId] = { item, quantity, totalPrice };
        }

        // Stockage des données du panier mises à jour
        localStorage.setItem("cart", JSON.stringify(cart));

        displayPriceCart() //mettre le panier à jour

        openmessage(2, 2) // fct qui affiger le message de rester ou finaliser la commande
    });

}

displayItem(data)




