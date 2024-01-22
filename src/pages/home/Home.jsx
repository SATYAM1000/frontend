/** @format */

import "./home.css";
import Card from "../../components/card/Card";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppContext } from "../../context/Context";
import { FiFilter } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";

const Home = () => {
	const { loading, allProducts, productDispatch, productState } =
		useAppContext();
	const { byRating, byPrice,sort, searchQuery } = productState;
	console.log(byRating, byPrice,sort, searchQuery);
	const [open, setOpen] = useState(false);
	const [filterClick, setFilterClick] = useState(false);
	const handleSearchClick = () => {
		setOpen(!open);
	};

	const filterRef = useRef(null);
	const searchRef = useRef(null);

	const handleFilterClick = () => {
		setFilterClick(!filterClick);
	};

	const transformProducts = () => {
		let sortedProducts = allProducts;
		if(sort){
			sortedProducts = sortedProducts.sort((a,b)=>{
				if(sort === "lowToHigh"){
					return a.price - b.price
				}
				if(sort === "highToLow"){
					return b.price - a.price
				}
			})
		}
		if (searchQuery) {
			sortedProducts = sortedProducts.filter((product) =>
				product.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		if(byRating){
			sortedProducts = sortedProducts.filter((product)=>{
				return Math.round(product.rating.rate) == byRating	
			})
		}
		return sortedProducts;
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setOpen(false);
			}
			if (filterRef.current && !filterRef.current.contains(event.target)) {
				setFilterClick(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	return (
		<div className="home-page">
			<div className="top">
				<h2>Featured</h2>
				<div className="filter-container">
					<div className="search" ref={searchRef}>
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
					<div
						className={open ? "close" : "filter"}
						title="Filter"
						ref={filterRef}>
						<FiFilter className="filter-icon" onClick={handleFilterClick} />
						<div
							className={
								filterClick ? "filter-options open-filter" : "filter-options"
							}>
							<div className="price-low-to-high">
								<input
									type="radio"
									name="price"
									id="price-low-to-high"
									onClick={() =>
										productDispatch({
											type: "SORT_BY_PRICE",
											payload: "lowToHigh",
										})
									}
									checked={sort==="lowToHigh" ? true : false}
								/>
								<label htmlFor="price-low-to-high">Price - Low to High</label>
							</div>
							<div className="price-high-to-low">
								<input
									type="radio"
									name="price"
									id="price-high-to-low"
									onClick={() =>
										productDispatch({
											type: "SORT_BY_PRICE",
											payload: "highToLow",
										})
									}
									checked={sort==="highToLow" ? true : false}

								/>
								<label htmlFor="price-high-to-low">Price - High to Low</label>
							</div>
							<div className="rating-class">
								<input
									type="text"
									name="price"
									id="rating"
									onChange={(e) => {
										if (e.target.value < 5) {
											productDispatch({
												type: "FILTER_BY_RATING",
												payload: e.target.value,
											});
										} else {
											productDispatch({
												type: "FILTER_BY_RATING",
												payload: 5,
											});
										}
									}}
									placeholder="Filter by Rating"
								/>
							</div>
							<div className="clear-filter">
								<button
									onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}>
									Clear Filter
								</button>
							</div>
						</div>
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
						{transformProducts().length > 0 ? (
							transformProducts().map((product) => {
								return <Card product={product} key={product.id} />;
							})
						) : (
							<>
								<h4 style={{ textAlign: "center" }}>
									No Matching Products Found
								</h4>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
