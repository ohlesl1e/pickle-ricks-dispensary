import { setReceipts } from "./receiptActions";

export const setUser = user => ({
	type: 'USER_SET_USER',
	user,
});

export const setPassword = password => ({
	type: 'USER_SET_PASSWORD',
	password,
});

export const setIsLoggedIn = isLoggedIn => ({
	type: 'USER_SET_IS_LOGGED_IN',
	isLoggedIn,
});

export const setLoadingState = loadingState => ({
	type: 'USER_SET_LOADING_STATE',
	loadingState,
});

export const setCart = cart => ({
	type: 'USER_SET_CART',
	cart,
})

export const login = () => (dispatch, getState) => {
	//console.log('login function');
	const reduxEvent = setLoadingState('loading'); // regular object
	//console.log(reduxEvent);
	// in order for redux to know something happened
	dispatch(reduxEvent); // now redux knows something is happening
	const userName = getState().userReducer.user;
	const userPassword = getState().userReducer.password;
	const url = '/api/auth/authenticate';
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId: userName, password: userPassword }),
	}
	fetch(url, requestOptions)
		.then(res => res.json())
		.then(data => {
			console.log('here');
			if (data.valid) {
				dispatch(setIsLoggedIn(true));
				dispatch(setLoadingState('init'));
			} else {
				dispatch(setLoadingState('error'));
			}
		})
		.catch(console.log);
};

export const logout = () => (dispatch, getState) => {
	dispatch(setIsLoggedIn(false));
	dispatch(setUser(''));
	dispatch(setPassword(''));
	dispatch(setReceipts([]));
	dispatch(setCart([]))
};

export const create = () => (dispatch, getState) => {
	const reduxEvent = setLoadingState('loading'); // regular object
	console.log(reduxEvent);
	// in order for redux to know something happened
	dispatch(reduxEvent); // now redux knows something is happening
	const userName = getState().userReducer.user;
	const userPassword = getState().userReducer.password;
	const url = '/api/auth/create';
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId: userName, password: userPassword }),
	}
	fetch(url, requestOptions)
		.then(res => res.json())
		.then(data => {
			if (data.valid) {
				dispatch(setUser(''));
				dispatch(setPassword(''));
				dispatch(setLoadingState('init'));
			} else {
				dispatch(setLoadingState('error'));
			}
		})
		.catch(console.log);
};

export const addToCart = amount => (dispatch, getState) => {
	const cart = getState().userReducer.cart
	const newItem = getState().itemReducer.item
	const inventory = getState().inventoryReducer.inventory
	const stock = inventory.find((value, index, array) => {
		return value.title === newItem.title
	}).stock
	const index = cart.findIndex((value, index, array) => {
		return value.item.title === newItem.title
	})
	if (index === -1) {
		cart.push({
			amount: parseInt(amount),
			item: newItem
		})
	} else {
		if (cart[index].amount + parseInt(amount) > stock) {
			cart[index].amount = stock
		} else {
			cart[index].amount += parseInt(amount)
		}
	}
	dispatch(setCart(cart))
}

export const deleteFromCart = cartItem => (dispatch, getState) => {
	const cart = getState().userReducer.cart
	const index = cart.findIndex(value => {
		return value.item._id === cartItem.item._id
	})
	console.log(cartItem);
	dispatch(setCart(cart.slice(0, index).concat(cart.slice(index + 1))))
}