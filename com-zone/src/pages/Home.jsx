import HeroSlider from "../components/Home/HeroSlider";
import PromoCards from "../components/Home/PromoCards";
import Categories from "../components/Home/Categories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Offers from "../components/Home/Offers";
import Brands from "../components/Home/Brands";

export default function Home() {
  return (
    <div>

      <div className="flex flex-col min-[900px]:flex-row gap-5 w-full my-[15px] min-[600px]:my-5 px-2.5 min-[600px]:px-[15px] min-[900px]:px-5">
        <HeroSlider />
        <PromoCards />
      </div>

      <Categories />

      <FeaturedProducts />

      <Offers />

      <Brands />

    </div>
  );
}
