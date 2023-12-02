import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import AccountMenu from "./account-menu";
import { useToken } from "@/utils/contexts/token";
import CartBook from "./cart-books";

export function Navbar() {
  const { token, user } = useToken();
  return (
    <nav className="w-full sticky top-0 z-50 bg-color-primary shadow-lg">
      <div className="mx-auto container items-center justify-between p-4 flex">
        <Link to="/">
          <p className="font-bold text-2xl text-white">BookVerse</p>
        </Link>
        {token ? (
          <div className="flex items-center gap-4">
            {user.role === "user" && (
              <>
                <Link to="/books/historyBorrow">
                  <Button variant="outline">History Borrow</Button>
                </Link>
                <CartBook />
              </>
            )}
            <AccountMenu />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
