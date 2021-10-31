// module.exports = {
//   devServer: {
//     proxy: {
//       '/emp': {
//         target: 'http://192.168.3.226:8080',
//         pathRewrite: {'^/emp': ''},
//         secure: true,
//         changeOrigin: true,
//         cookieDomainRewrite: {
//           '192.168.3.226': 'localhost'
//         }
//       } 
//     }
//   }
// }