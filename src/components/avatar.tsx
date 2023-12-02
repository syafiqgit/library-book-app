import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from '@/assets/avatar-circle-logo.png'

export default function AvatarUser() {
  return (
    <Avatar>
      <AvatarImage src={avatar} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
