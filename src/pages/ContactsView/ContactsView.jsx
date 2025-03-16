import React, { useEffect } from 'react';
import { useGlobalState } from 'state';
import { pageUp } from 'functions';
import s from './ContactsView.module.css';

export default function ContactsView() {
  const { mainHeight } = useGlobalState('global');

  useEffect(pageUp, []);

  return (
    <main className={s.page} style={{ minHeight: mainHeight }}>
      <div className={s.box}>
        <p className={s.address}>
          Центральний ринок, магазин № 316, Ізмаїл, Україна
        </p>
        <div className={s.contacts}>
          <p className={s.phone}>+380 (50) 131-66-43</p>
          <p className={s.phone}>+380 (98) 133-20-37</p>
        </div>
      </div>
    </main>
  );
}
