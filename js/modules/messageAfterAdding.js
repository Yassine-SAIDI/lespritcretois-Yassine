// popup qui permettre au client si il veut continuer l'achats ou la finaliser

export const bodyTag = document.querySelector('body');
export function openmessage(l, h) {
    bodyTag.insertAdjacentHTML('afterBegin', `<div id="message">
    <p>Votre produit a été ajouté, voulez vous ?</p>
    <div>
    <a href="produits.html" class="choise">Continuer Votre Shopping</a>
    <a href="panier.html" class="choise">Finalisez votre Achats</a>
    </div>
    </div>
    `);

    const message = document.getElementById('message');
    const myDiv = message.querySelector("div")
    const myPara = message.querySelector('p')

    // style pour la popup
    message.style.background = "#12247a";
    message.style.color = "#fff";
    message.style.width = 'vw';
    message.style.height = 'vw';
    message.style.position = "absolute";
    message.style.left = "50%";
    message.style.top = "50%";
    message.style.padding = "50px";
    message.style.transform = "translate(-50%, -50%)"
    message.style.boxShadow = "10px 10px 20px #aaa";
    message.style.display = "flex";
    message.style.flexFlow = "column";
    message.style.justifyContent = "center";
    message.style.zIndex = "1";
    message.style.fontSize = "25px"
    message.style.borderRadius = "20px"
    message.style.opacity = ".9"

    // style du parag et les liens
    myPara.style.textAlign = "center";
    myPara.style.marginBottom = "50px"
    myDiv.style.display = "flex"
    myDiv.style.justifyContent = "space-around"
    myDiv.style.height = "auto"
    myDiv.style.textAlign = "center"
    myDiv.style.alignItems = "center"
    myDiv.style.background = '#fff'
    myDiv.style.borderRadius = "20px"
    myDiv.style.gap = "20px"
    myDiv.style.padding = "10px"

    // bouton close message
    message.insertAdjacentHTML('afterBegin', '<div id="close">X</div>');
    const btClose = document.getElementById('close');
    btClose.addEventListener('click', closemessage);
    btClose.style.cursor = "pointer";
    btClose.style.padding = "10px";
    btClose.style.fontWeight = "bold";
    btClose.style.display = "block";
    btClose.style.position = "absolute";
    btClose.style.top = "0";
    btClose.style.right = "10px"
}

// fct pour fermer la popup
export function closemessage() {
    const message = document.getElementById('message');
    if (message) {
        message.remove();
    }
}