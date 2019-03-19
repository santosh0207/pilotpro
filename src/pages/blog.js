import React from "react"

import Layout from "../components/layout"
import { graphql, Link} from "gatsby";

const BlogPage = ({data}) => (
  <Layout>
     <div>
        <h1>Latest Post</h1>
        {data.allMarkdownRemark.edges.map(post =>(
            <div key={post.node.div}>
                <h3>{post.node.frontmatter.title}</h3>
                <small>posted By {post.node.frontmatter.author} on {post.node.frontmatter.date}</small>
                <br />
                <br />
                <Link to={post.node.frontmatter.path}>Read More</Link>
                <br />
                <br />
                <hr />
            </div>
        ))}
     </div>
    
  </Layout>
)
export const PageQuery = graphql`
query BlogIndexQuery{
    allMarkdownRemark {
      edges {
        node {
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
`
export default BlogPage ;
