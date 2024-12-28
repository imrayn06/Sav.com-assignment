import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Fetch from "./Components/Fetch";
import LogoutButton from "./Components/LogOutButton";

const RoutesToPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/products" element={<Fetch />} />
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
    </div>
  );
};

export default RoutesToPage;
