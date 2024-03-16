'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'businessHours',
    plugin: 'strapi-business-hours',
    type: 'json',
  })
};
