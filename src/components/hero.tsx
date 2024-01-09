import Combobox from "./search-book";

export default function Hero() {
  return (
    <div className="mx-auto my-5 max-w-full">
      <div className="text-center flex flex-col gap-3 mb-5">
        <p className="font-bold text-4xl mb-1 text-white">
          Welcome to BookVerse App
        </p>
        <p className="text-xl mx-auto w-[41rem] text-slate-300">
          Explore our rich treasure trove of knowledge, offering easy and
          convenient access to a diverse range of the latest books and beloved
          classics
        </p>
      </div>
      <Combobox placeholder="Search Books......" />
    </div>
  );
}
