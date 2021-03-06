import * as actionTypes from './actionTypes';
import axios from '../../axios/orders';

export const setIsCustomizing = isCustomizing => ({
  type: actionTypes.SET_IS_CUSTOMIZING,
  isCustomizing
});

export const chooseBase = (baseType, flavor, price) => ({
  type: actionTypes.CHOOSE_BASE,
  baseType,
  flavor,
  price
});

export const addAddOn = (addOn, price) => ({
  type: actionTypes.ADD_ADD_ON,
  addOn,
  price
});

export const removeAddOn = (addOn, price) => ({
  type: actionTypes.REMOVE_ADD_ON,
  addOn,
  price
});

export const chooseIceOrSugarLevel = (item, level) => ({
  type: actionTypes.CHOOSE_ICE_OR_SUGAR_LEVEL,
  item,
  level
});

export const setDrinkOptions = drinkOptions => ({
  type: actionTypes.SET_OPTIONS,
  drinkOptions
});

export const defaultDrinkOrder = drinkOptions => {
  const addOns = {};

  drinkOptions.addOns.forEach(addOn => {
    addOns[addOn.value] = 0;
  });

  return {
    base: {
      type: '',
      flavor: ''
    },
    addOns,
    ice: drinkOptions.ice[0],
    sugar: drinkOptions.sugar[0],
  };
};

export const setDrinkOrderDefault = drinkOptions => ({
  type: actionTypes.SET_DRINK_ORDER_DEFAULT,
  drinkOrder: defaultDrinkOrder(drinkOptions)
});

export const initDrinkCustomizer = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('/drink-options.json');
      const drinkOptions = response.data;
      
      dispatch(setDrinkOptions(drinkOptions));
      dispatch(setDrinkOrderDefault(drinkOptions));
    } catch (error) {
      console.error(error);
    }
  };
};