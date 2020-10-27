import React from "react"
import { graphql, Link } from "gatsby"
import gql from "graphql-tag"
import { useSubscription } from "react-apollo-hooks"
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
const GET_COMMENTS = gql`
  subscription($id: uuid!) {
    comments(where: { post_id: { _eq: $id } }) {
      id
      content
    }
  }
`

const Comments = ({ id }) => {
  console.log(id)
  const { data, loading, error } = useSubscription(GET_COMMENTS, {
    suspend: false,
    variables: { id },
  })

  if (loading) {
    return <p>Loading</p>
  }
  if (error) {
    return <p>{JSON.stringify(error, null, 2)}</p>
  }
  return (
    <ul>
      {data.comments.map(comment => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  )
}

export default ({ data }) => {
  const post = data.blog.posts_by_pk
  console.log(post)
  return (
    <div style={{ margin: "5rem auto", width: "550px" }}>
      <Link to="/">Back to all posts</Link>
      <h1>{post.title}</h1>
      <p>
        Written by: {post.author.first_name} {post.author.last_name}
      </p>
      <Comments id={post.id} />
    </div>
  )
}
