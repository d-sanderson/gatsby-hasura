import React from "react"
import { graphql, Link } from "gatsby"
export const query = graphql`
  {
    blog {
      posts {
        id
        title
        author {
          first_name
          last_name
        }
      }
    }
  }
`
export default function Home({ data }) {
  let posts = data.blog.posts.map((post)=> {
    return(
    <article style={{ margin: "5rem auto", width: "550px" }} key={post.id}>
      <Link to={`/post/${post.id}`}>
      <h2>{post.title}</h2>
      </Link>
      <p>Written by: {post.author.first_name} {post.author.last_name}</p>
  </article>)})

  return (<div>{posts}</div>)
}
