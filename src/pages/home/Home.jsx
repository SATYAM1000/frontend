/** @format */

import "./home.css";
import Card from "../../components/card/Card";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppContext } from "../../context/Context";
import { FiFilter } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Home = () => {
	const { loading, allProducts } = useAppContext();
	const [open, setOpen] = useState(false);
	const handleSearchClick = () => {
		setOpen(!open);
	};

	return (
		<div className="home-page">
			<div className="top">
				<h2>Featured</h2>
				<div className="filter-container">
					<div className="search">
						<FiSearch className="search-icon-for-desktop" />
						<FiSearch className="search-icon-for-mobile" onClick={handleSearchClick} />
						<input
							type="text"
							className={open ? "search-input open" : "search-input"}
							placeholder="Search"
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
						{allProducts.map((product) => {
							return <Card product={product} key={product.id} />;
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
