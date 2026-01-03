import { products } from '../../../../data/products';
import CategoryView from './category-view';

export default async function CategoryPage({ params }) {
  const { category } = await params;
  
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return <CategoryView products={categoryProducts} category={category} />;
}
