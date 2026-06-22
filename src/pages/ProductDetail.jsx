import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiArrowLeft,
  FiShare2,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <span className="text-8xl">🪵</span>
          <h2 className="text-3xl font-bold text-espresso mt-4">
            Product Not Found
          </h2>
          <Link
            to="/shop"
            className="text-oak hover:underline mt-2 inline-block"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

const handleAddToCart = () => {
  addToCart(product, quantity)
  toast.success(`${product.name} added to cart!`, {
    icon: '🛒',
  })
}

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${product.name} - ${formatPrice(product.price)}`;
    window.open(
      `https://wa.me/923001234567?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-walnut/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-espresso/50">
            <Link to="/" className="hover:text-oak">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-oak">
              Shop
            </Link>
            <span>/</span>
            <span className="text-espresso">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-espresso/60 hover:text-oak mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4 h-[450px]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-oak shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {product.isNew && (
                <span className="bg-oak text-cream text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isSale && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  SALE
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-espresso mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-honey fill-honey"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-espresso/70 font-medium">
                {product.rating}
              </span>
              <span className="text-espresso/40">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6 bg-white rounded-xl p-4 shadow-sm">
              <span className="text-3xl font-bold text-walnut">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-espresso/40 line-through text-lg">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-espresso/70 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4">
                <p className="text-espresso/40 text-xs uppercase tracking-wider mb-1">
                  Material
                </p>
                <p className="text-espresso font-semibold text-sm">
                  {product.material}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-espresso/40 text-xs uppercase tracking-wider mb-1">
                  Dimensions
                </p>
                <p className="text-espresso font-semibold text-sm">
                  {product.dimensions}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-espresso/40 text-xs uppercase tracking-wider mb-1">
                  Finish
                </p>
                <p className="text-espresso font-semibold text-sm">
                  {product.finish}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-espresso/40 text-xs uppercase tracking-wider mb-1">
                  Stock
                </p>
                <p
                  className={`font-semibold text-sm ${product.inStock ? "text-green-600" : "text-red-500"}`}
                >
                  {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center bg-white rounded-xl border border-walnut/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-walnut/5 rounded-l-xl transition-colors"
                >
                  <FiMinus size={18} />
                </button>
                <span className="px-6 font-bold text-lg text-espresso">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-walnut/5 rounded-r-xl transition-colors"
                >
                  <FiPlus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${
                  product.inStock
                    ? "bg-walnut text-cream hover:bg-walnut-light shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FiShoppingCart size={22} />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button className="p-4 border-2 border-walnut/20 rounded-xl hover:bg-walnut/5 transition-colors text-walnut">
                <FiHeart size={22} />
              </button>
            </div>

            {/* WhatsApp & Share */}
            <div className="flex gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all"
              >
                <FaWhatsapp size={20} /> Order via WhatsApp
              </button>
              <button className="p-3 border-2 border-walnut/20 rounded-xl hover:bg-walnut/5 transition-colors text-walnut">
                <FiShare2 size={20} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-walnut/10">
              <div className="flex items-center gap-2 text-espresso/60 text-sm">
                <FiTruck className="text-oak" size={18} /> Free Delivery
              </div>
              <div className="flex items-center gap-2 text-espresso/60 text-sm">
                <FiShield className="text-oak" size={18} /> 5 Year Warranty
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-espresso mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/product/${rp.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-espresso font-semibold line-clamp-1">
                      {rp.name}
                    </h3>
                    <p className="text-walnut font-bold mt-1">
                      {formatPrice(rp.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
