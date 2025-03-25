import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from 'state';
import { pageUp } from 'functions';
import s from './ContactsView.module.css';

export default function ContactsView() {
  const { mainHeight } = useGlobalState('global');

  useEffect(pageUp, []);

  return (
    <main className={s.page} style={{ minHeight: mainHeight }}>
      <div className={s.box}>
        <p className={s.attributeName}>Адреса:</p>
        <p className={s.attributeValue}>
          Центральний ринок, магазин № 316, Ізмаїл, Україна
        </p>

        <p className={s.attributeName}>Телефони:</p>
        <p className={s.attributeValue}>+380501316643 / +380981332037</p>

        <p className={s.attributeName}>Телеграм:</p>
        <p className={s.attributeValue}>+380501316643</p>

        <p className={s.attributeName}>Вайбер:</p>
        <p className={s.attributeValue}>+380501316643</p>

        <p className={s.attributeName}>Инстаграм:</p>
        <p className={s.attributeValue}>
          <Link
            to="https://www.instagram.com/tortoviprikrasi_izmail?igsh=MTZoc2d5ZnI3eWZvMw=="
            className={s.link}
          >
            Тетяна Чечіна
          </Link>
        </p>
      </div>
    </main>
  );
}
