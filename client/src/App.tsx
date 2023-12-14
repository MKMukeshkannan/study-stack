import { Route, Routes } from "react-router-dom";
import {
  AddNew,
  Home,
  Login,
  Profile,
  Revise,
  Settings,
  Signup,
} from "./pages";
import DashboardLayout from "./components/DashboardLayout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="/revise" element={<Revise />} />
          <Route path="/add-new" element={<AddNew />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/me" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
