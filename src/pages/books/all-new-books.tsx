/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import CardBook from "@/components/card-book";
import { useToast } from "@/components/ui/use-toast";
import LayoutBooks from "@/layouts/layout-books";
import LayoutPage from "@/layouts/layout-page";
import { Book } from "@/utils/apis/books";
import { getAllNewBooks } from "@/utils/apis/books/api";
import { useEffect, useState } from "react";

export default function AllNewBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllNewBooks();
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
    <LayoutPage>
      <LayoutBooks linkTitle="Back" linkTo="/" title="New release books">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4">
          {books.map((book) => (
            <CardBook data={book} key={book.id} />
          ))}
        </div>
      </LayoutBooks>
    </LayoutPage>
  );
}
