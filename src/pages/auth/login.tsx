/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LayoutPage from "@/layouts/layout-page";
import { loginAccount } from "@/utils/apis/auth/api";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormfield from "@/components/custom-formfield";
import { Input } from "@/components/ui/input";
import { LoginSchema, loginSchema } from "@/utils/apis/auth";
import { Loader2 } from "lucide-react";
import { useToken } from "@/utils/contexts/token";

export default function Login() {
  const {changeToken} = useToken()
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = async (data: LoginSchema) => {
    try {
      const response = await loginAccount(data);
      changeToken(response.payload.token)
      toast({
        title: response.message.toString(),
        variant: "default",
      });
      navigate("/");
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
      <div className="mx-auto w-[30rem] rounded-lg p-4 my-auto bg-color-card">
        <div className="flex flex-col gap-2 my-4">
          <p className="font-bold text-2xl text-white">Login</p>
          <p className="text-lg text-slate-300">Login to your account here</p>
        </div>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmitLogin)}>
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
                  "Login"
                )}
              </Button>
            </div>
            <p className="mt-2 text-center text-slate-300">
              Dont have an account ? <span className="text-blue-500 underline">
                <Link to='/register'>Register</Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </LayoutPage>
  );
}
