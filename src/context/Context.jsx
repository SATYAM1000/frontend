/** @format */

import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { cartReducer } from "./Reducers";
const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [allProducts, setAllProducts] = useState([]);
	useEffect(() => {
		const getAllProducts = async () => {
			try {
				setLoading(true);
				const response = await fetch("https://fakestoreapi.com/products");
				const data = await response.json();
				setAllProducts(data);
				setLoading(false);
			} catch (error) {
				console.log("Error while fetching data from server", error);
			}
		};
		getAllProducts();
	}, []);
	const [state, dispatch] = useReducer(cartReducer, {
		allProducts: allProducts,
		cart: [],
	});
	return (
		<AppContext.Provider
			value={{ loading, setLoading, allProducts, state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used inside an AppProvider");
	}
	return context;
};

export { AppProvider, useAppContext };
