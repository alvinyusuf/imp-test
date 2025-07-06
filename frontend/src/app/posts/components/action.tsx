import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

type PostActionsProps = {
  id: string;
  onDelete: (e: React.MouseEvent, id: number) => void;
};

export default function PostActions({ id, onDelete }: PostActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/posts/${id}`} className="btn btn-xs btn-warning">
        <Pencil size={16} /> Edit
      </Link>
      <button
        onClick={(e) => onDelete(e, Number(id))}
        className="btn btn-xs btn-error"
      >
        <Trash size={16} /> Delete
      </button>
    </div>
  );
}
