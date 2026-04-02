import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext";

export default function Home() {

    const { addToCart } = useContext(CartContext);
    const [product, setproduct] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const response = await fetch("https://dummyjson.com/carts");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                setproduct(data.carts); // ✅ FIX
            }
            catch (err) {
                seterror(err.message);
            }
            finally {
                setloading(false);
            }
        }

        fetchproduct();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <p>Loading products...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-danger mt-5">
                <h4>Error: {error}</h4>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <div className="row">

                {product.map((cart) => {
                    const item = cart.products[0]; // first product

                    return (
                        <div className="col-md-3 mb-4" key={cart.id}>
                            <div className="card h-100">

                                <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                                    <img
                                        src={item.thumbnail}
                                        className="card-img-top p-3"
                                        height="200"
                                        style={{ objectFit: "contain" }}
                                        alt={item.title}
                                    />
                                </Link>

                                <div className="card-body">

                                    <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                                        <h6>{item.title.substring(0, 40)}...</h6>
                                    </Link>

                                    <p className="fw-bold">${item.price}</p>

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => addToCart(item)}
                                    >
                                        Add to Cart
                                    </button>

                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}