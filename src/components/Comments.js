import React from 'react'
import gql from "graphql-tag"
import { useSubscription } from "react-apollo-hooks"

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
    return (
      <ul>
        {data.comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    )
  }

export default Comments
