import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import AddQuestionContextProvider from "@/context/AddQuestionContextProvider";

export default function DashboardLayout() {
  return (
    <AddQuestionContextProvider>
      <main className="relative flex w-full min-h-screen bg-slate-100">
        <SideBar />
        <section className="w-full flex flex-col">
          <NavBar />
          <Outlet />
        </section>
      </main>
    </AddQuestionContextProvider>
  );
}
