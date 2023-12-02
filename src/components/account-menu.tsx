import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarUser from "./avatar";
import { Link } from "react-router-dom";
import { useToken } from "@/utils/contexts/token";
import { useToast } from "./ui/use-toast";
import { User2Icon, HistoryIcon, LogOutIcon } from "lucide-react";

export default function AccountMenu() {
  const { user, changeToken } = useToken();
  const { toast } = useToast();

  const handleLogout = () => {
    changeToken();
    toast({
      title: "Logout successfully",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 bg-color-card text-white" align="end">
        <DropdownMenuLabel className="text-center">
          Welcome {user.full_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem className="flex gap-1">
            <User2Icon /> Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/books/historyBorrow">
          <DropdownMenuItem className="flex gap-1">
            <HistoryIcon /> History borrow
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="flex gap-1">
          <LogOutIcon /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
