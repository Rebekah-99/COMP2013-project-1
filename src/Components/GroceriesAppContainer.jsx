//Everything starts from here
import { useState, useEffect } from "react";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import CartContainer from "./CartContainer";
import axios from "axios";
import ProductForm from "./ProductForm";

//**********STARTED ADDING FOR PROJECT 2 HERE */
//Setting up useState and useEffect for Project 2
export default function GroceriesAppContainer(){
  const [productsData, setProductsData] = useState([]);
  const [formData, setFormData] = useState ({
    id: "",
    productName: "",
    brand: "",
    image: "",
    price: ""
  });

const [postResponse, setPostResponse] = useState("");
const [isEditing, setIsEditing] = useState(false);

//useEffect
useEffect(() => {
  handleProductsDB();
}, [postResponse]);

//Handlers
//GET Data from DB handler
const handleProductsDB = async() => {
  try{
      const response = await axios.get("http://localhost:3000/products");
      setProductsData(response.data);
        } catch (error) {
            console.log(error.message);
        }
};
//

//Handle the reset form
    const handleResetForm = () => {
        setFormData({
          id: "",
          productName: "",
          brand: "",
          image: "",
          price: ""
        });
    };

    //Handle the submission of data
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                handleOnUpdate();
                handleResetForm();
                setIsEditing(false);
            } else {
                await axios
                .post("http://localhost:3000/products", formData)
                .then((response) => {
                    setPostResponse(response.data);
                    console.log(response);
                })
                .then(() => handleResetForm());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    //Handle the onChange event for the form
    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return {...prevData, [e.target.name]: e.target.value };
        })
    };

    //Handle to delete one product by id
    const handleOnDelete = async(_id) => {
        try{
            const response = await axios.delete(`http://localhost:3000/products/${_id}`);
            setPostResponse(response.data); 
            console.log(response);
        } catch(error) {
            console.log(error.message);
        }
    };

    //Handle the editing of one product by its id
    const handleOnEdit = async (_id) => {
        try {
            const response =  await axios.get(
                `http://localhost:3000/products/${_id}`
            );
            const product = response.data;
            setFormData({
                _id: product._id || "",
                id: product.id || "",
                productName: product.productName || "",
                brand: product.brand || "",
                image: product.image || "",
                price: product.price || "",
            });
            setIsEditing(true);
        } catch (error) {
            console.log(error);
        }
    };

    //Handle updating the API patch route
    const handleOnUpdate = async () => {
        try{
            const result = await axios.patch(
                `http://localhost:3000/products/${formData._id}`, 
                formData
            );
            setPostResponse({message: result.data.message, data: result.data.DATE});
        } catch(error) {
            console.log(error);
        }
    };


//
//////this below from project 1
const [productQuantity, setProductQuantity] = useState(
        productsData.map((prod) => {
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
    const currentProduct = productsData.find((prod) => prod.id === productToAdd.id);
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
        <div className="product-form">
          <ProductForm 
          id={formData.id}
          productName={formData.productName}
          brand={formData.brand}
          image={formData.image}
          price={formData.price}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          isEditing={isEditing}
          />
          <p style ={{color: "green"}}>{postResponse?.message}</p>
        </div>
        <div className="GroceriesApp-Container">
            <div className="ProductsContainer">
            <ProductsContainer 
            products={productsData} 
            productQuantity={productQuantity}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            //Added for project 2
            handleOnDelete={handleOnDelete}
            handleOnEdit={handleOnEdit}
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