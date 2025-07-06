"use client";

import BackButton from "@/components/back-button";
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
        onSuccess: () => router.push("/"),
        onError: (err) => {
          console.error("Create failed:", err.message);
          alert("Gagal membuat post.");
        },
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-4 py-8 gap-y-4">
      <form className="w-full max-w-lg space-y-6 rounded-xl bg-base-100 p-6 shadow-2xl">
        <h1 className="text-2xl font-semibold">Add New Post</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="w-full md:w-32">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered py-1 md:py-0 flex-1"
            placeholder="Enter post title"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <label className="w-full md:w-32 pt-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered flex-1 min-h-[140px]"
            placeholder="Enter post content"
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-end gap-3">
          <button
            type="button"
            className="btn btn-neutral md:w-28"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary md:w-28"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
      <div className="flex w-full max-w-lg">
        <BackButton />
      </div>
    </div>
  );
}
