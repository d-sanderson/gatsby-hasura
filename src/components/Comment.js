import React, { useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"

const DELETE_COMMENT = gql`
  mutation($id: uuid!) {
    delete_comments(where: { id: { _eq: $id } }) {
      returning {
        content
      }
    }
  }
`

const Comment = ({content, id}) => {
 const [deleteComment] = useMutation(DELETE_COMMENT)
  return (
    <li
      onClick={e => {
        e.preventDefault()
        deleteComment({ variables: { id } })
      }}
    >
      {content}
    </li>
  )
}

export default Comment
