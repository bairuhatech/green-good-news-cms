'use strict';

/**
 * exclusive controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::exclusive.exclusive');
