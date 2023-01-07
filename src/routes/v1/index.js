const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const cartRoute = require('./cart.route');
const orderRoute = require('./order.route');
const switchiveGiftCardRoute = require('./switchiveGiftCard.route');
const coinremitterRoute = require('./coinremitter.route');
const formula = require('./formula.route');
const blog = require('./blog.route');
const wishList = require('./wishLIst.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const wallet = require('./wallet.route');
const redeem = require('./redeem.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/cart',
    route: cartRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/cards',
    route: switchiveGiftCardRoute,
  },
  {
    path: '/coinremitter',
    route: coinremitterRoute,
  },
  {
    path: '/formula',
    route: formula,
  },
  {
    path: '/wishlist',
    route: wishList,
  },
  {
    path: '/blog',
    route: blog,
  },
  {
    path: '/wallet',
    route: wallet,
  },
  {
    path: '/redeem',
    route: redeem,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
