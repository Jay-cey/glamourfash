export interface CartItem {
  itemId: string;
  productId: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  images: { src: string }[];
  selectedSize?: { name: string };
  selectedColor?: { name: string; classes: string };
}