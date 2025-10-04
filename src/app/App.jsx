import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

export default function App() {
  return (
    <div className="size-full flex">
      <Nav />
      <Sidebar />

      <main className="flex-1 mt-10 md:mt-0 p-6">
        <Outlet />
      </main>
    </div>
  );
}
