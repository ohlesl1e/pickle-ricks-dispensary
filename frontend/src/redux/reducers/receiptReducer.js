const DEFAULT_STATE = {
  receipt : '',
  receipts : []
};

const receiptReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'RECEIPT_SET_NOTE':
        return {
          ...state,
          receipt: action.receipt,
        };
      case 'RECEIPTS_SET_RECEIPTS':
        return {
          ...state,
          receipts: action.receipts,
        };
    default:
      return state;
  }
};

export default receiptReducer;