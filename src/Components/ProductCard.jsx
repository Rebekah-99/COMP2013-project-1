import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
    productQuantity, 
    image, 
    brand,
    productName,
    price,
    id,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleAddToCart,
}) {
    //Output for each ProductCard
    return (
    <div className="ProductCard">
        <h2>{productName}</h2>
        <img src={image} alt={productName} height="100px" />
        <h3>{brand}</h3>
        <QuantityCounter 
        productQuantity={productQuantity}
        handleAddToQuantity={handleAddToQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode={"product"}
        />
        <p>{price}</p>
        <button onClick={() => {
            handleAddToCart({id, count: productQuantity, price});
        }}>
        Add to Cart
        </button>
    </div>
    );
};