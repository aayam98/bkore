import { getHeader } from "@utils/header";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Product } from "services/printify/printify.type";

interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  title: string;
  variantTitle: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
  };
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
  </div>
);

const PrintifyProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/printify');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data.data);
        
        const initialSelectedVariants: Record<string, string> = {};
        const initialQuantities: Record<string, number> = {};
        data.data.forEach((product: Product) => {
          const firstEnabledVariant = product.variants.find(v => v.is_enabled);
          if (firstEnabledVariant) {
            initialSelectedVariants[product.id] = firstEnabledVariant.id;
            initialQuantities[product.id] = 1;
          }
        });
        setSelectedVariants(initialSelectedVariants);
        setQuantities(initialQuantities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageChange = (productId: string, index: number) => {
    setImageIndices(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const addToCart = (product: Product) => {
    const variant = product.variants.find(v => v.id === selectedVariants[product.id]);
    if (!variant) return;

    const orderItem: OrderItem = {
      productId: product.id,
      variantId: variant.id,
      quantity: quantities[product.id],
      price: variant.price,
      title: product.title,
      variantTitle: variant.title
    };

    setCart(prev => [...prev, orderItem]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) throw new Error('Failed to create order');

      const order = await response.json();
      setCart([]);
      setIsCheckoutOpen(false);
      // Handle successful order creation (e.g., show confirmation, redirect to order page)
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (e.g., show error message)
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <p className="text-red-600">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
      >
        Try again
      </button>
    </div>
  );

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Printify Products</h2>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="px-4 py-2 bg-red-bc2026 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          Cart ({cart.length})
          {cartTotal > 0 && <span>${cartTotal.toFixed(2)}</span>}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => {
          const selectedVariant = product.variants.find(v => v.id === selectedVariants[product.id]);
          const enabledVariants = product.variants.filter(v => v.is_enabled);

          return (
            <div key={product.id} className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
              {product.images.length > 0 && (
                <div className="relative mb-4">
                  <div className="overflow-hidden h-80 rounded">
                    {product.images.map((image, index) => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt={`${product.title} - ${index + 1}`}
                        className={`absolute w-full h-80 object-cover transition-transform duration-300 ease-in-out ${
                          index === (imageIndices[product.id] || 0) ? 'translate-x-0' : 'translate-x-full'
                        }`}
                      />
                    ))}
                  </div>
                  {product.images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === (imageIndices[product.id] || 0) ? 'bg-red-bc2026' : 'bg-gray-300'
                          }`}
                          onClick={() => handleImageChange(product.id, index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <div className="space-y-4">
                <select
                  value={selectedVariants[product.id]}
                  onChange={(e) => handleVariantChange(product.id, e.target.value)}
                  className="w-full p-2 border rounded bg-white"
                >
                  {enabledVariants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title} - ${variant.price}
                    </option>
                  ))}
                </select>
                
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantities[product.id]}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="w-20 p-2 border rounded"
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 p-2 bg-red-bc2026 text-white rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.variantTitle}</p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center font-bold mb-4">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleCheckout}
                    className="flex-1 p-2 bg-red-bc2026 text-white rounded hover:bg-blue-700"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-2 border rounded hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintifyProducts;