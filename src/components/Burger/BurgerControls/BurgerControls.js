import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';

import classes from './BurgerControls.module.css';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'}
];

const burgerControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BurgerControl 
                    key={control.label}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabledInfo[control.type]}
                    />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}>Order Now</button>
        </div>
    );
};

export default burgerControls;
