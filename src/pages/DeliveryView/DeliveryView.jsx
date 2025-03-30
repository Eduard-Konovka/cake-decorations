import React, { useEffect } from 'react';
import { useGlobalState } from 'state';
import { getLanguage, pageUp } from 'functions';
import { languageWrapper } from 'middlewares';
import { LANGUAGE } from 'constants';
import s from './DeliveryView.module.css';

export default function DeliveryView() {
  const { mainHeight } = useGlobalState('global');

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  useEffect(pageUp, []);

  return (
    <main className={s.page} style={{ minHeight: mainHeight }}>
      <p className={s.text}>
        {languageDeterminer(LANGUAGE.deliveryView.text1)}
      </p>

      <p className={s.text}>
        {languageDeterminer(LANGUAGE.deliveryView.text2)}
      </p>

      <p className={s.text}>
        {languageDeterminer(LANGUAGE.deliveryView.text3)}
      </p>

      <p className={s.text}>
        {languageDeterminer(LANGUAGE.deliveryView.text4)}
      </p>

      <br />

      <p className={s.text}>
        {languageDeterminer(LANGUAGE.deliveryView.text5)}
      </p>

      <p className={s.text}>
        {languageDeterminer(LANGUAGE.deliveryView.text6)}
      </p>

      <p className={s.text}>
        {languageDeterminer(LANGUAGE.deliveryView.text7)}
      </p>
    </main>
  );
}
