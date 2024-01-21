/** @format */

import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Error from "./pages/error/Error";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import ProtectedRoute from "./components/routes/protected-route/ProtectedRoute";
import PublicRoute from "./components/routes/public-route/PublicRoute";
import Cart from "./pages/cart/Cart";
import Verification from "./pages/verification/Verification";
import Verify from "./pages/verify/Verify";
import SingleProduct from "./pages/single-product/SingleProduct";

const App = () => {
	return (
		<div className="main-app">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<PublicRoute>
								<Register />
							</PublicRoute>
						}
					/>
					<Route path="*" element={<Error />} />
					<Route
						path="/products"
						element={
							<ProtectedRoute>
								<Products />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/about"
						element={
							<ProtectedRoute>
								<About />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/verification/:token"
						element={
							<PublicRoute>
								<Verification />
							</PublicRoute>
						}
					/>
					<Route
						path="/contact"
						element={
							<ProtectedRoute>
								<Contact />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/cart"
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/verify"
						element={
							<PublicRoute>
								<Verify />
							</PublicRoute>
						}
					/>
					<Route
						path="/product/:id"
						element={
							<ProtectedRoute>
								<SingleProduct />
							</ProtectedRoute>
						}
					/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default App;
