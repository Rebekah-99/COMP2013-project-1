//This function allows us to add and remove from quantity - we'll use it in cartCard and ProductCard
export default function QuantityCounter({
    productQuantity,
    handleAddToQuantity,
    handleRemoveQuantity,
    id,
    mode,    
}) {
    return (
        <div className="ProductQuantityDiv">
            <div>
                <button onClick={() => handleRemoveQuantity(id, mode)}
                    disabled={mode ==="product" ? productQuantity <= 0 : productQuantity <= 1}
                >
                -
                </button>
            </div>
            <p>{productQuantity}</p>
            <div>
                <button onClick={() => handleAddToQuantity(id, mode)}>+</button>
            </div>
        </div>
    );
}
    