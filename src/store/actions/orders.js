import * as actionTypes from './actionTypes';
import axios from '../../axios/orders';

export const checkOut = (orderData, token) => {
  return async function (dispatch) {
    try {
      await axios('/orders.json', {
        method: 'post',
        params: {
          auth: token
        },
        data: orderData
      });
      dispatch(checkoutSuccess());
    } catch (error) {
      console.error(error);
      dispatch(checkoutFail());
    }
  };
};

export const checkoutStart = () => ({
  type: actionTypes.CHECKOUT_START
});

export const checkoutSuccess = () => ({
  type: actionTypes.CHECKOUT_SUCCESS
});

export const checkoutFail = () => ({
  type: actionTypes.CHECKOUT_FAIL
});

export const fetchOrders = (token, userId) => {
  return async function (dispatch) {
    dispatch(fetchOrdersStart());

    const params = {
      auth: token,
      orderBy: '"' + userId + '"',
      equalTo: userId
    };

    try {
      const response = await axios.get('/orders.json' + '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"');
      const orders = [];

      for (let key in response.data) {
        orders.push({
          ...response.data[key],
          id: key
        });
      }

      dispatch(fetchOrdersSuccess(orders));
    } catch (error) {
      dispatch(fetchOrdersFail());
    }
  }
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = () => ({
  type: actionTypes.FETCH_ORDERS_FAIL
});