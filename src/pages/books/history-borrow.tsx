/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/components/ui/use-toast";
import LayoutPage from "@/layouts/layout-page";
import { getHistoryBorrow } from "@/utils/borrow/api";
import { Borrow } from "@/utils/borrow/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryBorrow() {
  const [books, setBooks] = useState<Borrow[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getHistoryBorrow();
      setBooks(response.payload.datas);
    } catch (error: any) {
      toast({
        title: "Oops!, Something went wrong",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };
  return (
    <LayoutPage>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center my-auto">
        {books.map((book) => (
          <div className="flex flex-col p-4 items-center gap-4 w-48 md:w-56 lg:w-64 shadow-lg rounded-lg bg-color-card">
            <Link to={`/books/${book.id}`}>
              <figure className="overflow-hidden shadow-md mb-4">
                <img
                  src={book.book.cover_image}
                  alt={book.book.title}
                  className="h-auto w-auto object-cover aspect-[3/4]"
                />
              </figure>
              <p className="font-bold text-center text-xl mb-4 text-white">{book.book.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </LayoutPage>
  );
}
