"use client";

import { useDeletePost } from "@/hooks/useDeletePost";
import { usePost } from "@/hooks/usePost";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const postId = Number(id);

  const router = useRouter();

  const { data } = usePost(postId);
  const { mutate: updatePost, isPending } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
    setEdit(false);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    updatePost(
      {
        id: postId,
        title,
        content,
        updatedAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setEdit(false);
        },
      }
    );
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deletePost(postId, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-screen">
      <h1 className="text-2xl mb-4">Edit Post</h1>
      <form className="flex flex-col w-4/12 shadow-2xl rounded-xl p-4 gap-y-4">
        <div className="flex justify-between items-center">
          <label className="label w-1/3">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            disabled={!edit}
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="label w-1/3">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="textarea textarea-bordered w-full max-w-xs"
            disabled={!edit}
          />
        </div>

        <div className="flex justify-between items-center">
          {!edit ? (
            <>
              <button
                className="btn btn-warning"
                onClick={e => {
                  e.preventDefault();
                  setEdit(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </form>
    </div>
  );
}
