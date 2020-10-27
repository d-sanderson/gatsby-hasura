import React from "react"
import gql from "graphql-tag"
import { useSubscription, useMutation } from "react-apollo-hooks"
import Comment from "./Comment"

const GET_COMMENTS = gql`
  subscription($id: uuid!) {
    comments(where: { post_id: { _eq: $id } }) {
      id
      content
    }
  }
`
const Comments = ({ id }) => {
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
  const comments = data.comments.map(comment => (
    <Comment key={comment.id} id={comment.id} content={comment.content} />
  ))
  return <ul>{comments}</ul>
}

export default Comments
