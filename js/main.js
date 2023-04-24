import { loadDatasOfProducts } from "./modules/loadDatas.js";
import { loadMenuSlide } from "./menu-slide.js";
import { displayPriceCart } from "./modules/displayPriceCart.js";

// Load datas products from JSON

// loadDatasOfProducts("http://127.0.0.1:5501/json/products.json")   ////// addr local
loadDatasOfProducts("https://yassine-saidi.github.io/lespritcretois-Yassine/json/products.json")
  .then(datas => {
    // DOM elements
    const btBackToTop = document.getElementById("back-to-top");
    const mainMenu = document.getElementById("primary-nav");

    // Hide loader
    document.querySelector("#loader").classList.add("animLoader");

    // Show price cart in all pages
    displayPriceCart();

    // FIXED BACK-TO-TOP BUTTON AND PRIMARY MENU ON SCROLL
    const header = document.querySelector("header");
    let headerHeight = header.clientHeight;
    window.addEventListener("scroll", checkScroll);
    function checkScroll() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > headerHeight) {
        mainMenu.classList.add("fixed");
      } else {
        mainMenu.classList.remove("fixed");
      }
      btBackToTop.classList.toggle("animfadeIn", scrollTop > 100);
    }
    btBackToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // UNIQUE POPUP DISPLAY DURING SESSION
    const delay = 3;
    const dataPub = `Il faut que cette popup s'ouvre au bout de ${delay}s, 
    et qu'elle ne s'ouvre qu'une seule fois pdt la navigation`;
    const openPub = setTimeout(() => {
      openPopup(dataPub, 700, 400);
    }, delay * 1000);
    checkSessionStorage(openPub);
    function checkSessionStorage(openPub) {
      if (sessionStorage.getItem("openPub")) {
        clearTimeout(openPub);
      } else {
        sessionStorage.setItem("openPub", "on");
      }
    }

    // RESPONSIVE MENU
    const primaryNav = document.getElementById("primary-nav");
    const btMobile = document.getElementById("mobile-nav");
    btMobile.addEventListener("click", () => {
      primaryNav.classList.toggle("animfadeIn");
      primaryNav.classList.toggle("display");
    });

    // RANDOM IMAGE FOR THE HEADER
    const slider = document.getElementById("slider");
    if (slider) {
      const tabImgHeader = ["header-01.jpg", "header-02.jpg", "header-03.jpg"];
      const imgRandomUrl = "img/header/" + tabImgHeader[Math.floor(Math.random() * tabImgHeader.length)];
      slider.style.backgroundImage = `url(${imgRandomUrl})`;
    }
  })
  .catch(error => {
    console.log(error);
  });
