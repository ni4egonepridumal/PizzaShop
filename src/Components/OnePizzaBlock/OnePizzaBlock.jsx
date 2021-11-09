import React from "react";
import classNames from "classnames";
import Button from "../Button";

function OnePizzaBlock({
  id,
  name,
  imageUrl,
  price,
  types,
  sizes,
  onClickPizzaAddBut,
  inCartCount,
}) {
  const [pizzaSelectorActive, setPizzaSelectorActive] = React.useState(
    types[0]
  );
  const [sizePizza, setSizePizza] = React.useState(0);
  const typePizza = ["тонкое", "традиционное"];
  const pizzaSize = [26, 30, 40];
  const isActivePizzaSelector = (index) => {
    setPizzaSelectorActive(index);
  };
  const isActivePizzaSize = (index) => {
    setSizePizza(index);
  };
  const handleAddPizza = () => {
    const obj = {
      id,
      name,
      imageUrl,
      price,
      size: pizzaSize[sizePizza],
      type: typePizza[pizzaSelectorActive],
    };
    onClickPizzaAddBut(obj);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {typePizza.map((item, index) => (
            <li
              key={index}
              className={classNames({
                active: pizzaSelectorActive === index,
                disabled: !types.includes(index),
              })}
              onClick={() => isActivePizzaSelector(index)}
            >
              {item}
            </li>
          ))}
        </ul>
        <ul>
          {pizzaSize.map((item, index) => (
            <li
              key={item}
              className={classNames({
                active: sizePizza === index,
                disabled: !sizes.includes(item),
              })}
              onClick={() => isActivePizzaSize(index)}
            >
              {item} cm
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} p</div>
        <Button
          onClickOnButToAddPizza={handleAddPizza}
          inCartCount={inCartCount}
        />
      </div>
    </div>
  );
}

export default OnePizzaBlock;
