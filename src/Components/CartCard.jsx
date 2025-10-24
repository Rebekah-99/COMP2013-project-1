import QuantityCounter from "./QuantityCounter";

export default function CartCard({
    id,
    productName,
    image,
    count,
    price,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleRemoveFromCart,
    calculateCurrentItemTotal,
}) {
    //Output for each cartCard
    return (
        <div className="CartCardInfo">
            {/*Left side of CartCardInfo*/}
            <div className="CartCardDetails">
                <img src={image} alt={productName} height="100px" />
                <h2>{productName}</h2>
                <QuantityCounter 
                productQuantity={count}
                handleAddToQuantity={handleAddToQuantity}
                handleRemoveQuantity={handleRemoveQuantity}
                id={id}
                mode={"cart"}
                />
                <p>{price}</p>
            </div>
            {/*Right side of CartCardInfo*/}
            <div className="CartCardActions">
            <button className="RemoveButton" onClick={() => handleRemoveFromCart(id)}>
                Remove
            </button>
            <p>Total: ${calculateCurrentItemTotal({count, price})}</p>
            </div>
            
        </div>
    );
}