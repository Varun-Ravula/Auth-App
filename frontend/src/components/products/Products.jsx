import './Products.css';
import { useEffect, useState, useContext } from 'react';

function Products() {
    // products state
    const [products, setProducts] = useState([]);
    // error  state
    const [error, setError] = useState("");

    // quantity state
    const [quantity, setQuantity] = useState(0);

    // function for incrementing quantity
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    // function for decrementing quantity
    const decrementQuantity = () => {
        setQuantity(quantity - 1);
    }

    // using use effect to load the products intially when the component is loaded
const products_url=import.meta.env.VITE_PRODUCTS_URL;
    useEffect(() => {
        fetch(products_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        }).then(async (response) => {
            const productsData = await response.json();
            if (!response.ok) {
                throw new Error(productsData.errorMessage || "Something went wrong");
            }
            setProducts(productsData.payload);
        })
            .catch(errorMessage => {
                setError(errorMessage);
            })
    }
        , [])

    // console.log(products);

    return (
        <div className="productsContent mt-5 mb-5">
            <div className="row">
                {error.length !== 0 ? <p className="text-center text-danger display-6 mt-3">{error.message}</p> : <div className=" m-auto col-12 col-sm-11 col-md-9 col-lg-8">
                    <h4 className='text-center text-muted mb-4'>Verification completed, Now private routes are accessible.</h4>
                    {products.map((product) => <li key={product._id} className='productsList mb-3'><span><img src={product.image_url} alt={product.product_name} width="75px" height="75px" className="product-image me-5" /></span><span><b>{product.product_name}</b></span><span className="ms-4">Price:<b>₹{product.price}</b></span> <span className='ms-3 product-colour'>Colour:<b>{product.color}</b></span><span className='ms-3 product-size'>Size:<b>{product.size}</b></span><span className='ms-4'>Quantity:<button onClick={incrementQuantity} className='btn shadow btn-secondary p-1 me-2'>+</button><b>{quantity}</b><button className='btn shadow btn-secondary p-1 ms-2' onClick={decrementQuantity}>-</button></span><span><button className='btn btn-warning ms-3 me-3'>More details</button></span></li>
                    )}
                </div>
                }
            </div>
        </div>
    )
}

export default Products;