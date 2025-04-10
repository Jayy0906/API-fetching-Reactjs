import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
        <p className="text-xl font-medium text-gray-600 animate-pulse">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transition-all animate-fade-in">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-indigo-800">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-xl font-bold text-green-600">💵 ${product.price}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full shadow-sm">
                Brand: {product.brand}
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full shadow-sm">
                Category: {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
