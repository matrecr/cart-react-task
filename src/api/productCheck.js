export const productCheck = async (body) => {
    const raw = await fetch('http://localhost:3030/api/product/check', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await raw.json();
    return data;
};
