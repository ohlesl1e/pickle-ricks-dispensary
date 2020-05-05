const initialState = {
	inventory: [
		{
			id: '1',
			title: 'Blue Dream',
			seller: 'Kuda Cannabis',
			desctiption: 'Blue Dream is a slightly sativa dominant hybrid (60% sativa/40% indica) strain that is a potent cross between the hugely popular Blueberry X Haze strains.',
			stock: 5,
			picture: '1584831039-BlueDream.jpeg',
		},
		{
			id: '2',
			title: 'Ice Cream Cake - 3.5 grams - Jar',
			seller: 'Kuda Cannabis',
			desctiption: 'Ice Cream Cake - 3.5 grams in a Jar',
			stock: 16,
			picture: '1584829555-IceCreamCake.jpeg',
		},
		{
			id: '3',
			title: 'Alien Labs - Sherbacio 3.5g',
			seller: 'Cannabis Express',
			desctiption: 'A cross between our Sunset Sherbert and Gelato 41 provides a sweet, heavy aroma that will relax the user with its tasty flavor profile and uplifting effects. Consumers love the Sherbacio for it’s ability to change sour moments into happier moments, as well as it’s abilities to heal the body.',
			stock: 7,
			picture: '78988662_7b61d4d2-97b8-4c3d-805b-8229535d9a52-800x800.jpg',
		},
		{
			id: '4',
			title: 'Pacific Stone - 805 Glue 3.5g',
			seller: 'Mission Organic',
			desctiption: '*THC/CBD levels may vary from batch to batch. Please give us a call for specific percentages. We keep it live in the 805! This heavy hitter is famous across So-Cal. A potent mix of euphoria and relaxation, this top-shelf favorite gives off earthy aromas, faintly sour aromas.',
			stock: 13,
			picture: '78697042_2ca1a101-1a16-4509-9ab1-3462dda5cc38.jpeg',
		},
		{
			id: '5',
			title: 'Madrone - Russian Cherries 3.5g',
			seller: 'Mission Organic',
			desctiption: 'RUSSIAN TRAIN-WRECK X CHERRY OG MR',
			stock: 24,
			picture: '76726668_12402407-53ca-4842-9847-eae37577860f.jpeg',
		},
	]
}

export default (state = initialState, action) => {
	switch (action.type) {

		case 'INVENTORY_SET_INVENTORY':
			return {
				...state,
				inventory: action.inventory
			}

		default:
			return state
	}
}
