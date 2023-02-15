const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
})

// const { defineConfig } = require('@vue/cli-service')

// const fs = require('fs');

// module.exports = defineConfig({
//   transpileDependencies: true,

//   devServer: {
//     host: 'gen.influenza.spb.ru',
//     port: 8082,
//      https: {
//         key: fs.readFileSync('/var/www/gen/ssl.key'),
//         cert: fs.readFileSync('/var/www/gen/ssl.crt'),
//       },
//     allowedHosts: 'all',
//   }


// })


