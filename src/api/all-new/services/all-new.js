'use strict';

/**
 * all-new service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::all-new.all-new');
