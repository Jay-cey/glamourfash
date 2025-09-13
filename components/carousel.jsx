'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import img1 from "../public/images/hero1.jpeg"
import img2 from "../public/images/hero2.jpeg"
import img3 from "../public/images/hero3.jpeg"
import img4 from "../public/images/hero4.jpeg"
import img5 from "../public/images/hero5.jpeg"
import img6 from "../public/images/hero6.jpeg"
import img7 from "../public/images/hero7.jpeg"  
import img8 from "../public/images/hero8.jpeg"
import img9 from "../public/images/hero9.jpeg"
import { use } from "react"


function CarouselDem() {
  let imageList = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  return (
    <Carousel 
      className="w-full md:col-span-3"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      >
      <CarouselContent>
        {imageList.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 rounded-lg">
              <Image
                src={imageList[index]}
                alt={`Image ${index + 1}`} 
                className="rounded-lg object-cover md:object-top h-96 w-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselDem
