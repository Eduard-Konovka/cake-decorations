import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGlobalState } from 'state';
import { CountForm, Button } from 'components';
import { getLanguage } from 'functions';
import { languageWrapper, titleWrapper } from 'middlewares';
import { GLOBAL, LANGUAGE } from 'constants';
import defaultImage from 'assets/notFound.png';
import s from './SelectedProduct.module.css';

export default function SelectedProduct({
  selectedProduct,
  changeSelectCount,
  onDeleteProduct,
}) {
  const { _id, images, price, count } = selectedProduct;
  const { language } = useGlobalState('global');

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  return (
    <article className={s.card}>
      <Link
        to={`/products/${_id}`}
        title={`${languageDeterminer(
          LANGUAGE.selectedProduct.titleLink,
        )} "${titleWrapper(language, selectedProduct)}"`}
        className={s.thumb}
      >
        <img
          src={images?.length > 0 ? images[0].url : defaultImage}
          alt={titleWrapper(language, selectedProduct)}
          className={s.image}
        />

        <h3 className={s.title}>
          {titleWrapper(language, selectedProduct).length < GLOBAL.titleLength
            ? titleWrapper(language, selectedProduct)
            : titleWrapper(language, selectedProduct).slice(
                0,
                GLOBAL.titleLength,
              ) + '...'}
        </h3>
      </Link>

      <div className={s.controls}>
        <p className={s.price}>
          <span className={s.priceTitle}>
            {languageDeterminer(LANGUAGE.selectedProduct.price)}
          </span>
          <span className={s.priceValue}>{price} ₴</span>
        </p>

        <CountForm
          value={count}
          price={price}
          min={GLOBAL.productCount.min}
          max={GLOBAL.productCount.max}
          styles={{
            formStyle: s.countForm,
            labelStyle: s.countLabel,
            inputStyle: s.countInput,
            totalPriceStyle: s.totalPrice,
            totalPriceTitleStyle: s.totalPriceTitle,
            totalPriceValueStyle: s.totalPriceValue,
          }}
          setCount={count => changeSelectCount({ count, _id })}
        />

        <Button
          title={languageDeterminer(LANGUAGE.selectedProduct.buttonTitle)}
          type="button"
          styles={s.btn}
          onClick={onDeleteProduct}
        >
          {languageDeterminer(LANGUAGE.selectedProduct.buttonText)}
        </Button>
      </div>
    </article>
  );
}

SelectedProduct.propTypes = {
  selectedProduct: PropTypes.object.isRequired,
  changeSelectCount: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};
