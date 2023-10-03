'use strict';

/**
 * live-update service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::live-update.live-update');
