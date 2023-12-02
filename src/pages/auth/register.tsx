/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomFormfield from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import LayoutPage from "@/layouts/layout-page";
import { RegisterSchema, registerSchema } from "@/utils/apis/auth";
import { registerAccount } from "@/utils/apis/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitRegister = async (data: RegisterSchema) => {
    try {
      const response = await registerAccount(data);
      toast({
        title: response.message.toString(),
        variant: "default",
      });
      navigate("/login");
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
      <div className="my-auto mx-auto rounded-lg p-4 w-[30rem] bg-color-card">
        <div className="flex flex-col gap-2 my-4">
          <p className="font-bold text-2xl text-white">Register</p>
          <p className="text-lg text-slate-300">
            Create your account here to get full features
          </p>
        </div>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmitRegister)}>
            <CustomFormfield control={form.control} name="email" label="Email">
              {(field) => (
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                  className="text-black"
                />
              )}
            </CustomFormfield>
            <CustomFormfield
              control={form.control}
              name="password"
              label="Password"
            >
              {(field) => (
                <Input
                  placeholder="Password"
                  type="password"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormfield>
            <CustomFormfield
              control={form.control}
              name="full_name"
              label="Full name"
            >
              {(field) => (
                <Input
                  placeholder="Full name"
                  type="text"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormfield>
            <CustomFormfield
              control={form.control}
              name="address"
              label="Address"
            >
              {(field) => (
                <Input
                  placeholder="Address"
                  type="text"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormfield>
            <CustomFormfield
              control={form.control}
              name="phone_number"
              label="Phone number"
            >
              {(field) => (
                <Input
                  placeholder="Phone number"
                  type="text"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormfield>
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
                "Register"
              )}
            </Button>
            <p className="mt-2 text-center text-slate-300">
              Already have an account ?{" "}
              <span className="text-blue-500 underline">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </LayoutPage>
  );
}
