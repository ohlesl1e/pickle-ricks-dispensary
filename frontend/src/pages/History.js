import React from 'react'
import { connect } from 'react-redux';
import { setIsLoggedIn} from '../redux/actions/userActions';

const History = ({
    
    receipts
    

}) => {
console.log(receipts);
    return (
        <div>
        <h2>Welcome to Purchase history</h2>
        <button>History</button>
        <div>
<p>receipts </p>
        {receipts.map((receipts,i)=><div key={i}>{receipts}</div>)}

        </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
receipts: state.receiptReducer.receipts,
    }
}

export default connect(mapStateToProps)(History)