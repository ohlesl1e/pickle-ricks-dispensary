import React from 'react';
import { connect } from 'react-redux'; // step 1
import ItemGrid from './ItemGrid';
import { getInventory, getInventorySeller } from '../redux/actions/inventoryAction';


const Home = ({
	isLoggedIn,
	user,
	receipt,
	receipts,
	userType,
	email,
	dispatch,
	ws
}) => { 
	console.log('home called');
	console.log(userType);
	if(userType === 'Seller'){
		dispatch(getInventorySeller(email));
	} else {
		dispatch(getInventory());
	}
	return (
		<div>
			<h2>Shop</h2>
			{isLoggedIn && (
				<div>
					<div id="topContainer">
						<div id="topLeftContainer">
							<p className="welcomeTitle">
								{`Welcome ${user}!`}
							</p>
						
						</div>
					</div>
					
				</div>
			)}
			{!isLoggedIn && (<p> Please Log in or Sign up</p>)}
			<ItemGrid ws={ws} />
		</div>
	);
};

// Step 2 create mapping function
const mapStateToProps = state => ({
	isLoggedIn: state.userReducer.isLoggedIn,
	user: state.userReducer.user,
	password: state.userReducer.password,
	userType: state.userReducer.userType,
	email: state.userReducer.email,
});

// step 3 connect mapping function to component
export default connect(mapStateToProps)(Home);