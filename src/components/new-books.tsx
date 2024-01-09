/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LayoutBooks from "@/layouts/layout-books";
import { Book} from "@/utils/apis/books";
import { useEffect, useState } from "react";
import CardBook from "./card-book";
import { useToast } from "./ui/use-toast";
import { getNewBooks } from "@/utils/apis/books/api";

export default function NewBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const { toast } = useToast();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getNewBooks();
      setBooks(response.payload.datas);
    } catch (error:any) {
      toast({
        title: "Oops!, Something went wrong",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  return (
    <LayoutBooks title="New release books" linkTo="/books/new" linkTitle="See all">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {books.map((book) => (
          <CardBook data={book} key={book.id} />
        ))}
      </div>
    </LayoutBooks>
  );
}
