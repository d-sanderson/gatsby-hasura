import React from "react"
import { graphql, Link } from "gatsby"
import gql from "graphql-tag"
import { useSubscription } from "react-apollo-hooks"
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
export default function Home() {
  const { data, loading, error } = useSubscription(GET_POSTS, {
    suspend: false,
  })
  if (loading === true) {
    return <div>loading</div>
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
    return <div>{posts}</div>

    if(error) {
      return <div>{JSON.stringify(error, null,2)}</div>
    }
  }
  console.log(data, loading, error)
}
