import React, {
  useState,
  useMemo,
  useEffect,
  useCallback
} from 'react';

import CartQuantity from './CartQuantity/CartQuantity';
import ErrorHandler from '../ErrorHandler/ErrorHandler'

import { moneyFormatter, sumCart } from '../../utils';
import { getCart } from '../../api';

import './App.css';

const App = () => {
  const [summarizedCost, setSummarizedCost] = useState(0);
  const [cart, setCart] = useState();
  const [error, setError] = useState()

  const fetchApi = useCallback(async () => {
    try{
      const cartData = await getCart();
      const summarizedCart = sumCart(cartData);
      setSummarizedCost(summarizedCart);
      setCart(cartData);
    } catch(e){
      setError({isError:true, errorMessage: 'Wystąpił nieoczekiwany błąd prosze spróbować później'})
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  const memoizedCartList = useMemo(() => (
    cart ? (
      <ul>
        {cart.map((el) => (
          <li key={el.pid} className="row">
            {el.name}, cena: {moneyFormatter(el.price)}
            <CartQuantity
              {...el}
              setError={setError}
              sum={setSummarizedCost}
            />
          </li>
        ))}
      </ul>
    ) : <span>Ładowanie listy</span>

  ), [cart]);

  return (
    <div className="container">
      {error ? <ErrorHandler {...error} /> :
        <>
          <h3>Lista produktów</h3>
          {memoizedCartList}
          {cart && (
            <div>
              Suma: {moneyFormatter(summarizedCost)}
            </div>
          )}
        </>
      }
    </div>
  );
};

export { App };
