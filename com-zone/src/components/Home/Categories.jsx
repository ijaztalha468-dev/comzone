import { Link } from "react-router-dom";

export default function Categories() {

  const categories = [
    {
      id: 1,
      name: "Laptop",
      image:
        "https://images.unsplash.com/photo-1726462987391-fbb6991a8248?q=80&w=1153&auto=format&fit=crop",
      link: "/laptop",
    },
    {
      id: 2,
      name: "Desktop",
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=735&auto=format&fit=crop",
      link: "/desktop",
    },
    {
      id: 3,
      name: "GPU",
      image:
        "https://images.unsplash.com/photo-1716967318503-05b7064afa41?q=80&w=1332&auto=format&fit=crop",
      link: "/gpu",
    },
    {
      id: 4,
      name: "RAM",
      image:
        "https://images.unsplash.com/photo-1699796990049-3406a9991baa?q=80&w=1974&auto=format&fit=crop",
      link: "/ram",
    },
    {
      id: 5,
      name: "SSD",
      image:
        "https://plus.unsplash.com/premium_photo-1721133260774-84f57d69cb82?q=80&w=1170&auto=format&fit=crop",
      link: "/ssd",
    },
    {
      id: 6,
      name: "Accessories",
      image:
        "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760?q=80&w=2070&auto=format&fit=crop",
      link: "/accessories",
    },
  ];

  // Seamless loop ke liye list ko do dafa render karte hain (Brands jaisa)
  const marqueeItems = [...categories, ...categories];

  return (
    <section className="w-full overflow-hidden pt-5 px-5 pb-[30px] min-[600px]:pt-[30px]">

      <div className="group overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <h2 className="text-center text-[32px]">Shop by category</h2>
        <div className="flex items-center gap-[25px] min-[600px]:gap-[35px] min-[900px]:gap-[90px] w-max pt-[15px] pb-[25px] animate-category-scroll group-hover:[animation-play-state:paused]">

          {marqueeItems.map((category, index) => (

            <Link
              to={category.link}
              className="group/pill flex-grow-0 flex-shrink-0 basis-[105px] min-[600px]:basis-[130px] min-[900px]:basis-[150px] w-[105px] min-[600px]:w-[150px] flex flex-col items-center no-underline transition-transform duration-300 ease-in-out hover:-translate-y-[5px]"
              key={`${category.id}-${index}`}
            >

              <div className="w-[95px] h-[95px] min-[600px]:w-[120px] min-[600px]:h-[120px] min-[900px]:w-[135px] min-[900px]:h-[135px] min-w-[95px] min-h-[95px] min-[600px]:min-w-[120px] min-[600px]:min-h-[120px] min-[900px]:min-w-[195px] min-[900px]:min-h-[195px] rounded-full overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] shrink-0 transition-[border-color,box-shadow] duration-[250ms] ease-in-out group-hover/pill:border-[var(--red-border)] group-hover/pill:shadow-[var(--shadow-red)]">

                <img
                  className="w-full h-full block object-cover object-center rounded-full"
                  src={category.image}
                  alt={category.name}
                />

              </div>

              <h3 className="mt-[9px] min-[600px]:mt-3 mx-0 mb-0 text-sm min-[600px]:text-base font-semibold text-[var(--text)] text-center whitespace-nowrap transition-colors duration-[250ms] ease-in-out group-hover/pill:text-[var(--red-hover)]">{category.name}</h3>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}
