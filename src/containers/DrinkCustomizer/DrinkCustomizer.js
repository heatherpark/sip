import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drink from '../../components/Drink/Drink';
import CustomizerOptions from '../../components/CustomizerOptions/CustomizerOptions';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import * as actions from '../../store/actions';

export class DrinkCustomizer extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.initDrinkCustomizer();
  }

  handlePurchase = () => {
    this.setState({ purchasing: true });
  };

<<<<<<< HEAD
  handlePlaceOrderCanceled = () => {
    this.setState({ purchasing: false });
  };

  handlePlaceOrderContinued = () => {
    // this.props.on
  };

||||||| merged common ancestors
=======
  handlePurchaseCanceled = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContinued = () => {
    // this.props.on
  };

>>>>>>> 4b660446de26d93fa80c9791a7705cecde7d5f60
  handleRemoveAddOn = (addOn, price) => {
    const addOnQuantity = this.props.drinkOrder.addOns[addOn];

    if (addOnQuantity > 0) {
      this.props.removeAddOn(addOn, price);
    }
  }

  renderCustomizer() {
    return (
      <React.Fragment>
        <Modal showModal={this.state.purchasing}>
<<<<<<< HEAD
          <OrderSummary
          onPlaceOrderCanceled={this.handlePlaceOrderCanceled}
          onPlaceOrderContinued={this.handlePlaceOrderContinued} />
||||||| merged common ancestors
          Modal content
=======
          <OrderSummary
          onPurchaseCanceled={this.handlePurchaseCanceled}
          onPurchaseContinued={this.handlePurchaseContinued} />
>>>>>>> 4b660446de26d93fa80c9791a7705cecde7d5f60
        </Modal>
        <Drink
          drinkOrder={this.props.drinkOrder}
          price={this.props.price} />
        <CustomizerOptions
          onPurchase={this.handlePurchase}
          drinkOrder={this.props.drinkOrder}
          chooseBase={this.props.chooseBase}
          removeAddOn={this.handleRemoveAddOn}
          addAddOn={this.props.addAddOn}
          chooseIceOrSugarLevel={this.props.chooseIceOrSugarLevel}
          drinkOptions={this.props.drinkOptions} />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        {this.props.drinkOptions ? this.renderCustomizer() : 'Loading options'}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drinkOptions: state.drinkOptions,
    drinkOrder: state.drinkOrder,
    price: state.price
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addAddOn: (addOn, price) => dispatch(actions.addAddOn(addOn, price)),
    chooseBase: (baseType, base, price) => dispatch(actions.chooseBase(baseType, base, price)),
    chooseIceOrSugarLevel: (item, level) => dispatch(actions.chooseIceOrSugarLevel(item, level)),
    initDrinkCustomizer: () => dispatch(actions.initDrinkCustomizer()),
    removeAddOn: (addOn, price) => dispatch(actions.removeAddOn(addOn, price))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrinkCustomizer);