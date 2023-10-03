'use strict';

/**
 * tech-new service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tech-new.tech-new');
