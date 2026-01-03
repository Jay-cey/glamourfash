import {products as product} from '../../../../data/products'
import ProductsView from './products-view'
import { Suspense } from 'react'

function ProductsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="h-[40vh] min-h-[300px] bg-stone-100 animate-pulse flex items-center justify-center">
        <div className="h-16 w-3/4 max-w-lg bg-stone-200 rounded-lg opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block w-64 space-y-8">
            <div className="space-y-4">
               <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
               <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-full bg-gray-50 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] w-full bg-gray-200 rounded-xl animate-pulse" />
                  <div className="flex justify-between items-start">
                     <div className="space-y-2 w-2/3">
                        <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                     </div>
                     <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Example() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsView products={product} />
    </Suspense>
  )
}
