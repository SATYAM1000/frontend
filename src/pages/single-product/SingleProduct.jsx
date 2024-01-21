/** @format */

import "./singleproduct.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../../components/card/Card";
import { useAppContext } from "../../context/Context";
import placeholder from "../../assets/placeholder.jpg";
const SingleProduct = () => {
	const [singleProduct, setSingleProduct] = useState({});
	const { loading, setLoading, allProducts } = useAppContext();
	const { id } = useParams();
	useEffect(() => {
		const getSingleProductData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`https://fakestoreapi.com/products/${id}`
				);
				setLoading(false);
				setSingleProduct(response.data);
				console.log("single product: ", response.data);
			} catch (error) {
				setLoading(false);
				console.log("Error while fetching data from server", error);
				toast.error("Something went wrong");
			}
		};
		getSingleProductData();
	}, [id]);
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
								<img src={singleProduct.image} alt={singleProduct.title} />
							</div>
							<div className="text-box">
								<h3 className="pp-title">{singleProduct.title}</h3>
								<p className="pp-description">{singleProduct.description}</p>
								<h4>{singleProduct.price}</h4>
								<div className="quantity-add-cart">
									<div className="qty"></div>
									<div className="cart-btn">
										<button>Add to cart</button>
									</div>
								</div>
							</div>
						</div>
						<div className="bottom-div">
							<div className="img1">
								<img src={placeholder} alt="" />
							</div>
							<div className="img2">
								<img src={placeholder} alt="" />
							</div>
							<div className="img3">
								<img src={placeholder} alt="" />
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
