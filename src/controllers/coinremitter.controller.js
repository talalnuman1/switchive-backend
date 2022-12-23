const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
var wallets = require('../config/walltes.json');

let getCoins = async () => {
  const response = await axios.get('https://coinremitter.com/api/v3/get-coin-rate', {
    headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
  });
  return response;
};

let createInvoiceFromCoinremmiter = async (data) => {
  const foundcoin = wallets.filter((wallets) => wallets.value === data.coin);

  const response = await axios.post(`https://coinremitter.com/api/v3/${data.coin}/create-invoice`, {
    api_key: foundcoin[0].key,
    password: '12345678n',
    amount: data.amount,
    expire_time: data.expire_time,
    suceess_url: data.suceess_url,
    fail_url: data.fail_url,
  });

  return response;
};

let getInvoiceFromCoinremmiter = async (data) => {
  const foundcoin = wallets.filter((wallets) => wallets.value === data.coin);

  const response = await axios.post(`https://coinremitter.com/api/v3/${data.coin}/get-invoice`, {
    api_key: foundcoin[0].key,
    password: '12345678n',
    invoice_id: data.invoice_id,
  });

  return response;
};
const getCoinRates = catchAsync(async (req, res) => {
  try {
    const responseFact = await getCoins();
    res.status(200).send(responseFact.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

const createInvoice = catchAsync(async (req, res) => {
  try {
    const responseFact = await createInvoiceFromCoinremmiter(req.body);
    res.status(200).send(responseFact.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getInvoice = catchAsync(async (req, res) => {
  try {
    const responseFact = await getInvoiceFromCoinremmiter(req.body);
    res.status(200).send(responseFact.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  getCoinRates,
  createInvoice,
  getInvoice,
};
