import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionText = ({ defaultValue }) => (
  <div>
    <input
      className={styles.input}
      type='text'
      value={defaultValue}>
    </input>
  </div>
);

OrderOptionText.propTypes = {
  defaultValue: PropTypes.node,
  
};

export default OrderOptionText;