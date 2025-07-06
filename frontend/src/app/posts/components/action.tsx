"use client";

import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

type PostActionsProps = {
  id: string;
  onDelete: (e: React.MouseEvent, id: number) => void;
};

export default function PostActions({ id, onDelete }: PostActionsProps) {
  const modal = useRef<HTMLDialogElement>(null);

  return (
    <div className="flex items-center gap-2">
      <Link href={`/posts/${id}`} className="btn btn-xs btn-warning">
        <Pencil size={16} /> Edit
      </Link>
      <button
        className="btn btn-xs btn-error"
        onClick={() => modal.current?.showModal()}
      >
        <Trash size={16} /> Delete
      </button>

      <dialog ref={modal} className="modal">
        <div className="modal-box text-center md:w-1/3">
          <h3 className="font-bold text-lg">Delete Post?</h3>
          <div className="modal-action">
            <form method="dialog" className="w-full flex justify-between items-center">
              <button className="btn btn-neutral w-1/3">Cancel</button>
              <button
                onClick={(e) => onDelete(e, Number(id))}
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
