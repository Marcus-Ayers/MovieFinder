export const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-black h-14">
      <div className="flex">
        <h2 className="ml-5 text-2xl text-lime-400">Home</h2>
      </div>
      <div className="flex">
        <h2 className="ml-5 text-2xl text-lime-400">Watchlist</h2>
        <h2 className="ml-5 mr-5 text-2xl text-lime-400">Reviews</h2>
      </div>
    </div>
  );
};
