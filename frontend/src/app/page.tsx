import Posts from "./posts/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-4 py-8">
      <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5">
        <Posts />
      </div>
    </main>
  );
}
