import React from 'react';
import PropTypes from 'prop-types';
import s from './Container.module.css';

export default function Container({ children }) {
  return (
    <div id="container" className={s.container}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
