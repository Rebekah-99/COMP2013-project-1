import ProductCard from "./ProductCard";

export default function ProductsContainer({
    products,
    productQuantity,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleAddToCart,
    //Added for project 2
    handleOnDelete,
    handleOnEdit,
}){

    return (
        <div className="ProductsContainer">
            {products.map((product) => {
                const currentQuantity = productQuantity.find(prodQuantity => prodQuantity.id === product.id);
                const quantity = currentQuantity ? currentQuantity.count : 0;

                return (
                    <ProductCard
                    key={product._id}
                    _id={product._id}
                    id={product.id}
                    productQuantity={quantity}
                    image={product.image}
                    brand={product.brand}
                    productName={product.productName}
                    price={product.price}
                    handleAddToQuantity={handleAddToQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                    handleAddToCart={handleAddToCart}
                    //Added for project 2
                    handleOnDelete={handleOnDelete}
                    handleOnEdit={handleOnEdit}
                    />
                );
            })}
        </div>
    );

}