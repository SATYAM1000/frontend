/** @format */

import "./home.css";
import Card from "../../components/card/Card";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppContext } from "../../context/Context";
import { FiFilter } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Home = () => {
	const { loading, allProducts, productDispatch, productState } =
		useAppContext();
	const { byRating, byPrice, searchQuery } = productState;

	const [open, setOpen] = useState(false);
	const handleSearchClick = () => {
		setOpen(!open);
	};

	const transformProducts = () => {
		let sortedProducts = allProducts;
		if(searchQuery){
			sortedProducts = sortedProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
		}
		return sortedProducts;

	}

	return (
		<div className="home-page">
			<div className="top">
				<h2>Featured</h2>
				<div className="filter-container">
					<div className="search">
						<FiSearch className="search-icon-for-desktop" />
						<FiSearch
							className="search-icon-for-mobile"
							onClick={handleSearchClick}
						/>
						<input
							type="text"
							className={open ? "search-input open" : "search-input"}
							placeholder="Search"
							onChange={(e) => {
								productDispatch({
									type: "FILTER_BY_SEARCH",
									payload: e.target.value,
								});
							}}
						/>
					</div>
					<div className={open ? "close" : "filter"} title="Filter">
						<FiFilter className="filter-icon" />
					</div>
				</div>
			</div>
			{loading ? (
				<div className="loader">
					<ClipLoader
						color="#3e5a94"
						loading={loading}
						size={100}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<>
					<div className="products-container">
						{transformProducts().map((product) => {
							return <Card product={product} key={product.id} />;
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
