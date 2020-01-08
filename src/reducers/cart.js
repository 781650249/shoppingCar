import { createActions, handleActions } from "redux-actions";
import { getProduct } from "./products";
import shop from "../api/shop";

export const {
  addToCart,
  checkoutRequest,
  checkoutSuccess,
  checkoutFailure
} = createActions({
  ADD_TO_CART: id => ({ id }),
  CHECKOUT_REQUEST: null,
  CHECKOUT_SUCCESS: null,
  CHECKOUT_FAILURE: null
});

const addedIds = (state, { payload: { id } }) => {
  if (state.indexOf(id) !== -1) {
    return state;
  }
  return [...state, id];
};

const quantityById = (state, { payload: { id } }) => {
  return {
    ...state,
    [id]: (state[id] || 0) + 1
  };
};

const initialState = {
  addedIds: [],
  quantityById: {},
  loading: false
};
const reducer = handleActions(
  {
    [checkoutRequest]: state => ({ ...state, loading: true }),
    [checkoutSuccess]: () => initialState,
    [checkoutFailure]: state => ({ ...state, loading: false }),
    [addToCart]: (state, action) => ({
      addedIds: addedIds(state.addedIds, action),
      quantityById: quantityById(state.quantityById, action)
    })
  },
  initialState
);

export const add = id => (dispatch, getState) => {
  if (getState().products.byId[id].inventory > 0) {
    dispatch(addToCart(id));
  }
};

export const getCartProducts = state =>
  state.cart.addedIds.map(id => ({
    ...getProduct(state.products, id),
    quantity: state.cart.quantityById[id]
  }));

export const  getSubTotal = state => {
  return state.cart.addedIds
    .reduce((sum, id) => {
      const product = getProduct(state.products, id);
      return sum + product.price * state.cart.quantityById[id];
    }, 0)
    .toFixed(2);
};

export const checkout = () => async (dispatch, getState) => {
  const { cart } = getState();
  dispatch(checkoutRequest());
  await shop.buyProducts(cart);
  dispatch(checkoutSuccess());
};

export default reducer;
