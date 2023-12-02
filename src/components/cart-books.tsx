/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCartStore from "@/utils/state";
import { Trash2, ShoppingCart } from "lucide-react";
import { BorrowSchema } from "@/utils/borrow/types";
import { borrowBooks } from "@/utils/borrow/api";
import { toast } from "./ui/use-toast";
import { Separator } from "./ui/separator";

export default function CartBook() {
  const { cart, deleteBook, removeCart } = useCartStore();

  const cartBook = {
    bookId: cart.map((item) => item.id),
    borrow_date: new Date().toISOString(),
  };

  async function onBorrow(cartBook: BorrowSchema) {
    try {
      const result = await borrowBooks(cartBook);
      removeCart();
      toast({
        title: result.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex gap-1">
          <ShoppingCart /> Books
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto bg-color-card">
        <SheetHeader>
          <SheetTitle className="text-white">Cart book</SheetTitle>
          <SheetDescription className="text-slate-300">
            Due date is 7 days after you click borrow
          </SheetDescription>
        </SheetHeader>
        {cart.map((book) => (
          <>
            <div key={book.id} className="flex items-center gap-4 my-4">
              <img src={book.cover_image} alt={book.title} className="w-24" />
              <div className="flex flex-col gap-3">
                <p className="text-white">{book.title}</p>
                <Trash2
                  onClick={() => deleteBook(book)}
                  className="cursor-pointer text-white"
                />
              </div>
            </div>
            <Separator />
          </>
        ))}
        <SheetFooter className="my-5">
          <SheetClose asChild>
            <Button onClick={() => onBorrow(cartBook)}>Borrow</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
