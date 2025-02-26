import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg"
const Header = () => {
//   const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <nav class="flex mx-25">
      <img class="h-25" src={logo}></img>
      {/* {isAuthenticated ? ( */}
        <ul class="flex mx-85 items-center gap-x-20">
          <li class="activea:text-orange-500"><Link to="/"     class="active:text-orange-500"
          >Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
          <li><Link to="/data">Data</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          
          
          {/* <li><button onClick={logout}>Logout</button></li> */}
        </ul>
          {/* {userRole === "admin" && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/mark-attendance">Mark Attendance</Link></li>
              <li><Link to="/members">Members</Link></li>
              <li><Link to="/add-members">Add Members</Link></li>
            </>
          )}
        </ul>
      ) : (
       */}
        <div class="mt-2">
          <button class="bg-orange-500 m-4 py-3 px-4 rounded-xl text-white">
            <Link to="/login">Login</Link>
          </button>
            <Link to="/profile">Profile</Link>
        </div>
        {/* )} */}
    </nav>
  );
};

export default Header;
