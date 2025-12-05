import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useCart } from "../context/useCart";
import "../components/grocery.css";

// Images
import milk from "../assets/milk.jpeg";
import bread from "../assets/bread.jpeg";
import eggs from "../assets/eggs.jpeg";
import salt from "../assets/salt.jpeg";
import maggie from "../assets/maggie.jpeg";
import cornflakes from "../assets/cornflakes.jpeg";
import tomato from "../assets/tomato.jpeg";
import oreo from "../assets/oreo.jpeg";
import bourboan from "../assets/bourboan.jpeg";
import mariegold from "../assets/mariegold.jpeg";
import onion from "../assets/onion.jpeg";
import garlic from "../assets/garlic.jpeg";
import darkfantasy from "../assets/darkfantasy.jpeg";
import dabur from "../assets/dabur.jpeg";
import indiagate from "../assets/indiagate.jpeg";
import closeup from "../assets/closeup.jpeg";

import bgVideo from "../assets/grocery-bg.mp4";

// Image mapping
const fallbackImages = {
  milk,
  bread,
  eggs,
  salt,
  maggie,
  cornflakes,
  tomato,
  oreo,
  bourboan,
  mariegold,
  onion,
  garlic,
  darkfantasy,
  dabur,
  indiagate,
  closeup,
};

// CATEGORY MAPPING BASED ON PRODUCT NAME
const categorize = (name) => {
  const n = name.toLowerCase();

  // Dairy
  if (n.includes("milk") || n.includes("egg") || n.includes("cornflakes"))
    return "Dairy";

  // Bakery & Biscuits
  if (
    n.includes("bread") ||
    n.includes("oreo") ||
    n.includes("bourboan") ||
    n.includes("mariegold") ||
    n.includes("darkfantasy")
  )
    return "Bakery & Biscuits";

  // Vegetables
  if (n.includes("tomato") || n.includes("onion") || n.includes("garlic"))
    return "Vegetables";

  // Snacks & Instant
  if (n.includes("maggie") || n.includes("maggi"))
    return "Snacks & Instant";

  // Staples
  if (n.includes("salt") || n.includes("indiagate"))
    return "Staples";

  // Personal Care (DABUR FIXED HERE)
  if (n.includes("closeup") || n.includes("dabur"))
    return "Personal Care";

  return "Others";
};

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();
  const baseURL = import.meta.env.VITE_API_URL;

  const fetchItems = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/groceries`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  }, [baseURL]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Group items by category
  const categoryMap = items.reduce((acc, item) => {
    const category = categorize(item.name);

    if (!acc[category]) acc[category] = [];
    acc[category].push(item);

    return acc;
  }, {});

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-container">
        <video autoPlay muted loop className="hero-video">
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="overlay">
          <h1 className="display-4 fw-bold text-white">Fresh Groceries Daily</h1>
          <p className="lead text-white">
            Browse categories and shop your daily essentials.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="fw-bold text-center mb-5">Product Categories</h2>

        {/* CATEGORY SECTIONS */}
        {Object.keys(categoryMap).map((category) => (
          <div key={category} className="mb-5">
            <h3 className="fw-semibold mb-3 text-capitalize border-bottom pb-2">
              {category}
            </h3>

            <div className="row">
              {categoryMap[category].map((item) => {
                const key = item.name?.toLowerCase().replace(/\s+/g, "");
                const fallback = fallbackImages[key] || milk;

                return (
                  <div key={item._id} className="col-md-4 mb-4">
                    <div className="card h-100 shadow border-0 item-card">
                      <img
                        src={fallback}
                        alt={item.name}
                        className="card-img-top"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-capitalize">{item.name}</h5>
                        <p className="card-text mb-1">Quantity: {item.quantity}</p>
                        <p className="card-text text-success fw-bold mb-2">
                          ₹{item.price}
                        </p>
                        <button
                          className="btn btn-outline-success mt-auto w-100"
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-center text-muted mt-5">No products available.</p>
        )}
      </div>
    </>
  );
};

export default GroceryList;
