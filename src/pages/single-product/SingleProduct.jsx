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
	const { loading, setLoading, allProducts } = useAppContext();
	const [ratingCount, setRatingCount] = useState(
		singleProduct.rating?.rate || 0
	);

	const [images, setImages] = useState([
		placeholder1,
		placeholder2,
		placeholder3,
		placeholder4,
		singleProduct.image,
	]);
	const handleDragStart = (index) => (e) => {
		e.dataTransfer.setData("text/plain", index.toString());
	};

	const handleDrop = (index) => (e) => {
		e.preventDefault();
		const draggedIndex = Number(e.dataTransfer.getData("text/plain"));
		const newImages = [...images];

		// Swap images
		const temp = newImages[index];
		newImages[index] = newImages[draggedIndex];
		newImages[draggedIndex] = temp;

		setImages(newImages);
	};

	const allowDrop = (e) => {
		e.preventDefault();
	};

	const { id } = useParams();
	let allStars = new Array(5).fill(0);
	const {
		state: { cart },
		dispatch,
	} = useAppContext();
	useEffect(() => {
		console.log("ratingCount: ", ratingCount);
	}, [ratingCount]);

	useEffect(() => {
		const getSingleProductData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`https://fakestoreapi.com/products/${id}`
				);
				setLoading(false);
				setSingleProduct(response.data);
				setImages([
					placeholder1,
					placeholder2,
					placeholder3,
					placeholder4,
					response.data.image,
				]);
				setRatingCount(Math.round(response.data.rating.rate));

				window.scrollTo({ top: 0, behavior: "smooth" });
			} catch (error) {
				setLoading(false);
				console.log("Error while fetching data from server", error);
				toast.error("Something went wrong");
			}
		};
		getSingleProductData();
	}, [id]);

	const returnStar = (index) => {
		const renderStar = index < Math.round(singleProduct.rating.rate);

		if (renderStar) {
			return <LiaStarSolid className="gold-star" key={index} />;
		} else {
			return <LiaStarSolid className="black-star" key={index} />;
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

	const changeImage = (index) => {
		const initialImg = images[index];
		const finalImg = images[4];
		const img1 = images[0];
		const img2 = images[1];
		const img3 = images[2];
		const img4 = images[3];

		if (index === 0) {
			setImages([finalImg, img2, img3, img4, initialImg]);
		} else if (index === 1) {
			setImages([img1, finalImg, img3, img4, initialImg]);
		} else if (index === 2) {
			setImages([img1, img2, finalImg, img4, initialImg]);
		} else if (index === 3) {
			setImages([img1, img2, img3, finalImg, initialImg]);
		}
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
							<div
								className="image-box"
								onDragOver={allowDrop}
								onDrop={handleDrop(4)}>
								<img
									src={images[4]}
									alt={singleProduct.title}
									draggable
									onDragStart={handleDragStart(4)}
								/>
							</div>
							<div className="text-box">
								<h3 className="pp-title">{singleProduct.title}</h3>
								<div className="star-description">
									<div className="stars">
										{ratingCount
											? allStars.map((_, index) => returnStar(index))
											: null}
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
										className="my-cart-btn remove-btn1"
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
							<div
								className="img1"
								onDragOver={allowDrop}
								onDrop={handleDrop(0)}>
								<img
									src={images[0]}
									alt="placeholder1"
									onClick={() => changeImage(0)}
									draggable
									onDragStart={handleDragStart(0)}
								/>
							</div>
							<div
								className="img2"
								onDragOver={allowDrop}
								onDrop={handleDrop(1)}>
								<img
									src={images[1]}
									alt="placeholder2"
									onClick={() => changeImage(1)}
									draggable
									onDragStart={handleDragStart(1)}
								/>
							</div>
							<div
								className="img3"
								onDragOver={allowDrop}
								onDrop={handleDrop(2)}>
								<img
									src={images[2]}
									alt="placeholder3"
									onClick={() => changeImage(2)}
									draggable
									onDragStart={handleDragStart(2)}
								/>
							</div>
							<div
								className="img3"
								onDragOver={allowDrop}
								onDrop={handleDrop(3)}>
								<img
									src={images[3]}
									alt="placeholder4"
									onClick={() => changeImage(3)}
									draggable
									onDragStart={handleDragStart(3)}
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
