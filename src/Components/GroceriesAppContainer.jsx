//Everything starts from here
import { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import CartContainer from "./CartContainer";

//Setting up usestate for functions below, grabbing information needed
export default function GroceriesAppContainer({products}) {
    const [productQuantity, setProductQuantity] = useState(
        products.map((prod) => {
            return {
                id: prod.id,
                count: 0,
                price: prod.price,
            }
        })
);

//New state for cart which will start empty
const [cart, setCart] = useState([]);

//A function to add to quantity -- had to add id, mode props for quantity counter/
//change things accordingly for both add and remove functions
const handleAddToQuantity = (id, mode) => {
    if(mode === "product") {
        setProductQuantity(prev => 
            prev.map(prod => prod.id === id ? { ...prod, count: prod.count + 1} : prod)
        );
    } else if(mode==="cart") {
        setCart(prev => 
            prev.map(item => item.id === id ? { ...item, count: item.count + 1} : item)
        );
    } 
};

//A function to remove from quantity
const handleRemoveQuantity = (id, mode) => {
    if(mode === "product") {
        setProductQuantity(prev => 
            prev.map(prod => 
                prod.id === id && prod.count > 0 ? { ...prod, count: prod.count - 1} : prod)
        );
    } else if(mode === "cart") {
        setCart(prev => 
            prev.map(item =>
                item.id === id && item.count > 1 ? { ...item, count: item.count - 1} : item)
        );
    } 
};

//A function to add items to cart
const handleAddToCart = (productToAdd) => {
    const currentProduct = products.find((prod) => prod.id === productToAdd.id);
    //to check if it is in the cart already
    const productInCart = cart.find((item) => item.id === productToAdd.id);
    if(productToAdd.count === 0) {
      alert("No items currently selected");
      return;
    };

    if(!productInCart) {
      setCart((prevCart) => {
        return [
          ...prevCart, 
          { 
          ...currentProduct,
          id: currentProduct.id,
          productName: currentProduct.productName,
          image: currentProduct.image, 
          count: productToAdd.count, 
          currentPrice: productToAdd.price
        }
      ];
      });
    }
    //Additional logic to allow user to add more to cart of the same product they've already added to their cart
    else{
      if(productInCart) {
        setCart(prevCart =>
            prevCart.map(item => 
                item.id === productToAdd.id 
                ? { ...item, count: item.count + productToAdd.count}
                : item
            )
        )
      }
    }
  };

  //A function to remove items from cart
  const handleRemoveFromCart = (id) => {
    const filteredCart = cart.filter((item) => item.id !== id);
    setCart(filteredCart);
  };

  //A function to calculate cost per item in cart
  const calculateCurrentItemTotal = (item) => {
    const numberPrice = Number(item.price.replace("$", ""));
    return (item.count * numberPrice).toFixed(2);
  };

  //A function to empty the cart entirely at once
  const emptyCartFunction = () => {
    setCart([]);
  };
  
  //A function to add the price of all items in cart
  const calculateAllItemsInCart = () => {
    let total = 0;
    
    cart.forEach((item) => {
        const newNumberPrice = Number(item.currentPrice.replace("$", ""));
        const itemTotal = item.count * newNumberPrice;
        total += itemTotal;
    });
    return total.toFixed(2);
  }

return (
    <div>
        <div>
            <NavBar isCartEmpty={cart.length === 0} />
        </div>
        <div className="GroceriesApp-Container">
            <div className="ProductsContainer">
            <ProductsContainer 
            products={products} 
            productQuantity={productQuantity}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            />
        </div>
        <div className="CartContainer">
            <h1>Cart Items: </h1>
            <p>{cart.length === 0 && "Cart is empty!"}</p>
            <CartContainer 
            cart={cart}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            calculateCurrentItemTotal={calculateCurrentItemTotal}
            emptyCartFunction={emptyCartFunction}
            calculateAllItemsInCart={calculateAllItemsInCart}
            />
        </div>
        </div>
    </div>
);
    
}