import React from 'react';
//import styles from './OrderForm.scss';
import PropTypes from 'prop-types';
import OrderSummary from '../Ordersummary/OrderSummary.js';
import { Grid, Row, Col } from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption.js';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';


const sendOrder = (options, tripCost, tripId, tripName, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    tripName,
    countryCode,
    
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function (response) {
      return response.json();
    }).then(function (parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = (props) => (
  console.log('orderformProps', props),
  //console.log('tablepricing',pricing),
  <Grid>
    <Row>
      {pricing.map(option => 
        <Col md={4} key={option.id}>
          <OrderOption {...option}
            currentValue={props.options[option.id]}
            setOrderOption={props.setOrderOption} />
          {/*{console.log('eachOption', option)}*/}
        </Col>)}
      <Col xs={12}>
        <OrderSummary cost={props.tripCost} options={props.options}/>
      </Col>
      <Button onClick={() => sendOrder(props.options, props.tripCost, props.tripId, props.tripName, props.countryCode)}>
        Order now!</Button>
    </Row>
  </Grid>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  countryCode: PropTypes.string,
  tripName: PropTypes.string.isRequired,
};

export default OrderForm;