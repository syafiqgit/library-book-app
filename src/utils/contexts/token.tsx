/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import axiosWithConfig, { setAxiosConfig } from "@/utils/apis/axiosConfig";
import { Profile, getProfile } from "../apis/user";

interface Context {
  token: string;
  user: Partial<Profile>;
  changeToken: (token?: string) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  token: "",
  user: {},
  changeToken: () => {},
};

const TokenContext = createContext<Context>(contextValue);

export function TokenProvider({ children }: Readonly<Props>) {
  const { toast } = useToast();

  const [token, setToken] = useState(localStorage.getItem("item") ?? "");
  const [user, setUser] = useState<Partial<Profile>>({});

  axiosWithConfig.interceptors.response.use(
    (respone: any) => respone,
    (error: { respone: { status: number; }; }) => {
      if (error.respone.status === 401) {
        changeToken();
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    setAxiosConfig(token);
    token !== "" && fetchProfile();
  }, [token]);

  const fetchProfile = useCallback(async () => {
    try {
      const result = await getProfile();
      setUser(result.payload);
    } catch (error: any) {
      toast({
        title: "Opps, something went wrong",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }, [token]);

  const changeToken = useCallback(
    (token?: string) => {
      const NewToken = token ?? "";
      setToken(NewToken);
      if (token) {
        localStorage.setItem("token", NewToken);
      } else {
        localStorage.removeItem("token");
        setUser({});
      }
    },
    [token]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      user,
      changeToken,
    }),
    [token, user, changeToken]
  );

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("Error, useToken must be used within TokenContext");
  }

  return context;
}