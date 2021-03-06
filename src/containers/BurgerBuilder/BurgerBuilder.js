import React, {Component} from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
      salad: 3,
      cheese: 4,
      meat: 8,
      bacon: 9
}

class BurgerBuilder extends Component {
    state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 20,
      purchaseable: false,
      purchasing: false
    }

    updatePurchaseState (ingredients) {
        const numberOfIngredients = Object.keys(ingredients)
                                          .map(key => {
                                             return ingredients[key]
                                          })
                                          .reduce((sum, el) => {
                                            return sum + el;
                                          },0);
        this.setState({purchaseable: numberOfIngredients > 0 });
    }
    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
          ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
      if(this.state.ingredients[type] > 0){
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredients = {
              ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
      }
    }

    purchaseHandler = () => {
      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
      alert('You continue!')
    }

    render() {
      const disabledInfo = {
          ...this.state.ingredients
      };
      for (let key in disabledInfo) {
          disabledInfo[key] = disabledInfo[key] <= 0
      }
      return(
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary
                      total={this.state.totalPrice}
                      purchaseCancelled={this.purchaseCancelHandler}
                      purchaseContinued={this.purchaseContinueHandler}
                      ingredients={this.state.ingredients}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/>
         </Aux>
      );
    }
}
export default BurgerBuilder;
