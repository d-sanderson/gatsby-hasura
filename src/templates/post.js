import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Comments from "../components/Comments"
import gql from "graphql-tag"
import { useSubscription, useMutation } from "react-apollo-hooks"
export const query = graphql`
  query($id: hasura_uuid!) {
    blog {
      posts_by_pk(id: $id) {
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

const ADD_COMMENT = gql`
  mutation($id: uuid!, $content: String!) {
    insert_comments_one(
      object: {
        author_id: "135c3857-341f-4446-89f5-5ad30a24ed37"
        content: $content
        post_id: $id
      }
    ) {
      id
    }
  }
`


export default ({ data }) => {
  const [addComment] = useMutation(ADD_COMMENT)
  const [comment, setComment] = useState({content: ''})

  const handleChange = (e) => {
    setComment({content: e.target.value})
  };
  const post = data.blog.posts_by_pk
  return (
    <div style={{ margin: "5rem auto", width: "550px" }}>
      <Link to="/">Back to all posts</Link>
      <h1>{post.title}</h1>
      <p>
        Written by: {post.author.first_name} {post.author.last_name}
      </p>
      <Comments id={post.id} />
      <h3>Add a comment</h3>
      <form
        onSubmit={e => {
          e.preventDefault()
          addComment({ variables: { content: comment.content, id: post.id } })
        }}
      >
        <input onChange={handleChange} type="text" name="content" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}
