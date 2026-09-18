import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSlides } from "../../services/sliderService";

const dotClass =
  "w-3.5 h-3.5 p-0 m-[5px] bg-[var(--bg-card)] border-none rounded-full cursor-pointer opacity-50 text-[0px] text-[var(--success)] leading-none [appearance:none] shadow-none hover:opacity-80 focus:outline-none focus:bg-[var(--red)] focus:shadow-none active:outline-none active:bg-[var(--red)] active:shadow-none";
const activeDotClass =
  "w-3.5 h-3.5 p-0 m-[5px] border-none rounded-full cursor-pointer opacity-100 text-[0px] text-[var(--success)] leading-none [appearance:none] shadow-none bg-[var(--red)]";

export default function HeroSlider() {

  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Backend se slides lana - admin panel se add ki hui images
  useEffect(() => {
    async function loadSlides() {
      try {
        const data = await getSlides();
        setSlides(data);
      } catch (error) {
        console.error("Load Slides Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSlides();
  }, []);


  // Auto Slider
  useEffect(() => {

    if (slides.length === 0) return;

    const timer = setInterval(() => {

      setActiveSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );

    }, 3000);


    return () => clearInterval(timer);

  }, [slides]);



  // Next Slide
  const nextSlide = () => {

    setActiveSlide(
      activeSlide === slides.length - 1 
      ? 0 
      : activeSlide + 1
    );

  };


  // Previous Slide
  const prevSlide = () => {

    setActiveSlide(
      activeSlide === 0
      ? slides.length - 1
      : activeSlide - 1
    );

  };


  if (loading) {
    return null;
  }

  if (slides.length === 0) {
    return null; // admin ne abhi koi slide add nahi ki
  }


  return (

    <section className="flex-1 min-w-0 w-full h-[580px] relative overflow-hidden rounded-[25px]">


      {/* Blurred zoomed copy - poore box ko cover karti hai, gap kabhi nahi rehta */}
      <div
        style={{ backgroundImage: `url(${slides[activeSlide].ImageUrl})` }}
      />

      <img
        src={slides[activeSlide].ImageUrl}
        alt={slides[activeSlide].Title}
      />


      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.45)]"></div>


      <div className="absolute top-1/2 left-[8%] -translate-y-1/2 text-white z-[2] max-w-[500px]">

        <h1 className="text-[45px] mb-[15px] text-white">
          {slides[activeSlide].Title}
        </h1>


        <p className="text-lg mb-5">
          {slides[activeSlide].Text}
        </p>

        <Link
          to={slides[activeSlide].LinkUrl || "/products"}
          className="py-3 px-[30px] bg-[var(--red)] text-white border-none rounded-[50px] cursor-pointer"
        >
          SHOP NOW
        </Link>
        

      </div>






      <button 
        onClick={prevSlide}
      >
        ❮
      </button>


      <button 
        onClick={nextSlide}
      >
        ❯
      </button>


      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-[3]">

        {
          slides.map((slide,index)=>(

            <button
              key={slide.Id}
              className={
                activeSlide === index 
                ? activeDotClass
                : dotClass
              }
              onClick={() => setActiveSlide(index)}
            >
              ●
            </button>

          ))
        }

      </div>


    </section>

  );

}
