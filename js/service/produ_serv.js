const productlist = () => {
    return fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  
const createProducts = async (name, price, image) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          image,
        }),
      });
      return await res.json();
    } catch (err) {
      return console.log(err);
    }
};

const deleteProduct = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error('Failed to delete product');
        }
        return res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const serviceProducts = {
    productlist,
    createProducts,
    deleteProduct,
};
