'use strict';

/**
 * organization controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::organization.organization');

'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitizeEntity } = require('strapi-utils');


module.exports = createCoreController('api::organization.organization', ({ strapi }) => ({

    async create(ctx){
        ctx.request.body.data.user = ctx.state.user.id;
        const entity = await strapi.service("api::organization.organization").create(ctx.request.body);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },
    
    async find(ctx){
        const entitries = await strapi.entityService.findMany("api::organization.organization", {
            filters: {
                "user": ctx.state.user.id
            },
        });
        const sanitizedEntity = await this.sanitizeOutput(entitries, ctx);

        return this.transformResponse(sanitizedEntity);
    },

}));
