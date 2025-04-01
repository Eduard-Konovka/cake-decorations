import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  useGlobalState,
  useChangeGlobalState,
  initialUser,
  updateUserProfile,
} from 'state';
import { Spinner, Button, Processing } from 'components';
import { getLanguage } from 'functions';
import { languageWrapper } from 'middlewares';
import { GLOBAL, LANGUAGE } from 'constants';
import s from './OrderingView.module.css';

export default function OrderingView({ sending, onSubmit }) {
  const { mainHeight, cart } = useGlobalState('global');
  const changeGlobalState = useChangeGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const totalCost = location.state?.totalCost;

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialUser);

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  const handleFirstNameChange = event => {
    setState(prevState => ({
      ...prevState,
      firstName: event.target.value.trim(),
    }));
  };

  const handleLastNameChange = event => {
    setState(prevState => ({
      ...prevState,
      lastName: event.target.value.trim(),
    }));
  };

  const handlePhoneChange = event => {
    setState(prevState => ({
      ...prevState,
      phone: event.target.value.trim(),
    }));
  };

  const handleLocalityChange = event => {
    setState(prevState => ({
      ...prevState,
      locality: event.target.value.trim(),
    }));
  };

  const handleDeliveryChange = event => {
    setState(prevState => ({
      ...prevState,
      delivery: event.target.value,
    }));
  };

  const handleAddressChange = event => {
    setState(prevState => ({
      ...prevState,
      address: event.target.value.trim(),
    }));
  };

  const handleLoginPress = async () => {
    setLoading(true);

    if (cart.length < 1) {
      navigate('/cart');
      toast.error(languageDeterminer(LANGUAGE.authorizationViews.alert.noCart));
      setLoading(false);
    } else if (!state.firstName || state.firstName === '') {
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
      await changeGlobalState(updateUserProfile, state);
      onSubmit(totalCost, state);
      navigate('/cart');
      setState(initialUser);
      setLoading(false);
    }
  };

  return (
    <main className={s.page} style={{ minHeight: mainHeight }}>
      {loading ? (
        <Spinner size={70} color="red" />
      ) : sending ? (
        <Processing />
      ) : (
        <section className={s.thumb}>
          <div className={s.authBox}>
            <Button
              title={languageDeterminer(
                LANGUAGE.authorizationViews.signInButton.title,
              )}
              type="button"
              typeForm="signin"
              styles={s.btn}
            >
              <Link to="/signin" className={s.btnLink}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.signInButton.text,
                )}
              </Link>
            </Button>

            <Button
              title={languageDeterminer(
                LANGUAGE.authorizationViews.signUpButton.title,
              )}
              type="button"
              typeForm="signin"
              styles={s.btn}
            >
              <Link to="/signup" className={s.btnLink}>
                {languageDeterminer(
                  LANGUAGE.authorizationViews.signUpButton.text,
                )}
              </Link>
            </Button>
          </div>

          <p className={s.title}>
            {languageDeterminer(LANGUAGE.authorizationViews.orderingTitle)}
          </p>

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

            <label htmlFor="delivery" className={s.label}>
              {languageDeterminer(LANGUAGE.authorizationViews.delivery.label)}
            </label>

            <select
              id="delivery"
              name="delivery"
              title={languageDeterminer(
                LANGUAGE.authorizationViews.delivery.title,
              )}
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
              className={s.input}
              onChange={handleAddressChange}
            />

            <Button
              title={languageDeterminer(
                LANGUAGE.authorizationViews.submitButton.title,
              )}
              type="button"
              typeForm="button"
              disabled={
                !state.firstName ||
                !state.lastName ||
                !state.phone ||
                !state.locality ||
                !state.address
              }
              onClick={handleLoginPress}
            >
              {languageDeterminer(
                LANGUAGE.authorizationViews.submitButton.text,
              )}
            </Button>
          </form>
        </section>
      )}
    </main>
  );
}

OrderingView.propTypes = {
  sending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
