import React from "react";

const ProductList = props => {
  const { products, addToCart } = props;
  const list = products.map((item, key) => (
    <li key={key}>
      <div>
        <span>{item.title}</span>
        {"-"}
        <span>${item.price}</span> <span> 当前数量X{item.inventory}</span>
      </div>
      <div>
        <button onClick={() => addToCart(item.id)} disabled={!item.inventory}>
          添加购物车
        </button>
      </div>
    </li>
  ));
  return (
    <div>
      <h3>产品</h3>
      <ul>{list}</ul>
    </div>
  );
};

export default ProductList;
