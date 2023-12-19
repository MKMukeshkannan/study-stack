import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function DashboardLayout() {
  return (
    <main className="relative flex w-full min-h-screen bg-slate-100">
      <SideBar />
      <section className="w-full flex flex-col">
        <NavBar />
        <Outlet />
      </section>
    </main>
  );
}
