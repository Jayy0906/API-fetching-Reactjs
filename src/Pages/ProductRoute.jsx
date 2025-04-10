import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductRoute = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-xl text-red-600 font-semibold">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl animate-fade-in">
        <Link
          to="/products"
          className="text-blue-600 hover:underline mb-4 inline-block font-medium"
        >
          &larr; Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg shadow-md border hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-indigo-900">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <div className="text-lg space-y-1 text-gray-800">
              <p><strong>💵 Price:</strong> ${product.price}</p>
              <p><strong>🏷️ Brand:</strong> {product.brand}</p>
              <p><strong>📦 Category:</strong> {product.category}</p>
              <p><strong>⭐ Rating:</strong> {product.rating}</p>
              <p><strong>📉 Stock:</strong> {product.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRoute;
