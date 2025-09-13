import Image from "next/image";
import hero from "../../public/images/fash.png"
import CarouselDem from "../../components/carousel";
import Productsroll from "../../components/productsroll";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-san items-center justify-items-center min-h-screen md:p-8 p-10 w-full container mx-auto overflow-hidden">

      <main className="">
        
        <section className="grid grid-flow-row md:grid-cols-5 gap-8 items-center justify-center w-full mx-auto max-md:space-y-8 lg:min-h-[70vh]">
            <div className="text-center md:col-span-2 md:space-y-4 md:text-center">
              <h2 className="text-lg opacity-75 md:hidden">Welcome to</h2>
              <div>
                <Image src={hero} alt="GlamourFash" className="w-3/4 md:w-full h-auto mx-auto md:mx-0"/>
                <p className=" text-lg mb-2 opacity-75">Your one-stop shop for the latest fashion trends.</p>
              </div>
              <Link href={"/shop/product"}>
                <button className="bg-char text-white px-6 py-3 rounded-md hover:bg-primary-700 transition ">
                   Shop Now
                </button>
              </Link>

            </div>

            <CarouselDem/>

        </section>
        
        <section className="w-full">
          <div className="mt-22 max-md:text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-primary-900">Discover Our Collections</h2>
            <p className="mb-6">Explore our wide range of clothing, accessories, and more.</p>
          </div>

          <Productsroll/>
        </section>
      </main>
    </div>
  );
}
