'use strict';

/**
 * live-update router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::live-update.live-update');
