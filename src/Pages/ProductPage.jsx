import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`)
      .then((res) => {
        setProducts(res.data.products);
        window.scrollTo({ top: 0, behavior: "smooth" }); // ✨ Smooth scroll on page change
      });
  }, [page]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 drop-shadow-sm">
        🛍️ Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="relative group bg-white/30 backdrop-blur-md p-5 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Category badge */}
            <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {product.category}
            </span>

            {/* Image with hover effect */}
            <div className="w-full h-70 overflow-hidden rounded-2xl mb-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold text-blue-700">
                  ${product.price}
                </span>
                <span className="text-sm text-yellow-600 font-medium">
                  ⭐ {product.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}

      </div>

      <div className="mt-10 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 bg-indigo-200 hover:bg-indigo-300 text-indigo-800 font-medium rounded-lg shadow-md transition disabled:opacity-50"
        >
          ⬅️ Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 bg-indigo-200 hover:bg-indigo-300 text-indigo-800 font-medium rounded-lg shadow-md transition"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
