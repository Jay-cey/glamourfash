import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import img1 from "../public/images/suit1.jpeg"
import img2 from "../public/images/corset1.jpeg"
import img3 from "../public/images/casual1.jpeg"
import img4 from "../public/images/cocktail1.jpeg"
import img5 from "../public/images/backless1.jpeg"
import img6 from "../public/images/bandeau1.jpeg"
import img7 from "../public/images/denim1.jpeg"
import img8 from "../public/images/bodycon1.jpeg"
import img9 from "../public/images/blazer1.jpeg"
import img10 from "../public/images/maxi1.jpeg"
import img11 from "../public/images/mini1.jpeg"
import img12 from "../public/images/shirt1.jpeg"
import img13 from "../public/images/flow1.jpeg"
import img14 from "../public/images/tshirt1.jpeg"
import img15 from "../public/images/wrap1.jpeg"
import img16 from "../public/images/strapless1.jpeg"
import img17 from "../public/images/custom1.jpeg"
import img18 from "../public/images/native1.jpeg"
import img19 from "../public/images/off1.jpeg"
import img20 from "../public/images/pinafore1.jpeg"
import img21 from "../public/images/knitted.jpeg"
import img22 from "../public/images/polo1.jpeg"
import Image from "next/image"
import dresses from "../app/dresses"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import Link from "next/link"

let imageList = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22
]

const products = imageList.map((image, index) => {
  const dress = dresses[index]
  const name = dress?.name || "Product"
  return {
    id: index,
    image,
    name,
    displayName: name === "Suit" ? "Suit" : `${name} dress`
  }
})

export default function Productsroll() {
    return (
    <Carousel
      plugins={[
        Autoplay({ delay: 3000 })
      ]}
      opts={{
        align: "start",
        containScroll: "trimSnaps",
      }}
      className="w-full max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4">
            <Link href={`/shop/products?search=${encodeURIComponent(product.name)}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                className="p-1 text-center text-char space-y-3 cursor-pointer group">
                  <div className="overflow-hidden rounded-lg">
                    <Image src={product.image} alt={product.name} className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"/>
                  </div>
                  <span className="block transition-colors duration-300 group-hover:text-stone-500">{product.displayName}</span>
              </motion.div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export {imageList, products}