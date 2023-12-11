import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

function App() {
  return (
    <main className="relative flex w-full min-h-screen bg-slate-100">
      <SideBar />
      <section className="w-full flex flex-col">
        <NavBar />
        <section className="p-3 flex-auto h-0 overflow-y-auto">
        </section>
      </section>
    </main>
  );
}

export default App;
