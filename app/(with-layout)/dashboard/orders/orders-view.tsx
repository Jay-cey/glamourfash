"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight, FaShoppingBag, FaSearch } from "react-icons/fa";

interface OrderItem {
  id: string;
  image: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: Date | string;
  total: number;
  status: string;
  items: OrderItem[];
}

interface OrdersViewProps {
  orders: Order[];
}

export default function OrdersView({ orders }: OrdersViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchesId = order.id.toLowerCase().includes(query);
    const matchesProduct = order.items.some((item) =>
      item.name.toLowerCase().includes(query)
    );
    return matchesId || matchesProduct;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Orders</h1>
        <p className="text-gray-500 mt-2">
          View and track your purchase history.
        </p>
      </div>

      {orders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FaShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
          <Link 
            href="/shop/products" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Product Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              No orders found matching "{searchQuery}"
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              variants={itemVariants}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Order Placed</p>
                    <p className="font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order #</p>
                    <p className="font-mono text-sm text-gray-900">{order.id}</p>
                  </div>
                  <div className="sm:ml-auto">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                       order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                       order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                       'bg-gray-100 text-gray-800'
                     }`}>
                       {order.status}
                     </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4 overflow-x-auto pb-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="relative w-16 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                        {item.quantity > 1 && (
                          <span className="absolute bottom-0 right-0 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-tl-md font-medium">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Link 
                    href={`/order-confirmation?id=${order.id}`}
                    className="text-sm font-medium text-black hover:text-gray-600 flex items-center gap-1"
                  >
                    View Order Details <FaChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}