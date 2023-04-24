// const urlJson = "http://127.0.0.1:5501/json/products.json";   /////// addr local
const urlJson = "https://yassine-saidi.github.io/lespritcretois-Yassine/json/products.json";

const getDatasOfProducts = async () => {
  try {
    const response = await fetch(urlJson);
    const dataJson = await response.json();
    sessionStorage.setItem("datas", JSON.stringify(dataJson));
    return dataJson;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loadDatasOfProducts = async () => {
  let datas = sessionStorage.getItem("datas");
  if (datas === null) {
    datas = await getDatasOfProducts();
  } else {
    datas = JSON.parse(datas);
  }
  return datas;
};

export { loadDatasOfProducts };
