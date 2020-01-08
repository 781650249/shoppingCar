import { connect } from "react-redux";
import Cart from "../components/Cart";
import { getCartProducts, getSubTotal, checkout } from "../reducers/cart";

const mapStateToProps = state => ({
  products: getCartProducts(state),
  subtotal: getSubTotal(state),
  loading: state.cart.loading
});

const mapDispatchToProps = dispatch => ({
  onCheckout: () => dispatch(checkout())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
