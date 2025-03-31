import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGlobalState } from 'state';
import { CartList, Button } from 'components';
import { getLanguage } from 'functions';
import { languageWrapper } from 'middlewares';
import { auth } from 'db';
import { LANGUAGE } from 'constants';
import s from './CartBar.module.css';

export default function CartBar({
  changeSelectCount,
  onDeleteProduct,
  onSubmit,
}) {
  const navigate = useNavigate();
  const { cart } = useGlobalState('global');

  const [totalCost, setTotalCost] = useState(0);

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  useEffect(() => {
    setTotalCost(
      cart.reduce((acc, obj) => acc + obj.count * obj.price, 0).toFixed(2),
    );
  }, [cart]);

  const completePurchase = () => {
    if (auth.currentUser) {
      onSubmit(Number(totalCost));
    } else {
      navigate('/ordering', {
        state: {
          totalCost: Number(totalCost),
        },
      });
    }
  };

  return (
    <div className={s.cartbar}>
      <CartList
        cart={cart}
        changeSelectCount={changeSelectCount}
        onDeleteProduct={onDeleteProduct}
      />

      <div className={s.priceBox}>
        <p className={s.totalCost}>
          {languageDeterminer(LANGUAGE.cartBar.totalCost)}
          {totalCost} ₴
        </p>

        <Button
          title={languageDeterminer(LANGUAGE.cartBar.buttonTitle)}
          type="button"
          onClick={completePurchase}
        >
          {languageDeterminer(LANGUAGE.cartBar.buttonText)}
        </Button>
      </div>
    </div>
  );
}

CartBar.propTypes = {
  changeSelectCount: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
