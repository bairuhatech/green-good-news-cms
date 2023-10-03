'use strict';

/**
 * editorial service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::editorial.editorial');
