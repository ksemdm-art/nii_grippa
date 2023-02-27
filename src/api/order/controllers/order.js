'use strict';

var fs = require('fs');
const cryptr = require('cryptr');

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitizeEntity } = require('strapi-utils');


module.exports = createCoreController('api::order.order', ({ strapi }) => ({

    async create(ctx) {
        ctx.request.body.data.user = ctx.state.user.id;
        const entity = await strapi.service("api::order.order").create(ctx.request.body);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    async find(ctx) {
        const entitries = await strapi.entityService.findMany("api::order.order", {
            filters: {
                "user": ctx.state.user.id
            },
            populate: '*'
        });
        console.log(entitries)
        const sanitizedEntity = await this.sanitizeOutput(entitries.map(el => {
            el.results.map(file => {
                try {
			const cr = new cryptr(process.env.FILE_SECRET_KEY);
			const fn = file.fileName;
			file.fileName = {name:"", hash:""};
			file.fileName.name = fn;
			file.fileName.hash = cr.encrypt(fn);
                }
                catch (e) {
                    console.log(e)
                }
                return file
            })
            return el
        }), ctx);


        return this.transformResponse(sanitizedEntity);
    },

}));
