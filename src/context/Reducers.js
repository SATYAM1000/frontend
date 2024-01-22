/** @format */

export const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: state.cart.filter((c) => c.id !== action.payload.id),
			};
		case "CHANGE_CART_QTY":
			return {
				...state,
				cart: state.cart.filter((c) =>
					c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
				),
			};
		case "EMPTY_CART":
			return { ...state, cart: [] };
		case "INCREMENT":
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
				),
			};
		case "DECREMENT":
			return {
				...state,
				cart: state.cart
					.map((item) =>
						item.id === action.payload.id
							? { ...item, qty: item.qty - 1 }
							: { ...item }
					)
					.filter((item) => item.qty !== 0),
			};

		default:
			return state;
	}
};

export const productReducer = (state, action) => {
	switch (action.type) {
		case "SORT_BY_PRICE":
			return { ...state, sort: action.payload };
		case "FILTER_BY_RATING":
			return { ...state, byRating: action.payload };
		case "FILTER_BY_SEARCH":
			return { ...state, searchQuery: action.payload };
		case "CLEAR_SEARCH":
			return { ...state, searchQuery: "" };
		case "CLEAR_FILTERS":
			return { byRating: 0, byPrice: 0, searchQuery: "" };
		default:
			return state;
	}
};
