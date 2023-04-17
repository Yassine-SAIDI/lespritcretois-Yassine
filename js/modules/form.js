
///////// form //////////
const cartData = JSON.parse(localStorage.getItem("cart"));
const form = document.querySelector('#form-commande')
const url = "http://127.0.0.1:5500/json/products.json/posts"
const commande = new Map()

// fct pour gérer l'envoye de la formulaire commande
const sendingForm = (cartData) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const shipping = {};
        for (let objetForm of form) {
            const type = objetForm.type;
            const name = objetForm.name;
            const value = objetForm.value;

            if (type === "submit") {  //skip submit button
                continue;
            }
            shipping[name] = value;
        }

        commande.set("cart", cartData);
        commande.set("shipping", shipping);

        // post the data commande
        postData(url, commande)

        // stocker les data de la commande afin de les afficher dans la page de confirmation
        sessionStorage.setItem("commande", JSON.stringify(Object.fromEntries(commande)))

        // confirmation page and remove the cart from localStorage
        window.location.replace("confirmation-commande.html");
        localStorage.removeItem("cart");
    })
}
sendingForm(cartData)



// fct pour envoyer les data de la commande vers le serveur
const postData = (url, commande) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(commande),
        headers: { 'content-type': 'application/json; charset=UTF-8' }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.log(error))
}

export { sendingForm }