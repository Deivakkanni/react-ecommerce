import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Home() {
    const { addToCart } = useContext(CartContext);
    const [product, setproduct] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(null)

    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json();
                setproduct(data);
            }
            catch (err) {
                seterror(err.message);
            }
            finally {
                setloading(false);
            }
        }
        fetchproduct()
    }, [])

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading products...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center mt-5 text-danger">
                <h4>Error: {error}</h4>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {product.map(product => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card h-100">
                            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                                <img
                                    src={product.image}
                                    className="card-img-top p-3"
                                    height="200"
                                    style={{ objectFit: "contain" }}
                                    alt={product.title} />
                            </Link>
                            <div className="card-body">

                                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                                    <h6>{product.title.substring(0, 40)}...</h6>
                                </Link>                                <p className="fw-bold">${product.price}</p>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}