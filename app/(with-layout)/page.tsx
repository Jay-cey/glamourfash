import hero from "../../public/images/fash.png"
// import CarouselDem from "../../components/carousel";
import Image from "next/image";
import Productsroll from "../../components/productsroll";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-auto">
      <section className="w-full mb-10 ">
        <video
          className="w-full h-screen max-md:object-[25%_75%] md:h-auto object-cover shadow-lg brightness-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={"/videos/herovid.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="font-san items-center justify-items-center md:p-8 p-10 w-full container mx-auto overflow-hidden">    
        <div className="text-center md:hidden mb-12">
          <Image src={hero} alt="GlamourFash" className="w-3/4 md:w-full h-auto mx-auto md:mx-0"/>
          <p className=" text-lg mb-2 opacity-75">Your one-stop shop for the latest fashion trends.</p>
          <Link href={"/shop/product"}>
            <button className="bg-char text-white px-6 py-3 rounded-md hover:bg-primary-700 transition ">
                Shop Now
            </button>
          </Link>
        </div>
        

        <div className="w-full">
          <div className="mt-2 max-md:text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-primary-900">Discover Our Collections</h2>
            <p className="mb-6">Explore our wide range of clothing, accessories, and more.</p>
          </div>

          <Productsroll/>
        </div>
      </section>
    </main>
  );
}
