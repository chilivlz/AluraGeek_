import { serviceProducts } from "../produ_serv.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img class="producto" src="${image}" alt="${name}">
    <p class="nombre_producto">${name}</p>
    <p class="precio">$${price}</p>
    <button class="delete-button" data-eliminar  data-id="${id}">
     <img src="img/Vector.svg" alt="eliminar">
    </button>
  `;


 const deleteButton = card.querySelector("[data-id]");
 deleteButton.addEventListener("click", async (event)=>{
    const productId = deleteButton.getAttribute("data-id");
    console.log("deleting product with ID:", productId)
    await serviceProducts.deleteProduct(productId);
    card.remove();
 })
  productContainer.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProducts = await serviceProducts.productlist();

    listProducts.forEach((product) => {
      productContainer.appendChild(
        createCard(product.name, product.price, product.image, product.id)
      );
    });
  } catch (e) {
    console.log(e);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  serviceProducts
    .createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

render();
