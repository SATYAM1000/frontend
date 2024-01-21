/** @format */

import "./singleproduct.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../../components/card/Card";
import { useAppContext } from "../../context/Context";
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
