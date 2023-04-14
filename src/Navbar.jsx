import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="bg-green-900">
      <div className="flex justify-between items-center h-14 mb-5 max-w-screen-2xl mx-auto	">
        <div className="flex">
          <Link to="/">
            <h2 className="ml-5 text-2xl text-white">Home</h2>
          </Link>
        </div>
        <div className="flex">
          <h2 className="ml-5 text-2xl text-white">Watchlist</h2>
          <h2 className="ml-5 mr-5 text-2xl text-white">Reviews</h2>
        </div>
      </div>
    </div>
  );
};
