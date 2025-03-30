import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from 'state';
import { getLanguage, pageUp } from 'functions';
import { languageWrapper } from 'middlewares';
import { LANGUAGE } from 'constants';
import s from './ContactsView.module.css';

export default function ContactsView() {
  const { mainHeight } = useGlobalState('global');

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  useEffect(pageUp, []);

  return (
    <main className={s.page} style={{ minHeight: mainHeight }}>
      <div className={s.box}>
        <p className={s.attributeName}>
          {languageDeterminer(LANGUAGE.contactsView.address.name)}:
        </p>
        <p className={s.attributeValue}>
          {languageDeterminer(LANGUAGE.contactsView.address.value)}
        </p>

        <p className={s.attributeName}>
          {languageDeterminer(LANGUAGE.contactsView.phones.name)}:
        </p>
        <p className={s.attributeValue}>
          {languageDeterminer(LANGUAGE.contactsView.phones.value)}
        </p>

        <p className={s.attributeName}>
          {languageDeterminer(LANGUAGE.contactsView.telegram.name)}:
        </p>
        <p className={s.attributeValue}>
          {languageDeterminer(LANGUAGE.contactsView.telegram.value)}
        </p>

        <p className={s.attributeName}>
          {languageDeterminer(LANGUAGE.contactsView.viber.name)}:
        </p>
        <p className={s.attributeValue}>
          {languageDeterminer(LANGUAGE.contactsView.viber.value)}
        </p>

        <p className={s.attributeName}>
          {languageDeterminer(LANGUAGE.contactsView.instagram.name)}:
        </p>
        <p className={s.attributeValue}>
          <Link
            to="https://www.instagram.com/tortoviprikrasi_izmail?igsh=MTZoc2d5ZnI3eWZvMw=="
            className={s.link}
          >
            {languageDeterminer(LANGUAGE.contactsView.instagram.value)}
          </Link>
        </p>
      </div>
    </main>
  );
}
