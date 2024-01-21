/** @format */

import "./singleproduct.css";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { LiaStarSolid } from "react-icons/lia";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../../components/card/Card";
import { useAppContext } from "../../context/Context";
import placeholder1 from "../../assets/placeholder.jpg";
import placeholder2 from "../../assets/placeholder2.png";
import placeholder3 from "../../assets/placeholder3.png";
import placeholder4 from "../../assets/placeholder4.png";
const SingleProduct = () => {
	const [singleProduct, setSingleProduct] = useState({});
	const [ratingCount, setRatingCount] = useState(0);
	const { loading, setLoading, allProducts } = useAppContext();
	const [imageURL, setImageURL] = useState(placeholder1);
	const [allURLs, setAllURLs] = useState({
		placeholder1: placeholder1,
		placeholder2: placeholder2,
		placeholder3: placeholder3,
		placeholder4: placeholder4,
	});
	const { id } = useParams();
	let allStars = new Array(5).fill(0);
	const {
		state: { cart },
		dispatch,
	} = useAppContext();
	useEffect(() => {
		const getSingleProductData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`https://fakestoreapi.com/products/${id}`
				);
				setLoading(false);
				setSingleProduct(response.data);
				setImageURL(response.data.image);
				setRatingCount(Math.round(response.data.rating.rate));
			} catch (error) {
				setLoading(false);
				console.log("Error while fetching data from server", error);
				toast.error("Something went wrong");
			}
		};
		getSingleProductData();
	}, [id]);

	useEffect(() => {
		console.log("allURLS : ", allURLs);
	}, [allURLs]);

	const returnStar = () => {
		if (ratingCount > 0) {
			setRatingCount(ratingCount - 1);
			return <LiaStarSolid className="sstar" key={Math.random()} />;
		} else {
			return <LiaStarSolid className="sstar" key={Math.random()} />;
		}
	};

	const addProductToCart = () => {
		dispatch({ type: "ADD_TO_CART", payload: singleProduct });
		toast.success("Product added to cart");
	};

	const removeProductFromCart = () => {
		dispatch({ type: "REMOVE_FROM_CART", payload: singleProduct });
		toast.error("Product removed from cart");
	};

	const changeImage = (e) => {
		const image = e.target.src;
		const altImage = e.target.alt;
		const oldURL = imageURL;
		setImageURL(image);
		setAllURLs((prev) => ({ ...prev, [altImage]: oldURL }));
		setImageURL(image);
	};

	return (
		<div className="single-product-page">
			<div className="single-product">
				{loading ? (
					<div className="single-loader">
						<ClipLoader
							color="#3e5a94"
							loading={loading}
							size={50}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				) : (
					<div className="new-single-product">
						<div className="top-div">
							<div className="image-box">
								<img src={imageURL} alt={singleProduct.title} />
							</div>
							<div className="text-box">
								<h3 className="pp-title">{singleProduct.title}</h3>
								<div className="star-description">
									<div className="stars">
										{allStars.map(returnStar)}
										<div className="review">
											{singleProduct?.rating?.count} reviews
										</div>
									</div>
									<p className="pp-description">{singleProduct.description}</p>
									<div className="price-stock">
										<h4>$&nbsp;{singleProduct.price}</h4>
										<div className="stock">In Stock</div>
									</div>
								</div>

								{cart.some((p) => p.id === singleProduct.id) ? (
									<div
										className="my-cart-btn remove-btn"
										onClick={removeProductFromCart}>
										<p>Remove from cart</p>
									</div>
								) : (
									<div className="my-cart-btn" onClick={addProductToCart}>
										<FaShoppingCart className="cart-icon" />
										<p>Add to cart</p>
									</div>
								)}
							</div>
						</div>
						<div className="bottom-div">
							<div className="img1">
								<img
									src={allURLs.placeholder1}
									alt="placeholder1"
									onClick={changeImage}
								/>
							</div>
							<div className="img2">
								<img
									src={allURLs.placeholder2}
									alt="placeholder2"
									onClick={changeImage}
								/>
							</div>
							<div className="img3">
								<img
									src={allURLs.placeholder3}
									alt="placeholder3"
									onClick={changeImage}
								/>
							</div>
							<div className="img3">
								<img
									src={allURLs.placeholder4}
									alt="placeholder4"
									onClick={changeImage}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="related-products">
				<div className="top">
					<h2>RELATED PRODUCTS</h2>
				</div>
				<div className="single-products-container">
					{allProducts &&
						allProducts.map(
							(product) =>
								product.id !== singleProduct.id &&
								product.category === singleProduct.category && (
									<Card product={product} key={product.id} />
								)
						)}
				</div>
			</div>
		</div>
	);
};

export default SingleProduct;
