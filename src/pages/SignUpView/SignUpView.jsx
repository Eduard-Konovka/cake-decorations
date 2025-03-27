import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGlobalState,
  useChangeGlobalState,
  updateUser,
  authSignInUser,
  authStateChangeUser,
} from 'state';
import { Spinner, Button } from 'components';
import { getLanguage, saveProfileToDatabase } from 'functions';
import { languageWrapper } from 'middlewares';
import { GLOBAL, LANGUAGE, LOGIN } from 'constants';
import avatar from 'assets/avatar.png';
import s from './SignUpView.module.css';

const initialState = {
  username: '',
  email: '',
  password: '',
};

export default function SignUpView() {
  const { mainHeight } = useGlobalState('global');
  const changeGlobalState = useChangeGlobalState();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  const handleNameChange = event => {
    const value = event.target.value.trim();

    setState(prevState => ({
      ...prevState,
      username: value,
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

    if (!state.email || state.email === '') {
      toast.error(
        `${languageDeterminer(LOGIN.alert.noEmail.title)}: 
        ${languageDeterminer(LOGIN.alert.noEmail.description)}`,
      );
      setState(initialState);
      setLoading(false);
    } else if (!state.password || state.password === '') {
      toast.error(
        `${languageDeterminer(LOGIN.alert.noPassword.title)}:
        ${languageDeterminer(LOGIN.alert.noPassword.description)}`,
      );
      setState(initialState);
      setLoading(false);
    } else {
      changeGlobalState(authStateChangeUser);
      changeGlobalState(updateUser, { name: state.email });
      changeGlobalState(authSignInUser, {
        user: state,
        errorTitle: languageDeterminer(LOGIN.alert.authSignInUser),
      });
      saveProfileToDatabase();
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
            <label htmlFor="username" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.username)}
            </label>

            <input
              id="username"
              name="username"
              type="text"
              title={languageDeterminer(LANGUAGE.authorizationViews.inputTitle)}
              pattern={languageDeterminer(GLOBAL.signInViewPattern)}
              placeholder={languageDeterminer(
                LANGUAGE.authorizationViews.inputPlaceholder,
              )}
              autoComplete="given-name family-name"
              minLength={GLOBAL.signInViewInput.minLength}
              maxLength={GLOBAL.signInViewInput.maxLength}
              className={s.input}
              onChange={handleNameChange}
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
                LANGUAGE.authorizationViews.signUpButton.title,
              )}
              type="button"
              typeForm="signin"
            >
              <Link to="/signup" className={s.btnLink}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.signUpButton.text,
                )}
              </Link>
            </Button>
          </form>
        </section>
      )}
    </main>
  );
}
