import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getToken, removeToken } from "../utils/auth";

const Navbar = () => {
  const { getTotalItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    removeToken();
    clearCart();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">🛒 GroceryApp</Link>
      <ul className="navbar-nav me-auto">
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                Cart{" "}
                <span className="badge bg-success position-absolute top-0 start-100 translate-middle">
                  {getTotalItems() || 0}
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">My Orders</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="navbar-nav">
        {isLoggedIn ? (
          <li className="nav-item">
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item me-2">
              <Link className="btn btn-outline-light" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-success" to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
