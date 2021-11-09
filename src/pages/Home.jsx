import React from "react";
import SortPopup from "../Components/SortPopup";
import Categories from "../Components/Categories";
import OnePizzaBlock from "../Components/OnePizzaBlock/OnePizzaBlock";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

import PizzaLoadingBlock from "../Components/OnePizzaBlock/PizzaLoading";

const catgoryPizzas = [
  "Мясная",
  "Вегетарианская",
  "Острая",
  "Закрытая",
  "Гриль",
];
const sortPopupPizzas = [
  { name: "популярности", type: "popular", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
  { name: "цене", type: "price", order: "desc" },
];
function Home() {
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const pizzaLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { sortBy, categories } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, categories));
  }, [categories, sortBy]);

  const dispatch = useDispatch();
  const setPizzascategories = React.useCallback((index) => {
    dispatch(setCategories(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const addPizzaToBasket = (obj) => {
    dispatch({
      type: "ADD_PIZZA_CART",
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={categories}
          onCategoriesClick={setPizzascategories}
          items={catgoryPizzas}
        />
        <SortPopup
          items={sortPopupPizzas}
          activeSortType={sortBy.type}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzaLoaded
          ? items.map((obj) => (
              <OnePizzaBlock
                onClickPizzaAddBut={addPizzaToBasket}
                key={obj.id}
                isLoading={true}
                inCartCount={
                  cartItems[obj.id] && cartItems[obj.id].items.length
                }
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
