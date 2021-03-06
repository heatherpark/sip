import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutForm from './CheckoutForm/CheckoutForm';
import Drink from '../../components/Drink/Drink';
import * as actions from '../../store/actions';
import { Segment, Button, Modal, Message } from 'semantic-ui-react';

class Checkout extends Component {
  state = {
    checkoutConfirmed: false,
    checkoutCanceled: false,
    checkoutFormSubmitted: false
  };

  componentDidUpdate() {
    if (this.state.checkoutFormSubmitted 
      && this.state.checkoutConfirmed) {
      this.handleCheckoutFormSubmitted();
    }
  }

  handleCheckoutContinued = () => {
    this.setState({ checkoutConfirmed: true });
  };

  handleCheckoutCanceled = () => {
    this.props.onSetIsCustomizing(false);
    this.setState({ checkoutCanceled: true });
  };

  handleOrderSubmit = (event, checkoutForm) => {
    event.preventDefault();

    const checkoutFormData = {};

    for (let field in checkoutForm) {
      checkoutFormData[field] = checkoutForm[field].value;
    }

    const order = {
      drinkOrder: this.props.drinkOrder,
      price: this.props.price,
      customerInfo: checkoutFormData,
      userId: this.props.userId
    };

    this.setState({ checkoutFormSubmitted: true });
    this.props.onCheckOut(order, this.props.token);
  };

  handleCheckoutFormSubmitted = () => {
    this.setState({ checkoutConfirmed: false });
  };

  renderSubmitMessage(checkoutSuccessful) {
    return (
      <Message
        positive={checkoutSuccessful}
        negative={!checkoutSuccessful}>
        <Message.Header>
          {checkoutSuccessful ? 'Checkout succesful!' : 'Something went wrong!'}
        </Message.Header>
        <p>
          {checkoutSuccessful ? 'Your drink is on its way.' : 'Sorry, we couldn\'t process your order.'}
        </p>
      </Message>
    );
  }

  render() {
    return (
      <div>
        {this.state.checkoutCanceled ? <Redirect to="/" /> : null}

        {this.state.checkoutFormSubmitted 
          && this.props.checkedOut 
          ? this.renderSubmitMessage(!this.props.checkoutError) : null}

        {!this.state.checkoutFormSubmitted ? (
          <Segment.Group compact>
            <Segment>
              <Drink
                price={this.props.price}
                drinkOrder={this.props.drinkOrder} />
            </Segment>

            <Segment>
              <Modal
                trigger={<Button
                  primary
                  onClick={this.handleCheckoutContinued}>Check out</Button>}
                size="tiny">
                <CheckoutForm
                  checkingOut={this.props.checkingOut}
                  onOrderSubmit={this.handleOrderSubmit} />
              </Modal>
              <Button
                secondary
                onClick={this.handleCheckoutCanceled}>Cancel</Button>
            </Segment>
          </Segment.Group>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drinkOrder: state.drinkCustomizer.drinkOrder,
    price: state.drinkCustomizer.price,
    checkedOut: state.orders.checkedOut,
    checkingOut: state.orders.checkingOut,
    userId: state.auth.userId,
    token: state.auth.token,
    checkoutError: state.orders.checkoutError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckOut: (drinkOrder, token) => dispatch(actions.checkOut(drinkOrder, token)),
    onSetIsCustomizing: isCustomizing => dispatch(actions.setIsCustomizing(isCustomizing))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);