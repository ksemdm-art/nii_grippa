'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitizeEntity } = require('strapi-utils');


module.exports = createCoreController('api::order.order', ({ strapi }) => ({

    async create(ctx){
        ctx.request.body.data.user = ctx.state.user.id;
        const entity = await strapi.service("api::order.order").create(ctx.request.body);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },
    
    async find(ctx){
        const entitries = await strapi.entityService.findMany("api::order.order", {
            filters: {
                "user": ctx.state.user.id
            },
            populate: '*'
        });
        const sanitizedEntity = await this.sanitizeOutput(entitries, ctx);

        return this.transformResponse(sanitizedEntity);
    },

}));
