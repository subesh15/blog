"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Post() {
  const params = useParams();  // Use `useParams()` to get the dynamic parameters
  const id = params?.id; // Access `id` from params
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`)
        .then((res) => res.json())
        .then((res) => setPost(res))
        .catch((err) => console.error("Error fetching post:", err));
    }
  }, [id]);

  return (
    <>
      {post ? (
        <main className="container mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
          <img width={400} height={300}
            src={post.image || "https://via.placeholder.com/600"}
            alt="Post Image"
            className="my-4"
          />
          <p>{post.description}</p>
        </main>
      ) : (
        <p className="text-center mt-8">Loading...</p>
      )}
    </>
  );
}
