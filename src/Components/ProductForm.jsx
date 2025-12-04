//A form to enter a new product to our database and server
export default function ProductForm({
    id,
    productName,
    brand,
    image,
    price,
    handleOnSubmit,
    handleOnChange,
    isEditing,
}) {
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="id">ID: </label>
                <input
                type="text"
                name="id"
                id="id"
                value={id}
                onChange={handleOnChange}
                placeholder="Enter product id"
                required
                />
                <br />
                <label htmlFor="productName">Product Name: </label>
                <input
                type="text"
                name="productName"
                id="productName"
                value={productName}
                onChange={handleOnChange}
                placeholder="Enter product"
                required
                />
                <br />
                <label htmlFor="brand">Brand: </label>
                <input 
                type="brand"
                name="brand"
                id="brand"
                value={brand}
                onChange={handleOnChange}
                placeholder="Enter brand name"
                required
                />
                <br />
                <label htmlFor="image">Image: </label>
                <input 
                type="text"
                name="image"
                id="image"
                value={image}
                onChange={handleOnChange}
                placeholder="Enter image URL"
                />
                <br />
                <label htmlFor="price">Price: </label>
                <input 
                type="price"
                name="price"
                id="price"
                value={price}
                onChange={handleOnChange}
                placeholder="Enter price"
                required
                />
                <br />
                <button>{isEditing ? "Editing" : "Submit"}</button>
            </form>
        </div>
    );
}