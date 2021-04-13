/*
 * @Author: Bob
 * @Date: 2021-04-13 22:37:47
 * @LastEditors: Bob
 * @LastEditTime: 2021-04-13 22:39:03
 */
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://106.75.100.154:1337/',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['posts'],
        typeName: 'Strapi'
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates: {
    // StrapiPost为上面Plugin中配置的typeName和contentTypes的组合
    StrapiPosts: [
      {
        path: '/:id',
        component: './src/templates/Detail.vue'
      }
    ]
  }
}
