import { useEffect, useState, useCallback, useMemo } from "react";
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

// Categorization
const categorize = (name) => {
  const n = name.toLowerCase();

  if (n.includes("milk") || n.includes("egg") || n.includes("cornflakes"))
    return "Dairy";

  if (
    n.includes("bread") ||
    n.includes("oreo") ||
    n.includes("bourboan") ||
    n.includes("mariegold") ||
    n.includes("darkfantasy")
  )
    return "Bakery & Biscuits";

  if (n.includes("tomato") || n.includes("onion") || n.includes("garlic"))
    return "Vegetables";

  if (n.includes("maggie") || n.includes("maggi"))
    return "Snacks & Instant";

  if (n.includes("salt") || n.includes("indiagate"))
    return "Staples";

  if (n.includes("closeup") || n.includes("dabur"))
    return "Personal Care";

  return "Others";
};

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  const baseURL = import.meta.env.VITE_API_URL;

  const fetchItems = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/groceries`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err.message);
    }
  }, [baseURL]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Group items by category
  const categoryMap = useMemo(() => {
    return items.reduce((acc, item) => {
      const cat = categorize(item.name);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});
  }, [items]);

  const categories = ["All", ...Object.keys(categoryMap)];

  // Decide what to show
  const visibleCategories =
    selectedCategory === "All"
      ? Object.keys(categoryMap)
      : [selectedCategory];

  return (
    <>
      {/* HERO */}
      <div className="hero-container">
        <video autoPlay muted loop className="hero-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="overlay">
          <h1 className="display-4 fw-bold text-white">
            Fresh Groceries Daily
          </h1>
          <p className="lead text-white">
            Handpicked essentials, delivered fresh.
          </p>
        </div>
      </div>

      {/* CATEGORY FILTER BAR */}
      {categories.length > 1 && (
        <div className="category-glass-bar">
          <div className="category-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      <div className="container py-5">
        {visibleCategories.map((category) => (
          <section key={category} className="mb-5">
            <h3 className="fw-bold mb-4 section-title">
              {category}
            </h3>

            <div className="row">
              {categoryMap[category]?.map((item) => {
                const key = item.name
                  ?.toLowerCase()
                  .replace(/\s+/g, "");
                const img = fallbackImages[key] || milk;

                return (
                  <div key={item._id} className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm item-card">
                      <img
                        src={img}
                        alt={item.name}
                        className="product-image"
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="fw-semibold">
                          {item.name}
                        </h5>
                        <p className="mb-1">
                          Qty: {item.quantity}
                        </p>
                        <p className="fw-bold text-success">
                          ₹{item.price}
                        </p>
                        <button
                          className="btn btn-dark mt-auto w-100"
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
          </section>
        ))}
      </div>
    </>
  );
};

export default GroceryList;
