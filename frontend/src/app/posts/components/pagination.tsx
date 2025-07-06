"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type PaginationProps = {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, lastPage, onPageChange }: PaginationProps) {
  return (
    <div className="mt-4 flex justify-end gap-2 w-full">
      <button
        className="btn btn-sm"
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <span>Page {page} of {lastPage}</span>
      <button
        className="btn btn-sm"
        onClick={() => onPageChange(page < lastPage ? page + 1 : page)}
        disabled={page >= lastPage}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
