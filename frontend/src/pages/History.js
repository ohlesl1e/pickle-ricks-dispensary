import React from 'react'
import { connect } from 'react-redux';
import { 
    setIsLoggedIn,
    setLoadingState
    } from '../redux/actions/userActions';
import {
    setReceipt,
    setReceipts,
    displayReceipts,
     } from '../redux/actions/receiptActions';
import { Redirect} from 'react-router-dom';

const History = ({ 
    isLoggedIn,
    loadingState,
    receipt,
    receipts,
    dispatch
    }) => {

    // if ({isLoggedIn : false}) {
        
    //     return (
    //         <div>
    //               <Redirect to="/login" />   
    //     </div>
    //     ); 
    //   }

    //   if (isLoggedIn){
    //      return  <Redirect to="/History" />
    //   }


    //   if (loadingState === 'loading') {
    //     return <h2>Loading...</h2>;
    //   }
    
    return (
        <div>
        <h2>Welcome to Purchase history</h2>
        {loadingState === 'error' && <b>User name or password incorrect</b>}
        <button onClick={() => dispatch(displayReceipts())}>History</button>
        {receipts.map(txt => <p>{txt}</p>)} 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn,
        loadingState: state.userReducer.loadingState,
        receipt: state.receiptReducer.receipt,
        receipts: state.receiptReducer.receipts

    }
}

export default connect(mapStateToProps)(History)