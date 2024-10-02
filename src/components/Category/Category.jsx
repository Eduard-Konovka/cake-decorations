import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGlobalState } from 'state';
import defaultImage from 'assets/notFound.png';
import s from './Category.module.css';

export default function Category({ category, setProductsByCategory }) {
  const { products, language } = useGlobalState('global');

  function handleCategoryClick(categoryId) {
    const productsFromCategory = products.filter(product =>
      product.category.includes(categoryId),
    );

    setProductsByCategory(productsFromCategory);
  }

  return (
    <Link
      to={`/products`}
      className={s.link}
      onClick={() => handleCategoryClick(category._id)}
    >
      <article className={s.article}>
        <div className={s.imageBox}>
          <img
            className={s.image}
            src={category?.image?.length > 0 ? category.image : defaultImage}
            alt={language === 'RU' ? category.ruTitle : category.uaTitle}
          />
        </div>

        <div className={s.thumb}>
          <h3 className={s.title}>
            {language === 'RU' ? category.ruTitle : category.uaTitle}
          </h3>
        </div>
      </article>
    </Link>
  );
}

Category.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    uaTitle: PropTypes.string.isRequired,
    ruTitle: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  setProductsByCategory: PropTypes.func.isRequired,
};
