import React from 'react';
import PropTypes from 'prop-types';
import Product from 'components/Product';
import s from './ProductList.module.css';

export default function ProductList({ products, addToCart }) {
  return (
    <ul id="productList" className={s.list}>
      {products.map(item => (
        <li key={item._id} className={s.item}>
          <Product product={item} addToCart={addToCart} />
        </li>
      ))}
    </ul>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};
