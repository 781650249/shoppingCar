import { createActions, handleActions } from "redux-actions";
import shop from "../api/shop";
import { combineReducers } from "redux";

export const { setProducts, addToCart } = createActions({
  SET_PRODUCTS: items => ({ items }),
  ADD_TO_CART: id => ({ id })
});

export const getAllProducts = () => async dispatch => {
  const res = await shop.getProducts();
  console.log(res);
  dispatch(setProducts(res.data));
};

const byId = handleActions(
  {
    [setProducts]: (state, { payload: { items } }) => {
      return {
        ...state,
        ...items.reduce((obj, item) => {
          obj[item.id] = item;
          return obj;
        }, {})
      };
    },
    [addToCart]: (state, { payload: { id } }) => {
      const selected = state[id];
      return {
        ...state,
        [id]: { ...selected, inventory: selected.inventory - 1 }
      };
    }
  },
  {}
);

const visibleIds = handleActions(
  {
    [setProducts]: (state, { payload: { items } }) => {
      return items.map(item => item.id);
    }
  },
  []
);

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id));

export default combineReducers({
  byId,
  visibleIds
});
