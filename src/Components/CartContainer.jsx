import CartCard from "./CartCard";

export default function CartContainer({
    cart,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleRemoveFromCart,
    calculateCurrentItemTotal,
    emptyCartFunction,
    calculateAllItemsInCart,
}) {

    //Calculating totalCost for buy button below
    const totalCost = calculateAllItemsInCart();

    return (
        <div className="CartContainer">
            {cart.map((products) => (
                <CartCard 
                key={products.id}
                id={products.id}
                image={products.image}
                productName={products.productName}
                price={products.currentPrice}
                count={products.count}
                handleAddToQuantity={handleAddToQuantity}
                handleRemoveQuantity={handleRemoveQuantity}
                handleRemoveFromCart={handleRemoveFromCart}
                calculateCurrentItemTotal={calculateCurrentItemTotal}
                />
            ))}
            {/*Buttons for EmptyCart and Buy*/}
            <div className="CartListBtns">
                <button className="RemoveButton" onClick={emptyCartFunction}>Empty Cart</button>
                <button id="BuyButton" onClick={calculateAllItemsInCart}>Buy (${totalCost})</button>
            </div>
        </div>
    )
};