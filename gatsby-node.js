// /**
//  * Implement Gatsby's Node APIs in this file.
//  **/

// const path = require('path');
// exports.createPages =({ graphql,actions}) =>{
//     const {craetePage} = actions
//     const postTemplate = path.resolve('src/template/blog-post.js')

//     return graphql(`
//     {
//         allMarkdownRemark {
//             edges {
//               node {
//                 html
//                 frontmatter {
//                   path
//                   date
//                   title
//                   shortscript
//                   author
//                 }
//                 id
//                 excerpt
//               }
//             }
//         }
//     }`).then(res=>{
//         if(res.errors){
//             return Promise.reject(res.errors)
//         }
//        // Create pages for each markdown file.
//        res.data.allMarkdownRemark.edges.forEach(({ node }) => {
//         const path1 = node.frontmatter.path
//         createPage({
//           path1,
//           component: postTemplate,
//           // In your blog post template's graphql query, you can use path
//           // as a GraphQL variable to query for data from the markdown file.
//           context: {
//             path1,
//           },
//         })
//       })
//     })
// }
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            html
            frontmatter {
              path
              date
              title
              shortscript
              author
            }
            id
            excerpt
          }
        }
      }
    }
  `).then(result => {
    console.log(JSON.stringify(result, null, 4))
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/template/blog-post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })
  })
}