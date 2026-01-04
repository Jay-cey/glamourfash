export interface CartItem {
  itemId: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  images: { src: string }[];
  selectedSize?: { name: string };
}