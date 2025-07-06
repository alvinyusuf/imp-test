import Posts from "./posts/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start px-4 py-8 md:px-0 md:py-4">
      <div className="w-full sm:w-4/5 md:w-2/3">
        <Posts />
      </div>
    </main>
  );
}
