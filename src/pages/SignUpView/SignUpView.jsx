import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  initialUser,
  useGlobalState,
  useChangeGlobalState,
  authSignUpUser,
} from 'state';
import { Spinner, Button } from 'components';
import { getLanguage } from 'functions';
import { languageWrapper } from 'middlewares';
import { GLOBAL, LANGUAGE } from 'constants';
import avatar from 'assets/avatar.png';
import s from './SignUpView.module.css';

export default function SignUpView() {
  const { mainHeight } = useGlobalState('global');
  const changeGlobalState = useChangeGlobalState();
  const initialState = { ...initialUser, password: '' };

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

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

  const handleAddressChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      address: value,
    }));
  };

  const handlePostDeliveryChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      delivery: value,
    }));
  };

  const handleEmailChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      email: value,
    }));
  };

  const handlePasswordChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      password: value,
    }));
  };

  const handleLoginPress = () => {
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
    } else if (!state.delivery || state.delivery === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noDelivery),
      );
      setLoading(false);
    } else if (!state.email || state.email === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noEmail),
      );
      setLoading(false);
    } else if (!state.password || state.password === '') {
      toast.error(
        languageDeterminer(LANGUAGE.authorizationViews.alert.noPassword),
      );
      setLoading(false);
    } else {
      changeGlobalState(authSignUpUser, {
        user: state,
        errorTitle: languageDeterminer(
          LANGUAGE.authorizationViews.alert.authSignInUser,
        ),
      });
      setState(initialState);
      setLoading(false);
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
              className={s.input}
              onChange={handleLocalityChange}
            />

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
              className={s.input}
              onChange={handleAddressChange}
            />

            <label htmlFor="delivery" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.delivery.label)}
            </label>

            <input
              id="delivery"
              name="delivery"
              type="text"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.delivery.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.common.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.delivery.placeholder,
              )}
              autoComplete="family-name"
              minLength={GLOBAL.inputs.common.minLength}
              maxLength={GLOBAL.inputs.common.maxLength}
              className={s.input}
              onChange={handlePostDeliveryChange}
            />

            <label htmlFor="email" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.email.label)}
            </label>

            <input
              id="email"
              name="email"
              type="email"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.email.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.email.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.email.placeholder,
              )}
              autoComplete="email"
              className={s.input}
              onChange={handleEmailChange}
            />

            <label htmlFor="password" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.password.label)}
            </label>

            <input
              id="password"
              name="password"
              type="password"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.password.title,
              )}
              pattern={languageDeterminer(GLOBAL.inputs.password.pattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.password.placeholder,
              )}
              autoComplete="current-password"
              minLength={GLOBAL.inputs.password.minLength}
              maxLength={GLOBAL.inputs.password.maxLength}
              className={s.input}
              onChange={handlePasswordChange}
            />

            <Button
              title={languageDeterminer(
                LANGUAGE.authorizationViews.signUpButton.title,
              )}
              type="button"
              typeForm="signin"
              disabled={
                state.password.length < GLOBAL.inputs.password.minLength ||
                state.password.length > GLOBAL.inputs.password.maxLength
              }
              onClick={handleLoginPress}
            >
              {state.email.length > 5 &&
              state.password.length >= GLOBAL.inputs.password.minLength &&
              state.password.length <= GLOBAL.inputs.password.maxLength ? (
                <Link to="/categories" className={s.btnLink}>
                  {languageDeterminer(
                    LANGUAGE.authorizationViews.signUpButton.text,
                  )}
                </Link>
              ) : (
                <p className={s.btnLink}>
                  {languageDeterminer(
                    LANGUAGE.authorizationViews.signUpButton.text,
                  )}
                </p>
              )}
            </Button>

            <p className={s.separator}>
              {languageDeterminer(LANGUAGE.authorizationViews.separator)}
            </p>

            <Button
              title={languageDeterminer(
                LANGUAGE.authorizationViews.signInButton.title,
              )}
              type="button"
              typeForm="signin"
            >
              <Link to="/signin" className={s.btnLink}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.signInButton.text,
                )}
              </Link>
            </Button>
          </form>
        </section>
      )}
    </main>
  );
}
