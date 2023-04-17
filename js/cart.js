/////////// the cart /////////////

//importation des modules 
import { sendingForm } from "./modules/form.js";  // gérer l'envoie de formulaire commande
import { displayPriceCart } from "./modules/displayPriceCart.js"; // afficher le panier dans la page et le mettre à jour

// récupérer les données du panier depuis le local storage
const cartData = JSON.parse(localStorage.getItem("cart"));
const cartContainer = document.querySelector('#panier tbody');
let totalPrice = 0;

// fonction pour afficher les produits du panier
const displayCart = (cartData) => {
    cartContainer.innerHTML = ""; // Effacer le contenu du panier avant de l'afficher à nouveau
    for (let item in cartData) {
        // Destructuration
        const { id, category, subCategory, name, description, image, price } = cartData[item].item
        const { totalPrice: finalPrice, quantity } = cartData[item]
        const htmlElem = `
        <tr>
            <td><img src="img/products/${category}/${subCategory}/${image}" alt="${name}"></td>
            <td>${name}</td>
            <td>${price} €</td>
            <td><input type="number" id="${id}" min="1" max="50" value="${quantity}"></td>
            <td>${finalPrice.toFixed(2)} €</td>
            <td><a href="#" class="btDeleteItem" data-id="${id}">X</a></td>
        </tr> 
        `;


        cartContainer.insertAdjacentHTML('afterbegin', htmlElem);

        // Mettre à jour le sous-total de l'article en fonction de la quantité
        const quantityInput = document.getElementById(id);
        quantityInput.addEventListener('input', () => {
            const itemSousTotal = quantityInput.parentNode.nextElementSibling;
            const quantity = quantityInput.value;
            const total = quantity * price;
            itemSousTotal.textContent = `${total.toFixed(2)} €`;

            // Mettre à jour le totalPrice
            cartData[item].totalPrice = total;
            localStorage.setItem("cart", JSON.stringify(cartData));
            calculateTotalPrice(); // Appeler la fonction pour calculer le totalPrice
            displayPriceCart() //mettre le panier à jour
        });

        // Supprimer un article du panier
        const btDeleteItem = document.querySelector(`[data-id="${id}"]`);
        btDeleteItem.addEventListener('click', (event) => {
            event.preventDefault();
            delete cartData[item];
            localStorage.setItem("cart", JSON.stringify(cartData));
            displayCart(cartData);
            displayPriceCart()//mettre le panier à jour
        });
    } // fin de la boucle for

    // Appeler la fonction pour calculer le totalPrice
    calculateTotalPrice();
}

// Fonction pour calculer et afficher le total des articles et les prix
const calculateTotalPrice = () => {
    totalPrice = 0; // Réinitialiser le totalPrice à 0

    // Parcourir les articles du panier et additionner les prix totaux
    for (let item in cartData) {
        const { totalPrice: finalPrice, quantity } = cartData[item];
        totalPrice += finalPrice;

        // Mettre à jour la quantity dans le panier en fonction de la quantité dans le formulaire
        const quantityInput = document.getElementById(cartData[item].item.id);
        // cartData[item].quantity = parseInt(quantityInput.value);
        cartData[item].quantity = Number(quantityInput.value);
    }

    // Mettre à jour les données du panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(cartData));

    // Afficher le prix total dans le DOM
    const commandPrice = document.querySelector('#totalPrice');
    commandPrice.innerHTML = `<strong>Total :</strong> ${totalPrice.toFixed(2)} €`;
}

// Appeler la fonction pour afficher les elemnets dans le panier
displayCart(cartData);



// affichage de la form commande en fonction de panier 
const displayForm = () => {
    const orderForm = document.querySelector('#form-commande')
    const orderFormTitle = document.querySelector('#commande h3')
    if (!cartData) {
        orderForm.style.display = 'none'
        orderFormTitle.style.display = 'none'
        document.querySelector('#commande').insertAdjacentHTML('afterbegin', `
            <h3>votre panier est vide</h3>
        `)
    } else {
        orderForm.style.display = 'block'

    }
}
displayForm()




