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
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
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

// Owned Stocks Updates
const getUserStocks = async () => {
  const stocksInit = {
    method: 'POST',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  };
  const req = await fetch('/transactions/stocks', stocksInit);
  const json = await req.json();
  return json;
};

const paintPortfolio = async (tableBodyId) => {
  const stocksData = await getUserStocks();
  const cleanStockData = stocksData.map((stock) => ({
    ticker: stock.ticker,
    quantity: stock.quantity,
  }));
  const tableBody = document.getElementById(tableBodyId);
  for (let i = 0; i < cleanStockData.length; i++) {
    const row = document.createElement('tr');
    for (const prop in cleanStockData[i]) {
      const data = document.createElement('td');
      data.innerText = cleanStockData[i][prop];
      row.appendChild(data);
    }
    const priceDat = document.createElement('td');
    priceDat.innerText = 'Loading..';
    priceDat.setAttribute('id', cleanStockData[i].ticker);
    priceDat.setAttribute('class', 'priceData');
    row.appendChild(priceDat);
    tableBody.appendChild(row);
  }
};

paintPortfolio('portfolio');

const intervalPriceUpdate = window.setInterval(updatePriceData, 6000, 'priceData');

async function updatePriceData(className) {
  const priceFields = document.querySelectorAll(`.${className}`);
  for (const field of priceFields) {
    const ticker = field.id;
    const openingPrice = await getStockOpeningPrice(ticker);
    const price = await getStockPrice(ticker);
    field.style.color = openingPrice > price ? 'green' : 'red';
    field.innerText = `$${price}`;
  }
}

async function getStockPrice(ticker) {
  try {
    const sandboxBaseUrl = 'https://sandbox.iexapis.com/stable';
    const priceOnlyPath = `/stock/${ticker}/price`;
    const testToken = '?token=Tpk_3e87e42fb0624c25b0eb806d21838b97';
    const req = await fetch(sandboxBaseUrl + priceOnlyPath + testToken);
    const price = await req.json();
    return price;
  } catch (err) {
    console.warn('Error fetching ticker price.', err);
  }
}

async function getStockOpeningPrice(ticker) {
  try {
    const sandboxBaseUrl = 'https://sandbox.iexapis.com/stable';
    // quote can have open be null, previous day's is most reliable
    const openingPricePath = `/stock/${ticker}/previous`;
    const testToken = '?token=Tpk_3e87e42fb0624c25b0eb806d21838b97';
    const req = await fetch(sandboxBaseUrl + openingPricePath + testToken);
    const json = await req.json();
    return json.open;
  } catch (err) {
    console.warn('Error fetching ticker opening price.', err);
  }
}