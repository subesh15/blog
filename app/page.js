
"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const inputRef= useRef("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Posts:", data); // Debugging
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const searchPost = (e) => {
    if(e.type == 'keydown' && e.key !== 'Enter'){
      return ;
    }

    setSearch(true);
    // setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=`+inputRef.current.value)
      .then((res) => res.json())
      .then(res=> setPosts(res))
      .finally(() => setSearch(false))
    // },2000)
    
  }

  return (
    <div className="bg-color-white h-screen">
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>
          Discover insightful articles, latest updates, and expert opinions on a variety of topics. 
          Our blog is a platform where knowledge meets creativity, offering you an engaging and 
          enriching experience. Stay tuned for more inspiring content!
        </p>
      </main>
      <div className="flex justify-end px-4">
        <input onKeyDown={searchPost} disabled={search} ref={inputRef}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button onClick= {searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">
          {search?'...':'Search'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={post._id} href={"/post/" + post._id}>
            <div className="border border-gray-200 p-4">
              <img
                className="w-full h-48 object-cover mb-4"
                src={post.image || "https://picsum.photos/200"}
                alt={post.title || "Post Image"}
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
      </div>
      {!posts.length > 0 && inputRef.current.value &&<p> No posts added for your query: <b>{inputRef.current.value}</b></p>}
    </div>
  );
}
