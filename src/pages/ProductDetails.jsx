import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductDetails() {

    const { addToCart } = useContext(CartContext);
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`https://dummyjson.com/carts/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.products[0]); // ✅ important
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <>
            <button
                className="btn btn-secondary mb-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="container mt-5">
                <div className="row">

                    <div className="col-md-5 text-center">
                        <img
                            src={product.thumbnail}
                            height="300"
                            style={{ objectFit: "contain" }}
                            alt={product.title}
                        />
                    </div>

                    <div className="col-md-7">

                        <h3>{product.title}</h3>

                        <h4 className="text-success">
                            ${product.price}
                        </h4>

                        <p>Quantity : {product.quantity}</p>

                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}

export default ProductDetails;