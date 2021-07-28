export const getCart = async () => {
    const raw = await fetch('http://localhost:3030/api/cart', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const res = await raw.json();
    return res;
};
