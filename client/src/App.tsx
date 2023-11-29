import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

function App() {
  return (
    <main className="relative flex w-full min-h-screen bg-slate-100">
      <SideBar />
      <section className=" w-full h-full">
        <NavBar />
      </section>
    </main>
  );
}

export default App;
