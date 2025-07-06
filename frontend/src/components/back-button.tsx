"use client"

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      className="btn btn-sm"
      onClick={() => router.back()}
    >
      <ArrowLeft /> Back
    </button>
  )
}
