const initialState = {
    item: {
        id: '',
        title: '',
        seller: '',
        desctiption: '',
        stock: '',
        picture: '',
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'ITEM_SET_ITEM':
            return {
                ...state,
                item: action.item
            }

        default:
            return state
    }
}
