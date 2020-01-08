import ProductList from "../components/ProductList";
import { connect } from "react-redux";
import { getVisibleProducts } from "../reducers/products";
import { add } from "../reducers/cart";

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(add(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
