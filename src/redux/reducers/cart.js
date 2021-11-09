const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: currentPizzaItems.reduce(
            (sum, obj) => obj.price + sum,
            0
          ),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const arrAllPizzas = [].concat.apply([], items);
      const totalPrice = arrAllPizzas.reduce((sum, obj) => obj.price + sum, 0);

      return {
        ...state,
        items: newItems,
        totalCount: arrAllPizzas.length,
        totalPrice,
      };
    }

    case "CLEAR_CART":
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };

    case "REMOVE_CART_ITEM": {
      const removeItems = {
        ...state.items,
      };
      const currentTotalPrice = removeItems[action.payload].totalPrice;
      const currentTotalCount = removeItems[action.payload].items.length;
      delete removeItems[action.payload];
      return {
        ...state,
        items: removeItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }
    case "PLUS_CART_ITEM":
      const newItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: newItems.reduce((sum, obj) => obj.price + sum, 0),
          },
        },
      };

    case "MINUS_CART_ITEM":
      const oldItems = state.items[action.payload].items;
      const newItemsMinus =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItemsMinus,
            totalPrice: newItemsMinus.reduce((sum, obj) => obj.price + sum, 0),
          },
        },
      };

    default:
      return state;
  }
};

export default cart;
