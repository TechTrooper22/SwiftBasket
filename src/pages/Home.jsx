import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/product/ProductList";
import Carousel from "../components/ui/Carousel";
import CategoryList from "../components/ui/CategoryList";
import { mockProducts } from "../data/mockData";
import img1 from "../img/shoe.jpg";
import img2 from "../img/fashion.jpg";
import img3 from "../img/electronics.jpg";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // In a real app, this would be a fetch request to the backend
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Handle search from query params
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults({
        query: searchQuery,
        results: results,
      });
    } else {
      setSearchResults(null);
    }
  }, [location.search, products]);

  // Banner images for the carousel
  const bannerImages = [
    {src: img1},
    {src: img2},
    {src: img3}
  ];

  // Featured categories
  const categories = [
    {
      id: 1,
      name: "Electronics",
      imageUrl:
        "https://images.click.in/classifieds/images/179/28_02_2024_12_31_27_7c0cd21a821a5a29d2f3a4260eb1fad5_j.png",
    },
    {
      id: 2,
      name: "Fashion",
      imageUrl:
        "https://mir-s3-cdn-cf.behance.net/projects/404/634d3c107023357.5f9d5527e7493.png",
    },
    {
      id: 3,
      name: "Home",
      imageUrl: "https://m.media-amazon.com/images/I/41fBCFPyNqL.jpg",
    },
    {
      id: 4,
      name: "Beauty",
      imageUrl:
        "https://hairfacenails.com/content/images/size/w1600/2022/01/30-Best-Viral-TikTok-Beauty-Products-You-Need-to-Order-ASAP-3.jpg",
    },
    {
      id: 5,
      name: "Appliances",
      imageUrl: "https://www.allpcb.com/img/img/newindex/part3_3.png",
    },
    {
      id: 6,
      name: "Toys",
      imageUrl: "https://im.whatshot.in/img/2023/Jun/image-2-1685739851.jpg",
    },
  ];

  return (
    <div className="home-page">
      {/* If search results exist, show them, otherwise show the main home page */}
      {searchResults ? (
        <div className="container">
          <h2 className="search-results-title">
            Search Results for "{searchResults.query}"
          </h2>

          <ProductList
            products={searchResults.results}
            loading={loading}
            error={error}
          />
        </div>
      ) : (
        <>
          <Carousel images={bannerImages} />

          <div className="container">
            <CategoryList categories={categories} />

            <ProductList
              title="Top Offers For You"
              products={products.filter((p) => p.discount > 20).slice(0, 12)}
              loading={loading}
              error={error}
              showFilters={false}
            />

            <div className="banner">
              <img
                src="https://i.ibb.co/Jnzd8bp/mid-baer.jpg"
                alt="Special Deals"
              />
            </div>

            <ProductList
              title="New Arrivals"
              products={products.filter((p) => p.isNewArrival).slice(0, 8)}
              loading={loading}
              error={error}
              showFilters={false}
            />

            <ProductList
              title="All Products"
              products={products}
              loading={loading}
              error={error}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
