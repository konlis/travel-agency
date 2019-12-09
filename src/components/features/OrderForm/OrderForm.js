import React from 'react';
import PropTypes from 'prop-types';
import OrderSummary from '../Ordersummary/OrderSummary.js';
import { Grid, Row, Col } from 'react-flexbox-grid';

const OrderForm = (props) => (
  //console.log('orderformProps', props),
  <Grid>
    <Row>
      <Col xs={12}>
        <OrderSummary cost={props.tripCost} options={props.options}/>
      </Col>
    </Row>
  </Grid>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;