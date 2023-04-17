const formConfirmation = () => {
    const confirmation = document.querySelector('#confirmation-commande')
    const randomNmb = Math.floor(Math.random() * 1000) + 1;

    confirmation.insertAdjacentHTML('afterbegin', `
    <div class="confirm-commande">
        <p>Votre commande N° ${randomNmb} à bien été prise en compte</p>
    </div>
    `)



    // Récupérer et Afficher les données de la commande dans la console
    const commandeData = JSON.parse(sessionStorage.getItem("commande"));
    const products = commandeData.cart

    console.log(`commande N° : ${randomNmb}`);
    console.log("");
    console.log("Cart: ");
    for (let product in products) {
        console.log(product);
    };

    console.log("");

    console.log("Shipping: ");
    console.log(`First Name: ${commandeData.shipping.firstName}`);
    console.log(`Last Name: ${commandeData.shipping.lastName}`);
    console.log(`Address: ${commandeData.shipping.adress}`);
    console.log(`City: ${commandeData.shipping.city}`);
    console.log(`Tel: ${commandeData.shipping.tel}`);
    console.log(`Email: ${commandeData.shipping.email}`);

}
formConfirmation()



