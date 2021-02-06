import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
// import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {

    // when use "componentDidMount", need to initialize this.state.ingredients
    // no longer needed when using redux
    // UNSAFE_componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         price: price
    //     });
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        // let content = CheckoutSummary and Route;

        // if (this.state.ingredients) {
        //     content = <Spinner />;
        // }

        let summary = <Redirect to="/" />
        if (this.props.ings) {
            // when finish purchase, redirect to the font page
            const redirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {redirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        />
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            );
        }

        return summary;
    };
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);