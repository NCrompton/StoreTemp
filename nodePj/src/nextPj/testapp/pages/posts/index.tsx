import Link from 'next/link'
import { useEffect, useState } from 'react'

function PostList({ posts }: {[key: string]: any}) {
   
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post:any) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`}>
              <h2>
                {post.id} {post.title}
              </h2>
            </Link>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default PostList

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()

  return {
    props: {
      posts: data.slice(0, 5)
    }
  }
}