'use strict';

/**
 * exclusive service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::exclusive.exclusive');
