export function LoadingState() {
  return(
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="skeleton h-16 w-1/2"></div>
        <div className="skeleton h-16 w-1/4"></div>
      </div>
      <div className="skeleton h-96 w-full"></div>
      <div className="flex justify-end gap-x-16">
        <div className="skeleton h-12 w-1/6"></div>
        <div className="skeleton h-12 w-1/6"></div>
      </div>
    </div>
  )
} 
export function ErrorState() {
  return(
    <div>Error loading posts</div>
  )
}