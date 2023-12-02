/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import LayoutPage from "@/layouts/layout-page";
import { getProfile } from "@/utils/apis/user";
import { Profile } from "@/utils/apis/user/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
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

  return (
    <LayoutPage>
      <div className="flex flex-col mx-auto bg-color-card p-5 rounded-xl">
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <img
              src={profile?.profile_picture}
              alt={profile?.full_name}
              className="w-60 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-2 w-[35rem]">
              <Label className="text-lg text-slate-300">Full name</Label>
              <Input
                value={profile?.full_name}
                aria-disabled={true}
                className="text-lg"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2 w-[35rem]">
              <Label className="text-md text-slate-300">Email</Label>
              <Input
                value={profile?.email}
                aria-disabled={true}
                className="text-lg"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2 w-[35rem]">
              <Label className="text-md text-slate-300">Address</Label>
              <Input
                value={profile?.address}
                aria-disabled={true}
                className="text-lg"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2 w-[35rem]">
              <Label className="text-md text-slate-300">Phone number</Label>
              <Input
                value={profile?.phone_number}
                aria-disabled={true}
                className="text-lg"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 my-4">
          <Link to="/">
            <Button variant="outline">Back</Button>
          </Link>
          <Link to="/profile/edit">
            <Button>Edit profile</Button>
          </Link>
        </div>
      </div>
    </LayoutPage>
  );
}
