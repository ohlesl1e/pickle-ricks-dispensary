const initialState = {
    item: {
        id: '',
        title: '',
        sellerName: '',
        sellerEmail: '',
        desctiption: '',
        stock: '',
        picture: '',
        views: '1',
        price: '',
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'ITEM_SET_ITEM':
            return {
                ...state,
                item: action.item
            };
        case 'ITEM_SET_VIEWS':
			return{
				...state,
				views: action.views,
			}

        default:
            return state
    }
}
