import { StarIcon } from '@heroicons/react/20/solid'
import {products, reviews} from '../../../../../data/products';
import Link from 'next/link';
import ProductForm from './product-form';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default async function ProductPage({ params }) {
    const { category, slug } = await params;
    const product = products.find((p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug && p.category.toLowerCase() === category.toLowerCase());
    
    if (!product) {
      return <div className="p-10 text-red-500">Product not found.</div>
    }

    const review = reviews[products.indexOf(product)];
  return (
    <div className="bg-white">
      <div className="pt-6">

        {/* breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Home */}
            <li>
              <div className="flex items-center">
                <Link href="/" className="mr-2 text-sm font-medium text-gray-900">
                  Home
                </Link>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            {/* Category */}
            <li>
              <div className="flex items-center">
                <Link
                  href={`/shop/${product.category.toLowerCase()}`}
                  className="mr-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            {/* Product */}
            <li className="text-sm">
              <span aria-current="page" className="font-medium text-gray-500">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>


        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          <img
            alt={product.images[0].alt}
            src={product.images[0].src}
            width={500}
            height={500}
            className="row-span-2 aspect-3/4 size-full rounded-lg object-cover"
          />
          <img
            alt={product.images[0].alt}
            src={product.images[0].src}
            width={500}
            height={500}
            className="col-start-2 aspect-3/2 size-full rounded-lg object-cover object-top max-lg:hidden"
          />
          <img
            alt={product.images[1].alt}
            src={product.images[1].src}
            width={500}
            height={500}
            className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover object-top max-lg:hidden"
          />
          <img
            alt={product.images[1].alt}
            src={product.images[1].src}
            width={500}
            height={500}
            className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4 max-lg:hidden"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {
                    [0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                            review.average > rating ? 'text-gray-900' : 'text-gray-200',
                            'size-5 shrink-0',
                        )}
                        />
                    ))
                    }
                </div>
                <p className="sr-only">{review.average} out of 5 stars</p>
                <a href={review.href} className="ml-3 text-sm font-medium text-primary-900 hover:text-primary-600">
                  {review.totalCount} reviews
                </a>
              </div>
            </div>

            <ProductForm product={product} />
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
