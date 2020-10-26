import React from "react"
import { graphql, Link } from "gatsby"

export const query = graphql`
  query($id: hasura_uuid!) {
    blog {
      posts_by_pk(id: $id) {
        title
        author {
          first_name
          last_name
        }
      }
    }
  }
`

export default ({ data }) => {
  console.log(data)
  const post = data.blog.posts_by_pk
  return (
    <div style={{ margin: "5rem auto", width: "550px" }}>
      <Link to="/">Back to all posts</Link>
      <h1>{post.title}</h1>
      <p>
        Written by: {post.author.first_name} {post.author.last_name}
      </p>
      <div id="comments"></div>
    </div>
  )
}
