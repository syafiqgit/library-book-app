/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomFormfield from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Book } from "@/utils/apis/books";
import { editBooks } from "@/utils/apis/books/api";
import { BookSchema, bookSchema } from "@/utils/apis/books/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Edit2Icon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface Props {
  data: Book;
}

export default function EditBooks(props: Props) {
  const { data } = props;

  const { toast } = useToast();

  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      cover_image: data.cover_image ?? "",
      title: data.title ?? "",
      author: data.author ?? "",
      category: data.category ?? "",
      description: data.description ?? "",
      isbn: data.isbn ?? "",
    },
    values: {
      cover_image: data.cover_image,
      title: data.title,
      author: data.author,
      category: data.category,
      description: data.description,
      isbn: data.isbn ?? "",
    },
  });

  const id_book = data.id;

  const handleEditBook = async (data: BookSchema) => {
    data.cover_image = data.cover_image[0].name
    try {
      const response = await editBooks(data, id_book);
      console.log(response)
      toast({
        description: response.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const fileRef = form.register("cover_image", { required: true });

  return (
    <Dialog>
      <DialogTrigger>
        <Edit2Icon />
      </DialogTrigger>
      <DialogContent>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditBook)}>
              <CustomFormfield
                control={form.control}
                name="cover_image"
                label="Cover image"
              >
                {() => (
                  <Input
                    placeholder="Cover image"
                    type="file"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...fileRef}
                    className="text-black"
                  />
                )}
              </CustomFormfield>
              <CustomFormfield
                control={form.control}
                name="title"
                label="Title"
              >
                {(field) => (
                  <Input
                    placeholder="Title book"
                    type="text"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="text-black"
                  />
                )}
              </CustomFormfield>
              <CustomFormfield
                control={form.control}
                name="author"
                label="Author"
              >
                {(field) => (
                  <Input
                    placeholder="Author book"
                    type="text"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  />
                )}
              </CustomFormfield>
              <CustomFormfield
                control={form.control}
                name="category"
                label="Category"
              >
                {(field) => (
                  <Input
                    placeholder="Category book"
                    type="text"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  />
                )}
              </CustomFormfield>
              <CustomFormfield control={form.control} name="isbn" label="ISBN">
                {(field) => (
                  <Input
                    placeholder="ISBN book"
                    type="text"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  />
                )}
              </CustomFormfield>
              <CustomFormfield
                control={form.control}
                name="description"
                label="Description"
              >
                {(field) => (
                  <Input
                    placeholder="Description book"
                    type="text"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  />
                )}
              </CustomFormfield>
              <div>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
