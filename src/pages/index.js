import React from "react"
import { graphql, Link } from "gatsby"
import gql from "graphql-tag"
import { useSubscription, useMutation } from "react-apollo-hooks"
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

const GET_POSTS = gql`
  subscription {
    posts {
      id
      title
      author {
        first_name
        last_name
      }
    }
  }
`

const ADD_POST = gql(`
mutation addPost($content: String!, $title: String!) {
  insert_posts(objects: {author_id: "135c3857-341f-4446-89f5-5ad30a24ed37", content: $content, title: $title}) {
  returning {
    title
  }
  }
}

`)
export default function Home() {
  const { data, loading, error } = useSubscription(GET_POSTS, {
    suspend: false,
  })
  let input
  const [addPost, { data2 }] = useMutation(ADD_POST)
  if (loading === true) {
    return <div>loading</div>
  }
  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>
  }
  if (loading === false && !error) {
    let posts = data.posts.map(post => {
      return (
        <article style={{ margin: "5rem auto", width: "550px" }} key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>
            Written by: {post.author.first_name} {post.author.last_name}
          </p>
        </article>
      )
    })
    return (
      <>
        <div>{posts}</div>
        <form
          onSubmit={e => {
            e.preventDefault()
            addPost({ variables: { title: input.value, content: "derp" } })
            input.value = ""
          }}
        >
          <input
            ref={node => {
              input = node
            }}
          />
          <button type="submit">Add Post</button>
        </form>
      </>
    )
  }
  console.log(data, loading, error)
}
