import userReducer from "../reducers/userReducer";

export const setItem = item => ({
    type: 'ITEM_SET_ITEM',
    item
})

export const setInventory = inventory => ({
    type: 'INVENTORY_SET_INVENTORY',
    inventory
})

export const selectItem = index => (dispatch, getState) => {
    dispatch(setItem(getState().inventoryReducer.inventory[index]))
}

export const getInventory = () => (dispatch) => {
    const url = '/api/inventory/get';

    fetch(url)
        .then( res => res.json())
        .then( data => {
            dispatch(setInventory(data));
        })
        .catch(console.log);

};

export const getInventorySeller = (email) => (dispatch) => {
    console.log(email);
    const url = '/api/inventory/seller/get';
    const requestbody = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ sellerEmail : email })
        }
    fetch(url, requestbody)
        .then( res => res.json())
        .then( data => {
            dispatch(setInventory(data))
        })
        .catch(console.log);

};