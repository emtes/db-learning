const getBalance = async () => {
  const balInit = {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  };
  const req = await fetch('/user/bal', balInit);
  const balance = await req.json();
  return balance;
};

getBalance().then((balance) => {
  document.getElementById('uiBalance').innerText = balance.toFixed(2);
});

const buySharesForm = document.querySelector('form');
buySharesForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (await isValidTicker(buySharesForm.ticker.value)) {
    const buyingInit = {
      method: 'POST',
      headers: {
        token: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticker: buySharesForm.ticker.value.toUpperCase(),
        shares: buySharesForm.shares.value,
      }),
    };

    fetch('/buy', buyingInit)
      .then(() => {setTimeout(() => {
      window.location.reload();
    }, 2000)});
  } else {
    const errorEl = document.createElement('p');
    errorEl.innerText = 'Invalid ticker';
    errorEl.style.color = 'red';
    buySharesForm.appendChild(errorEl);
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }
});

async function isValidTicker(str) {
  try {
    const sandboxBaseUrl = 'https://sandbox.iexapis.com/stable';
    const priceOnlyPath = `/stock/${str}/price`;
    const testToken = '?token=Tpk_3e87e42fb0624c25b0eb806d21838b97';

    const req = await fetch(sandboxBaseUrl + priceOnlyPath + testToken);
    const res = await req.json();
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}
