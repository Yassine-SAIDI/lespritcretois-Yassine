// Load datas products from json
const urlJson = "https://yassine-saidi.github.io/lespritcretois-Yassine/json/products.json";

const loadDatasOfProducts = async (urlJson) => {
    fetch(urlJson)
        .then(response => response.json())
        .then(dataJson => {
            sessionStorage.setItem("datas", JSON.stringify(dataJson))
        })
        .catch(error => {
            console.log(error);
        });
};
loadDatasOfProducts(urlJson)

// load data if session don't exist
if (!sessionStorage.getItem('datas')) {
    loadDatasOfProducts(urlJson)
} else {
    JSON.parse(sessionStorage.getItem('datas'))
}


export { loadDatasOfProducts }
