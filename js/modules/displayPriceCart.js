//  afficher le panier partout
const displayPriceCart = () => {
    const panier = JSON.parse(localStorage.getItem("cart")) || {};
    let totalQuantity = 0;
    let finalPrice = 0;

    for (let item in panier) {
        if (panier[item] && panier[item].totalPrice && panier[item].quantity) {
            const { totalPrice, quantity } = panier[item];
            totalQuantity += quantity * 1;
            finalPrice += totalPrice;
        }
    }

    const DisplayCartArticle = document.querySelector(".nbre-produits");
    if (totalQuantity > 0) {
        DisplayCartArticle.innerHTML = `${totalQuantity} Article(s) ${finalPrice.toFixed(2)} €`;
    } else {
        DisplayCartArticle.innerHTML = `Aucun article dans le panier`;
    }
}

export { displayPriceCart }