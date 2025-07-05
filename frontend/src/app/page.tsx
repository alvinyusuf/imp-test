import Posts from "./posts/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center max-w-screen h-screen">
      <div className="w-1/2">
        <Posts />
      </div>
    </main>
  );
}
