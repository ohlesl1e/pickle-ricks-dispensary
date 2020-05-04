const initialState = {
    item: {
        title: 'Blue Dream',
        seller: 'Kuda Cannabis',
        desctiption: 'Blue Dream is a slightly sativa dominant hybrid (60% sativa/40% indica) strain that is a potent cross between the hugely popular Blueberry X Haze strains.',
        stock: 5,
        picture: '1584831039-BlueDream.jpeg',
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
