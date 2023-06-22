'use strict';

/**
 * exclusive router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::exclusive.exclusive');
