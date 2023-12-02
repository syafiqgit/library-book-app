/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import LayoutPage from "@/layouts/layout-page";
import { Book } from "@/utils/apis/books";
import { getDetailBooks } from "@/utils/apis/books/api";
import { useToken } from "@/utils/contexts/token";
import useCartStore from "@/utils/state";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailBooks() {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book>();
  const { cart, addBook } = useCartStore();
  const { token } = useToken();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const isInCart = useMemo(() => {
    const checkCart = cart.find((item) => item.id === +params.id_book!);

    if (checkCart) return true;

    return false;
  }, [cart]);

  const onClickBorrow = () => {
    toast({
      description: "Book has been added to cart.",
    });
    addBook(books!);
  };

  const fetchData = async () => {
    try {
      const response = await getDetailBooks(params.id_book as string);
      setBooks(response.payload);
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
      <div className="flex flex-col md:flex-row w-full items-center cursor-default bg-color-card p-4 rounded-xl">
        <img
          src={books?.cover_image}
          alt={books?.title}
          className="object-contain aspect-[3/4] w-52 md:w-64 lg:w-96"
        />
        <div className="flex flex-col w-full gap-5">
          <p className="font-bold text-2xl text-white">{books?.title}</p>
          <p className="text-xl text-slate-300">By {books?.author}</p>
          <Badge className="w-fit text-lg">{books?.category}</Badge>
          <Separator />
          <p className="text-lg text-white">{books?.description}</p>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline">Back</Button>
            </Link>
            {token ? (
              <Button
                onClick={() => onClickBorrow()}
                disabled={isInCart}
                aria-disabled={isInCart}
              >
                {isInCart ? "In Cart" : "Borrow"}
              </Button>
            ) : (
              <Button disabled={true}>Login to borrow book</Button>
            )}
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}
