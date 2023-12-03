/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import LayoutPage from "@/layouts/layout-page";
import { Book } from "@/utils/apis/books";
import { getAllBooks } from "@/utils/apis/books/api";
import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { deleteBooks } from "@/utils/borrow/api";
import Alert from "@/components/alert";
import EditBooks from "./edit-books";

export default function BooksList() {
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

  const onDeleteBook = async (id: number) => {
    try {
      const response = await deleteBooks(String(id));
      toast({
        title: response.message.toString(),
        variant: "default",
      });
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Author</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">ISBN</TableHead>
            <TableHead className="text-white">Featured</TableHead>
            <TableHead className="text-white">Edit</TableHead>
            <TableHead className="text-white">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id} className="text-slate-300">
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{`${book.featured}`}</TableCell>
              <TableCell>
                <EditBooks data={book}/>
              </TableCell>
              <TableCell>
                <Alert
                  title="Are you absolutely sure?"
                  description={`This action cannot be undone. This will permanently delete your book "${book.title}".`}
                  onAction={() => onDeleteBook(book.id)}
                >
                  <Trash2Icon />
                </Alert>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </LayoutPage>
  );
}
