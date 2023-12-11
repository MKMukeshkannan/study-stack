import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function DashboardLayout() {
  return (
    <main className="relative flex w-full min-h-screen bg-slate-100">
      <SideBar />
      <section className="w-full flex flex-col">
        <NavBar />
        <section className="p-3 flex-auto h-0 overflow-y-auto">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
