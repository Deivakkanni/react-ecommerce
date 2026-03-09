import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
        useContext(CartContext); 
        
        const totalPrice = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ); 
        
        return (
            <div className="container mt-4">
                <h2 className="mb-4">Shopping Cart</h2>

                {cart.length === 0 ? (
                    <h4>Your cart is empty</h4>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="row g-0 align-items-center">

                                <div className="col-md-2 text-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        height="80"
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <h6>{item.title}</h6>
                                </div>

                                <div className="col-md-2">
                                    <strong>${item.price}</strong>
                                </div>
                                <div className="col-md-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="col-md-2">
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        -
                                    </button>

                                    <span className="mx-2">{item.quantity}</span>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>

                        </div>
                    ))
                )}
                <div className="container mt-4">
                    <h4>Total: ${totalPrice.toFixed(2)}</h4>
                </div>
            </div>
        );
}

export default Cart;