import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
    productQuantity, 
    image, 
    brand,
    productName,
    price,
    _id,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleAddToCart,
    handleOnEdit,
    handleOnDelete,
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
        id={_id}
        mode={"product"}
        />
        <p>{price}</p>
        <button onClick={() => {
            handleAddToCart({_id, count: productQuantity, price});
        }}>
        Add to Cart
        </button>
        <br/>
        <button onClick={() => handleOnEdit(_id)}>
            Edit
        </button>
        <br/>
        <button onClick={() => handleOnDelete(_id)}>
            Delete
        </button>
    </div>
    );
};