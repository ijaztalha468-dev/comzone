import { useState } from "react";

export default function ProductGallery({ images }) {

  const [activeImage, setActiveImage] = useState(images[0]);


  return (
    <div className="bg-[var(--bg-card)] p-5 rounded-[10px]">


      {/* Main Image */}
      <div>

        <img
          className="w-full h-[400px] object-contain"
          src={activeImage}
          alt="Product"
        />

      </div>



      {/* Small Images */}
      <div className="flex gap-2.5 mt-5">

        {images.map((image, index) => (

          <img
            className="w-20 h-20 object-cover cursor-pointer"
            key={index}
            src={image}
            alt="Thumbnail"
            loading="lazy"
            onClick={() => setActiveImage(image)}
          />

        ))}

      </div>


    </div>
  );
}
