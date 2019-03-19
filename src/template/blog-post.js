import React from 'react'
import { Link } from '@reach/router';
import { graphql } from 'gatsby';
export default function Template({data}) {
    const post = data.markdownRemark
    console.log("in blog-post ",post)
    return (
      <div>
        <Link to="/blog">Go back</Link>
        <br />
        <hr/>
        <h1>{post.frontmatter.title}</h1>
        <h4>posted by {post.frontmatter.author} on {post.frontmatter.date}</h4>
        <div dangerouslySetInnerHTML={{__html :post.html}} />
      </div>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        date
      }
    }
  }
`