import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  drinkOptions: {},
  drinkOrder: {
    base: '',
    toppings: {
      boba: 0,
      eggPudding: 0,
      grassJelly: 0
    },
    ice: '0%',
    sugar: '0%'
  },
  price: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_OPTIONS:
      return {
        ...state,
        drinkOptions: action.drinkOptions
      };

    case actionTypes.CHOOSE_BASE:
      return {
        ...state,
        drinkOrder: {
          ...state.drinkOrder,
          base: action.base,
        },
        price: state.price + action.price
      };

    case actionTypes.ADD_TOPPING:
      return {
        ...state,
        drinkOrder: {
          ...state.drinkOrder,
          toppings: {
            ...state.drinkOrder.toppings,
            [action.topping]: state.drinkOrder.toppings[action.topping] + 1
          },
        },
        price: state.price + action.price
      };

    case actionTypes.REMOVE_TOPPING:
      return {
        ...state,
        drinkOrder: {
          ...state.drinkOrder,
          toppings: {
            ...state.drinkOrder.toppings,
            [action.topping]: state.drinkOrder.toppings[action.topping] - 1
          }
        },
        price: state.price - action.price
      };

    case actionTypes.CHOOSE_ICE_OR_SUGAR_LEVEL:
      return {
        ...state,
        drinkOrder: {
          ...state.drinkOrder,
          [action.item]: action.level
        }
      };

    default: return state;
  }
};

export default reducer;