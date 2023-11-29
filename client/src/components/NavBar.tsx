import { SearchInput } from "./SearchInput";

export default function NavBar() {
  return (
    <nav className="p-5 static top-0 right-0 bg-white z-[9999]">
      <section className="flex flex-row justify-between">
        <h1 className=" text-4xl  font-extrabold">STUDY STACK</h1>
        <SearchInput />
      </section>
    </nav>
  );
}
