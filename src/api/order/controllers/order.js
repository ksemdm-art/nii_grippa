'use strict';

var fs = require('fs');

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
        const partPath = "D:/coding/testingFiles/"
        const sanitizedEntity = await this.sanitizeOutput(entitries.map(el => {
            el.results.map(file => {
                try {
                    const fs = require('fs')
                    const contents = fs.readFileSync(partPath + file.fileName, { encoding: 'base64' })
                    const fileExt = file.fileName.split(".")[1].toLowerCase()
                    if(fileExt == "csv"){
                        file.fileName = "data:text/plain;charset=UTF-8;base64," + contents
                    }

                    if(fileExt == "xls"){
                        file.fileName = "data:application/vnd.ms-excel;base64," + contents
                    }

                    if(fileExt == "xlsx"){
                        file.fileName = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + contents
                    }

                    
                }
                catch (e) {
                    console.log(e)
                }
                return file
            })
            return el
        }), ctx);


        // const partPath = "D:/coding/testingFiles/"

        // try {
        //     const result = fs.readFileSync(fileName, { encoding: "utf-8" });

        //     console.log(result);
        //   } catch (err) {
        //     console.error(err);
        //   }

        return this.transformResponse(sanitizedEntity);
    },

}));
