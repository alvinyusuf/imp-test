import Logout from "./auth/logout/page";
import Posts from "./posts/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start px-4 py-8 gap-y-2 md:px-0 md:py-4 md:gap-y-0">
      <div className="flex w-full justify-start md:justify-end md:px-8">
        <Logout />
      </div>
      <div className="w-full sm:w-4/5 md:w-2/3">
        <Posts />
      </div>
    </main>
  );
}
