import { Book } from "@/utils/apis/books";
import { Link } from "react-router-dom";

interface Props {
  data: Book;
}

export default function CardBook(props: Props) {
  const { data } = props;
  return (
    <div className="flex flex-col p-4 items-center gap-4 w-48 md:w-56 lg:w-64 shadow-lg rounded-lg  bg-color-card">
      <Link to={`/books/${data.id}`}>
        <figure className="overflow-hidden shadow-md mb-4">
          <img
            src={data.cover_image}
            alt={data.title}
            className="h-auto w-auto object-cover aspect-[3/4]"
          />
        </figure>
        <p className="font-bold text-center text-xl mb-4 text-white">{data.title}</p>
        <p className="text-center text-slate-300 font-semibold">
          {data.author}
        </p>
      </Link>
    </div>
  );
}
