interface PostSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function PostSearch({ value, onChange }: PostSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search here"
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}