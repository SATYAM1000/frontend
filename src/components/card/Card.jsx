/** @format */

import "./card.css";
import { LiaStarSolid } from "react-icons/lia";
import { useAppContext } from "../../context/Context";

const Card = ({ product }) => {
	const {
		state: { cart },
		dispatch,
	} = useAppContext();
	let ratingCount = Math.round(product.rating.rate);
	let allStars = new Array(5).fill(0);

	const returnStar = () => {
		if (ratingCount > 0) {
			ratingCount--;
			return <LiaStarSolid className="star1" key
			= {Math.random()} />;
		} else {
			ratingCount--;
			return <LiaStarSolid className="star" key={Math.random()} />;
		}
	};
	return (
		<div className="product-card">
			<div className="img-container">
				<img src={product.image} alt="" />
			</div>
			<div className="details-container">
				<div className="details">
					<p className="p-title">{product.title}</p>
					<div className="ratings">{allStars.map((star) => returnStar())}</div>
					<div className="price">
						<p>${product.price}</p>
					</div>
				</div>
				<div className="cart-btn">
					{cart.some((p) => p.id === product.id) ? (
						<button
							onClick={() =>
								dispatch({ type: "REMOVE_FROM_CART", payload: product })
							}
							className="remove-btn">
							REMOVE FROM CART
						</button>
					) : (
						<button
							onClick={() =>
								dispatch({ type: "ADD_TO_CART", payload: product })
							}>
							ADD TO CART
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
