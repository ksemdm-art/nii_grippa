'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitizeEntity } = require('strapi-utils');

// const {sanitizEntity} = require('strapi-utils');
// module.exports = createCoreController('api::order.order');

module.exports = createCoreController('api::order.order', ({ strapi }) => ({

    // async create(ctx){
    //     // const order = ctx.request.body;
    //     // const entity = await strapi.service("api::order.order").create(ctx.request.body);
    //     // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    //     // return this.transformResponse(sanitizedEntity);

    //     // let entity;

    //     // entity = await strapi.services.order.create(order);
    //     // return sanitizeEntity(entity, {model: strapi.models.order});

    //     const { id } = ctx.params;
    //     const { query } = ctx.state.user;
    //     const entity = await strapi.service("api::order.order").create(id, query);
    //     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    //     return this.transformResponse(sanitizedEntity);


    // },
    
    async find(ctx){
        // let entities;
        // let query = {... ctx.query}
        // query.user = ctx.state.user.id
        // entities = await strapi.service('api::order.order').find(query);
        // const sanitizedEntity = await this.sanitizeOutput(entities, ctx);
        // return this.transformResponse(sanitizedEntity);

        // const { id } = ctx.params;
        // const { query } = ctx;
        // const entity = await strapi.service('api::order.order').findOne(id, query);
        // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        // return this.transformResponse(sanitizedEntity);

        // ctx.query = {... ctx.query}
        // const {data, meta} = await super.find(ctx);
        // meta.user = ctx.state.user.id

        // return {data, meta}
        const { id } = ctx.params;
        const { query } = ctx.state.user.id;
        const entity = await strapi.service("api::order.order").find(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    }
}));
