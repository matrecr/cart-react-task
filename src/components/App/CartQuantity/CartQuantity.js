import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { debounce } from 'lodash';

import { productCheck } from '../../../api';
import errorDictionary from '../../../dictionary/error.js'

const CartQuantity = ({
  min,
  max,
  isBlocked=false,
  pid,
  price,
  sum,
  setError
}) => {
  const [quantity, setQuantity] = useState(min);
  const isFetching = useRef(false);

  const debouncedProductCheck = useCallback(debounce(async () => {
    if (!isFetching.current) {
    try{
      isFetching.current = true;
      const dbProductStatus = await productCheck({ pid, quantity });
      if (dbProductStatus.isError) {
        sum((prev) => prev += (1 - quantity) * price);
        setQuantity(min);
        console.error(errorDictionary.pl[dbProductStatus.errorType])
      }
      isFetching.current = false;
    } catch(e){
      setError({isError:true, errorMessage:'Pojawił się niespodziewany błąd, spróbuj ponownie później'})
    }}
  },500), [quantity]);

  useEffect(() => {
    if (quantity !== min) {
        debouncedProductCheck();
    }
    return () => {
      debouncedProductCheck.cancel();
      isFetching.current = false;
    };
  }, [quantity]);

  const handleQuantity = (type) => {
    if (!isFetching.current) {
      switch (type) {
        case 'INCREMENT':
          if (quantity < max) {
            setQuantity(quantity + 1);
            sum((prev) => prev + Number(price));
          }
          break;
        case 'DECREMENT':
          if (quantity > min) {
            setQuantity(quantity - 1);
            sum((prev) => prev - Number(price));
          }
          break;
        default:
          return
      }
    }
  };

  return (
    <div style={{ display: 'inline-block', float: 'right' }}>
      <button
        disabled={isBlocked}
        onClick={() => {
          handleQuantity('INCREMENT');
        }}
      > +
      </button>
      <span>
        Obecnie masz {quantity} sztuk produktu
      </span>
      <button onClick={() => handleQuantity('DECREMENT')} disabled={isBlocked}>-</button>
    </div>
  );
};

export default CartQuantity;
