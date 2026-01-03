import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { getOrder } from "@/app/actions/orders";

export default async function OrderConfirmationPage({ searchParams }) {
  const { id } = await searchParams;
  const order = await getOrder(id);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md w-full px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-serif text-gray-900 mb-2">No Order Found</h1>
            <p className="text-gray-500 mb-6">
              It looks like you haven't placed an order yet or the page was refreshed.
            </p>
            <Link 
              href="/shop/products" 
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors w-full"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 text-center border-b border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500">
              Thank you for your purchase. Your order ID is <span className="font-mono font-medium text-black">#{order.id}</span>
            </p>
          </div>

          <div className="p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Details</h2>
            
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        {item.size && <p className="text-gray-500">Size: {item.size}</p>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd>${order.subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</dd>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop/products" 
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/dashboard/orders" 
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}