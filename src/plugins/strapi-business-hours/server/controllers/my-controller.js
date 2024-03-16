'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-business-hours')
      .service('myService')
      .getWelcomeMessage();
  },
});
