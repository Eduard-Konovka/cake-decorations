import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGlobalState,
  useChangeGlobalState,
  authReSignUpUser,
  authSignOutUser,
} from 'state';
import { Spinner, Button } from 'components';
import { getLanguage } from 'functions';
import { languageWrapper } from 'middlewares';
import { GLOBAL, LANGUAGE } from 'constants';
import { auth } from 'db';
import avatar from 'assets/avatar.png';
import s from './ReSignUpView.module.css';

export default function ReSignUpView() {
  const navigate = useNavigate();
  const { mainHeight } = useGlobalState('global');
  const { user } = useGlobalState('auth');
  const changeGlobalState = useChangeGlobalState();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(user);

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  const handleFirstNameChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      firstName: value,
    }));
  };

  const handleLastNameChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      lastName: value,
    }));
  };

  const handlePhoneChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      phone: value,
    }));
  };

  const handleLocalityChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      locality: value,
    }));
  };

  const handleDeliveryChange = event => {
    const value = event.target.value;

    setState(prevState => ({
      ...prevState,
      delivery: value,
    }));
  };

  const handleAddressChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      address: value,
    }));
  };

  const signUpHendler = () => {
    setLoading(true);

    if (!state.firstName || state.firstName === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noFirstName),
      );
      setLoading(false);
    } else if (!state.lastName || state.lastName === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noLastName),
      );
      setLoading(false);
    } else if (!state.phone || state.phone === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noPhone),
      );
      setLoading(false);
    } else if (!state.locality || state.locality === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noLocality),
      );
      setLoading(false);
    } else if (!state.address || state.address === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noAddress),
      );
      setLoading(false);
    } else {
      changeGlobalState(authReSignUpUser, {
        user: state,
        errorTitle: languageDeterminer(
          LANGUAGE.authorizationViews.alert.authSignInUser,
        ),
      });
      setState(user);
      setLoading(false);
    }
  };

  const signInHendler = () => {
    if (auth?.currentUser) {
      changeGlobalState(authSignOutUser);
      setState(user);
      navigate('/');
    } else {
      navigate('/signin');
    }
  };

  return (
    <main className={s.page} style={{ minHeight: mainHeight }}>
      {loading ? (
        <Spinner size={70} color="red" />
      ) : (
        <section className={s.thumb}>
          <img src={avatar} alt="avatar" className={s.avatar} />

          <form className={s.form}>
            <label htmlFor="firstName" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.firstName.label)}
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.firstName.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.common.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.firstName.placeholder,
              )}
              autoComplete="given-name"
              minLength={GLOBAL.inputs.common.minLength}
              maxLength={GLOBAL.inputs.common.maxLength}
              value={state.firstName}
              className={s.input}
              onChange={handleFirstNameChange}
            />

            <label htmlFor="lastName" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.lastName.label)}
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.lastName.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.common.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.lastName.placeholder,
              )}
              autoComplete="family-name"
              minLength={GLOBAL.inputs.common.minLength}
              maxLength={GLOBAL.inputs.common.maxLength}
              value={state.lastName}
              className={s.input}
              onChange={handleLastNameChange}
            />

            <label htmlFor="phone" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.phone.label)}
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.phone.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.phone.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.phone.placeholder,
              )}
              autoComplete="tel"
              minLength={GLOBAL.inputs.phone.minLength}
              maxLength={GLOBAL.inputs.phone.maxLength}
              value={state.phone}
              className={s.input}
              onChange={handlePhoneChange}
            />

            <label htmlFor="locality" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.locality.label)}
            </label>

            <input
              id="locality"
              name="locality"
              type="text"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.locality.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.common.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.locality.placeholder,
              )}
              autoComplete="family-name"
              minLength={GLOBAL.inputs.common.minLength}
              maxLength={GLOBAL.inputs.common.maxLength}
              value={state.locality}
              className={s.input}
              onChange={handleLocalityChange}
            />

            <label htmlFor="delivery" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.delivery.label)}
            </label>

            <select
              id="delivery"
              name="delivery"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.delivery.title,
              )}
              value={state.delivery}
              className={s.input}
              onChange={handleDeliveryChange}
            >
              <option value={'branch'}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.delivery.branch,
                )}
              </option>

              <option value={'mailbox'}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.delivery.mailbox,
                )}
              </option>

              <option value={'courier'}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.delivery.courier,
                )}
              </option>
            </select>

            <label htmlFor="address" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.address.label)}
            </label>

            <input
              id="address"
              name="address"
              type="text"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.address.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.common.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.address.placeholder,
              )}
              autoComplete="family-name"
              minLength={GLOBAL.inputs.common.minLength}
              maxLength={GLOBAL.inputs.common.maxLength}
              value={state.address}
              className={s.input}
              onChange={handleAddressChange}
            />

            <Button
              title={languageDeterminer(
                LANGUAGE.authorizationViews.reSignUpButton.title,
              )}
              type="button"
              typeForm="signin"
              onClick={signUpHendler}
            >
              <Link to="/categories" className={s.btnLink}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.reSignUpButton.text,
                )}
              </Link>
            </Button>

            <p className={s.separator}>
              {languageDeterminer(LANGUAGE.authorizationViews.separator)}
            </p>

            <Button
              title={
                !auth?.currentUser
                  ? languageDeterminer(LANGUAGE.appBar.signIn.title)
                  : languageDeterminer(LANGUAGE.appBar.signOut.title)
              }
              type="button"
              typeForm="signin"
              onClick={signInHendler}
            >
              {!auth?.currentUser
                ? languageDeterminer(LANGUAGE.appBar.signIn.text)
                : languageDeterminer(LANGUAGE.appBar.signOut.text)}
            </Button>
          </form>
        </section>
      )}
    </main>
  );
}
