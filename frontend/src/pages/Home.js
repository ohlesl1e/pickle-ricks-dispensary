import React from 'react';
import { connect } from 'react-redux'; // step 1
import ItemGrid from './ItemGrid';
import { getInventory } from '../redux/actions/inventoryAction';
import { displayReceipts} from '../redux/actions/receiptActions';

const Home = ({
	isLoggedIn,
	user,
	receipt,
	receipts,
	dispatch,
}) => { 
	dispatch(getInventory());
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
		
		</div>
	);
};

// Step 2 create mapping function
const mapStateToProps = state => ({
	isLoggedIn: state.userReducer.isLoggedIn,
	user: state.userReducer.user,
	password: state.userReducer.password,
	receipts: state.receiptReducer.receipts,
	receipt: state.receiptReducer.receipt

});

// step 3 connect mapping function to component
export default connect(mapStateToProps)(Home);