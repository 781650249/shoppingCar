import React from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../reducers/products";
import ProductListContainer from "../containers/ProductListContainer";
import CartContainer from "../containers/CartContainer";

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getAllProducts());
  }
  render() {
    return (
      <div>
        <h2>购物车实例</h2>
        <hr />
        <ProductListContainer />
        <hr />
        <CartContainer />
      </div>
    );
  }
}

export default connect()(App);
