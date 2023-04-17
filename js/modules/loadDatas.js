// Load datas products from json
const urlJson = "http://127.0.0.1:550/json/products.json";

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