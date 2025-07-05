"use client";

import { useCreatePost } from "@/hooks/useCreatePost";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: createPost, isPending } = useCreatePost();

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setTitle("");
    setContent("");
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }

    createPost(
      { title, content },
      {
        onSuccess: (data) => {
          console.log("Post created:", data);
          router.push(`/`);
        },
        onError: (err) => {
          console.error("Create failed:", err.message);
          alert("Gagal membuat post.");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-screen">
      <h1 className="text-2xl mb-4">Add New Post</h1>
      <form className="flex flex-col w-4/12 shadow-2xl rounded-xl p-4 gap-y-4">
        <div className="flex justify-between items-center">
          <label className="label w-1/3">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter post title"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="label w-1/3">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full max-w-xs"
            placeholder="Enter post content"
          />
        </div>

        <div className="flex justify-between items-center">
          <button className="btn btn-neutral" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
