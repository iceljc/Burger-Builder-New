import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import {connect} from "react-redux";
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';


// const INGREDIENT_PRICES = {
// 	salad: 0.5,
// 	cheese: 0.4,
// 	meat: 1.3,
// 	bacon: 0.7
// };

class BurgerBuilder extends Component {
    // constructor(props) {
	// 	super(props);
	// 	this.state = {};
    // }
    
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchaseable: false,
        purchasing: false, // true to show UI modal
        // error: false
    };

    // load ingredients from database
    componentDidMount () {
        // axios.get("https://burger-builder-react-ljc-default-rtdb.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
        // console.log('build did mount');
        this.props.onInitIngredients();
    }


    updatePurchaseState = (ingredients) => {
        // add the total amount of each ingredient
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // this.setState({purchaseable: sum > 0});
        return sum > 0;
    }


    purchaseHandler = () => {
		this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase(); // set purchased to false
        this.props.history.push({pathname: '/checkout'});
    }
    
    



    render() {
        // console.log("build renders 1", this.props.ings);
        const disabledInfo = {
			...this.props.ings
        };
        // disabledInfo = {meat: true, salad: false, ...}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            // console.log("build renders 2");
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                        ingredients={this.props.ings}
                        price={this.props.price}
                        purchaseContinued={this.purchaseContinueHandler}
                        purchaseCancelled={this.purchaseCancelHandler} />
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }; 
}; 

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (igName) => dispatch(actionCreators.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actionCreators.removeIngredient(igName)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit())
    };
}

// export default BurgerBuilder;
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));