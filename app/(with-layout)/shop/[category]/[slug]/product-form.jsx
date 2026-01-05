"use client";

import { useState } from "react";
import { useCart } from "@/app/context/cart-context";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductForm({ product }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // Default to the first in-stock size, or the first size if none are marked inStock explicitly
  const [selectedSize, setSelectedSize] = useState(product.sizes.find(s => s.inStock) || product.sizes[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSize) return;
    addToCart({ ...product, productId: product.id }, 1, selectedColor, selectedSize);
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit}>
      {/* Colors */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>

        <fieldset aria-label="Choose a color" className="mt-4">
          <div className="flex items-center gap-x-3">
            {product.colors.map((color) => (
              <div key={color.id} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                <input
                  checked={selectedColor.id === color.id}
                  onChange={() => setSelectedColor(color)}
                  name="color"
                  type="radio"
                  aria-label={color.name}
                  className={classNames(
                    color.classes,
                    'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3 cursor-pointer',
                  )}
                />
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Sizes */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <a href="#" className="text-sm font-medium text-char hover:text-primary-600">
            Size guide
          </a>
        </div>

        <fieldset aria-label="Choose a size" className="mt-4">
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => (
              <label
                key={size.name}
                aria-label={size.name}
                className={classNames(
                  size.inStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
                  'group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-primary-900 has-checked:bg-primary-900 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200'
                )}
              >
                <input
                  checked={selectedSize.name === size.name}
                  onChange={() => setSelectedSize(size)}
                  name="size"
                  type="radio"
                  disabled={!size.inStock}
                  className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                />
                <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                  {size.name}
                </span>
                {!size.inStock && (
                   <span
                   aria-hidden="true"
                   className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                   >
                   <svg
                       className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                       viewBox="0 0 100 100"
                       preserveAspectRatio="none"
                       stroke="currentColor"
                   >
                       <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                   </svg>
                   </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-900 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
      >
        Add to bag
      </button>
    </form>
  );
}