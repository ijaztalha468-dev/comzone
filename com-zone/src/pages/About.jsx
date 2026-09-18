export default function About() {

  return (
    <div className="w-[90%] max-w-[1200px] my-[50px] mx-auto">


      <section className="text-center bg-[var(--bg-elevated)] text-[var(--text)] py-[60px] px-[30px] rounded-2xl">

        <h1 className="text-[32px] min-[600px]:text-[42px] mb-5">
          About COM-ZONE
        </h1>

        <p className="text-lg leading-[1.7] max-w-[800px] mx-auto">
          COM-ZONE is a trusted computer store providing
          laptops, desktops, graphics cards, RAM, SSDs
          and computer accessories.
        </p>

      </section>



      <section className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 gap-[25px] mt-10">


        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[30px] rounded-xl transition-[transform,border-color,box-shadow] duration-300 ease-in-out hover:-translate-y-2 hover:border-[var(--red-border)] hover:shadow-[var(--shadow-red)]">

          <h2 className="text-2xl mb-[15px] text-[var(--red)]">
            Our Mission
          </h2>

          <p className="text-[var(--text-muted)] leading-[1.6] text-base">
            Our mission is to provide high quality
            computer products at affordable prices
            with the best customer experience.
          </p>

        </div>



        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[30px] rounded-xl transition-[transform,border-color,box-shadow] duration-300 ease-in-out hover:-translate-y-2 hover:border-[var(--red-border)] hover:shadow-[var(--shadow-red)]">

          <h2 className="text-2xl mb-[15px] text-[var(--red)]">
            Our Services
          </h2>

          <p className="text-[var(--text-muted)] leading-[1.6] text-base">
            We provide gaming PCs, laptop upgrades,
            hardware solutions and computer accessories.
          </p>

        </div>



        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[30px] rounded-xl transition-[transform,border-color,box-shadow] duration-300 ease-in-out hover:-translate-y-2 hover:border-[var(--red-border)] hover:shadow-[var(--shadow-red)]">

          <h2 className="text-2xl mb-[15px] text-[var(--red)]">
            Why Choose Us?
          </h2>

          <p className="text-[var(--text-muted)] leading-[1.6] text-base">
            Quality products, competitive prices and
            reliable customer support.
          </p>

        </div>


      </section>


    </div>
  );
}
