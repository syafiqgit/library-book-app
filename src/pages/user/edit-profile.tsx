/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import LayoutPage from "@/layouts/layout-page";
import { useToast } from "@/components/ui/use-toast";
import { deleteProfile, editProfile, getProfile } from "@/utils/apis/user/api";
import {
  Profile,
  ProfileUpdateType,
  profileUpdateSchema,
} from "@/utils/apis/user/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormfield from "@/components/custom-formfield";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Alert from "@/components/alert";

export default function EditProfile() {
  const [profile, setProfile] = useState<Profile>();

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProfile();
      setProfile(response.payload);
    } catch (error: any) {
      toast({
        title: "Oops!, Something went wrong",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const handleEditProfile = async (data: ProfileUpdateType) => {
    data.profile_picture = data.profile_picture[0].name;
    try {
      const result = await editProfile(data);
      toast({
        description: result.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const form = useForm<ProfileUpdateType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      profile_picture: profile?.profile_picture ?? "",
      full_name: profile?.full_name ?? "",
      email: profile?.email ?? "",
      password: profile?.password ?? "",
      address: profile?.address ?? "",
      phone_number: profile?.phone_number ?? "",
    },
    values: {
      profile_picture: profile?.profile_picture,
      full_name: profile?.full_name!,
      email: profile?.email!,
      password: profile?.password!,
      address: profile?.address!,
      phone_number: profile?.phone_number!,
    },
  });

  const handleDeleteProfile = async () => {
    try {
      const result = await deleteProfile();
      toast({
        description: result.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const fileRef = form.register("profile_picture", { required: true });

  return (
    <LayoutPage>
      <div className="flex flex-col justify-center items-center gap-5  bg-color-card p-5 rounded-xl w-fit mx-auto">
        <div>
          <img
            src={profile?.profile_picture}
            alt={profile?.full_name}
            className="w-60 rounded-full"
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEditProfile)}>
            <CustomFormfield
              control={form.control}
              name="profile_picture"
              label="Profile picture"
            >
              {() => (
                <Input
                  type="file"
                  {...fileRef}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className=" w-[35rem] text-lg"
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
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className=" w-[35rem] text-lg"
                  {...field}
                />
              )}
            </CustomFormfield>
            <CustomFormfield control={form.control} name="email" label="Email">
              {(field) => (
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className=" w-[35rem] text-lg"
                  {...field}
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
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className=" w-[35rem] text-lg"
                  {...field}
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
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className=" w-[35rem] text-lg"
                  {...field}
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
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className=" w-[35rem] text-lg"
                  {...field}
                />
              )}
            </CustomFormfield>
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Link to="/profile">
                  <Button variant="outline">Cancle</Button>
                </Link>
                <Link to="/profile">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Link>
              </div>
              <Alert
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your account an you cannot use your email again."
                onAction={handleDeleteProfile}
              >
                <Button type="button" variant="destructive">
                  Delete Account
                </Button>
              </Alert>
            </div>
          </form>
        </Form>
      </div>
    </LayoutPage>
  );
}
