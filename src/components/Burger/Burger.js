import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const burger = (props) => {
    // transformedIngredients = [[meat, meat], [salad, salad], ...]
    // reduce to: [meat, meat, salad, salad]

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
          return [...Array(props.ingredients[igKey])].map((elem, i) => {
              return <BurgerIngredient key={igKey+i} type={igKey} />;
          });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    
    // console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;