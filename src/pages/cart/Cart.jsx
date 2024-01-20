/** @format */

import "./Cart.css";
import { useAppContext } from "../../context/Context";
import { CiCircleRemove } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const Cart = () => {
	const {
		state: { cart },
		dispatch,
	} = useAppContext();
	const total = cart.reduce((acc, item) => {
		return acc + item.qty * item.price;
	}, 0);
	return (
		<div className="cart-page">
			<h2 className="cart-top">SHOPPING CART</h2>
			<div className="cart-products">
				<table className="table-products">
					<thead className="thead">
						<tr className="tr-table">
							<th className="th-table-img">Product</th>
							<th className="th-table-remve">Remove</th>
							<th className="th-table-price">Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
					</thead>

					<tbody className="tbody">
						{cart.map((item) => {
							return (
								<tr className="trr" key={item.id}>
									<td>
										<div className="cart-product">
											<img className="pro-img" src={item.image} alt="" />
											<div>
												<p className="pro-title">
													{item.title.substring(0, 20)}
												</p>
												<br />
											</div>
										</div>
									</td>
									<td className="circle">
										<CiCircleRemove
											onClick={() =>
												dispatch({ type: "REMOVE_FROM_CART", payload: item })
											}
											className="remove"
										/>
									</td>
									<td className="pprice">
										<p>${item.price}</p>
									</td>
									<td className="ii">
										<div className="cc">
											<FaMinus
												onClick={() =>
													dispatch({ type: "DECREMENT", payload: item })
												}
												className="remove-i minus"
											/>
											<p>{item.qty}</p>
											<FaPlus
												onClick={() =>
													dispatch({ type: "INCREMENT", payload: item })
												}
												className="remove-i plus"
											/>
										</div>
									</td>
									<td>
										<p>${item.price * item.qty}</p>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{total === 0 ? (
				<><h2>Your cart is empty.</h2></>
			) : (
				<>
					<div className="total-chekout">
						<div className="empty">
							<button onClick={() => dispatch({ type: "EMPTY_CART" })}>
								Clear Cart
							</button>
						</div>
						<div className="ttotal">
							<p>Total</p>
							<p>{total}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
