'use strict';

/**
 * entertainment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::entertainment.entertainment');
