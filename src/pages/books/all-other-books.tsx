/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CardBook from "@/components/card-book";
import { useToast } from "@/components/ui/use-toast";
import LayoutBooks from "@/layouts/layout-books";
import LayoutPage from "@/layouts/layout-page";
import { Book } from "@/utils/apis/books";
import { getAllBooks } from "@/utils/apis/books/api";
import { useEffect, useState } from "react";

export default function AllOtherBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllBooks();
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
      <LayoutBooks linkTitle="Back" linkTo="/" title="Other books">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {books.map((book) => (
            <CardBook data={book} key={book.id} />
          ))}
        </div>
      </LayoutBooks>
    </LayoutPage>
  );
}
