import { Card, CardContent } from "@/components/ui/card"
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

let imageList = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22
]
export default function Productsroll() {
    return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto"
    >
      <CarouselContent>
        {imageList.map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
            <div className="p-1 text-center text-char space-y-3">
                <Image src={imageList[index]} alt={dresses[index].name} className="object-cover rounded-lg"/>
                <span className="">{dresses[index].name != "Suit" ? dresses[index].name + " dress" : dresses[index].name}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export {imageList}