import { Link } from "react-router-dom";

export default function Error404() {

  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-20">


      <h1>
        404
      </h1>


      <h2>
        Page Not Found
      </h2>


      <p className="text-[var(--text-muted)]">
        Sorry, the page you are looking for does not exist.
      </p>



      <Link to="/" className="mt-2.5">
        <button>
          Go To Home
        </button>
      </Link>


    </div>
  );
}