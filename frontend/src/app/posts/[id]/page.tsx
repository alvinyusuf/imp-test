"use client";

import Alert from "@/components/alert";
import BackButton from "@/components/back-button";
import { useDeletePost } from "@/hooks/useDeletePost";
import { usePost } from "@/hooks/usePost";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Flash = {
  id: number;
  message: string;
};

export default function Page() {
  const { id } = useParams();
  const postId = Number(id);
  const modal = useRef<HTMLDialogElement>(null);
  

  const router = useRouter();

  const { data } = usePost(postId);
  const { mutate: updatePost, isPending } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [flash, setFlash] = useState<Flash | null>(null);

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
          setEdit(false)
          setFlash({ id: Date.now(), message: "Post updated successfully!" });
        },
      }
    );
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deletePost(postId, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-4 py-8 gap-y-4">
      {flash && (
        <div className="flex w-full max-w-lg">
          <Alert key={flash.id} message={flash.message} type="success" />
        </div>
      )}
      <form className="w-full max-w-lg space-y-6 rounded-xl bg-base-100 p-6 shadow-2xl">
        <h1 className="text-2xl font-semibold">Edit Post</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="w-full md:w-32">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input input-bordered flex-1 py-1 md:py-0"
            disabled={!edit}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <label className="w-full md:w-32 pt-2">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="textarea textarea-bordered flex-1 min-h-[140px]"
            disabled={!edit}
          />
        </div>

        <div className="flex flex-col md:flex-row-reverse justify-start gap-3">
          {!edit ? (
            <>
              <button
                type="button"
                className="btn btn-warning md:w-28"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-error md:w-28"
                onClick={() => modal.current?.showModal()}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col-reverse md:flex-row gap-3 w-full md:w-auto">
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
            </>
          )}
        </div>
      </form>
      <div className="flex w-full max-w-lg">
        <BackButton />
      </div>

      <dialog ref={modal} className="modal">
        <div className="modal-box text-center md:w-1/3">
          <h3 className="font-bold text-lg">Delete Post?</h3>
          <div className="modal-action">
            <form method="dialog" className="w-full flex justify-between items-center">
              <button className="btn btn-neutral w-1/3">Cancel</button>
              <button
                onClick={handleDelete}
                className="btn btn-error w-1/3"
              >
                <Trash size={16} /> Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
