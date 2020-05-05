export const setItem = item => ({
    type: 'ITEM_SET_ITEM',
    item
})

export const selectItem = index => (dispatch, getState) => {
    dispatch(setItem(getState().inventoryReducer.inventory[index]))
}
