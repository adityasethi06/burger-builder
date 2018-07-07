import React, {Component} from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
      salad: 3,
      cheese: 4,
      meat: 8,
      bacon: 9
}

class BurgerBuilder extends Component {
    state = {
      ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 0,
        meat: 0
      },
      totalPrice: 20
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
          ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
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
      }
    }


    render() {
      return(
         <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}/>
         </Aux>
      );
    }
}
export default BurgerBuilder;
