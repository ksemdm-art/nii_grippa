'use strict';

/**
 * service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service.service');


// const { createCoreController } = require('@strapi/strapi').factories;
// const { sanitizeEntity } = require('strapi-utils');


// module.exports = createCoreController('api::service.service', ({ strapi }) => ({

//     async create(ctx){
        
//         const entity = await strapi.service("api::service.service").create(ctx.request.body);
//         const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

//         return this.transformResponse(sanitizedEntity);
//     },
    
//     async findOne(ctx){
//         console.log("Context ", ctx.params)
//         const entitries = await strapi.entityService.findMany("api::service.service", {
//             filters: {
//                 "order": ctx.params.id
//             },
//         });
//         const sanitizedEntity = await this.sanitizeOutput(entitries, ctx);

//         return this.transformResponse(sanitizedEntity);
//     },

// }));
