/** @format */

import "./card.css";
import { LiaStarSolid } from "react-icons/lia";
import { useAppContext } from "../../context/Context";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SingleProduct from "../../pages/single-product/SingleProduct";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
	const navigate = useNavigate();
	const {
		state: { cart },
		dispatch,
	} = useAppContext();
	let ratingCount = Math.round(product.rating.rate);
	let allStars = new Array(5).fill(0);

	const returnStar = () => {
		if (ratingCount > 0) {
			ratingCount--;
			return <LiaStarSolid className="star1" key={Math.random()} />;
		} else {
			ratingCount--;
			return <LiaStarSolid className="star" key={Math.random()} />;
		}
	};

	const addProductToCart = () => {
		dispatch({ type: "ADD_TO_CART", payload: product });
		toast.success("Product added to cart");
	};

	const removeProductFromCart = () => {
		dispatch({ type: "REMOVE_FROM_CART", payload: product });
		toast.error("Product removed from cart");
	};

	const goToSingleProduct = () => {
		navigate(`/product/${product.id}`);
	}
	return (
		<div className="product-card" >
			<div className="img-container" onClick={goToSingleProduct}>
				<img src={product.image} alt="" />
			</div>
			<div className="details-container">
				<div className="details" onClick={goToSingleProduct}>
					<p className="p-title">{product.title}</p>
					<div className="ratings">{allStars.map((star) => returnStar())}</div>
					<div className="price">
						<p>${product.price}</p>
					</div>
				</div>
				<div className="cart-btn">
					{cart.some((p) => p.id === product.id) ? (
						<button onClick={removeProductFromCart} className="remove-btn">
							REMOVE FROM CART
						</button>
					) : (
						<button onClick={addProductToCart}>ADD TO CART</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
