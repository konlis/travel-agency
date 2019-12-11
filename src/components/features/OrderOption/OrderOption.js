import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionNumber from './OrderOptionsNumber';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionDate from './OrderOptionDate';
import OrderOptionText from './OrderOptionText';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

const OrderOption = ({ name, type, id, setOrderOption,...otherProps }) => {
  
    
  const OptionComponent = optionTypes[type];
  if (!OptionComponent) {
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          setOptionValue={value  =>  setOrderOption({ [id]: value })}
          {...otherProps}
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  title: PropTypes.string,
};

export default OrderOption;