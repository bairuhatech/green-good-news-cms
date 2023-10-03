'use strict';

/**
 * web-stories service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::web-stories.web-stories');
