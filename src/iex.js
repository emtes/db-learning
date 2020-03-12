const fetch = require('node-fetch');

const getTickerPrice = async (ticker) => {
  const sandboxBaseUrl = 'https://sandbox.iexapis.com/stable/';
  const priceOnlyPath = `/stock/${ticker}/price`;
  const testToken = '?token=Tpk_3e87e42fb0624c25b0eb806d21838b97';

  const req = await fetch(sandboxBaseUrl + priceOnlyPath + testToken);
  const json = await req.json();
  return json;
};

module.exports = getTickerPrice;
