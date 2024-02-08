import { createContext, useState, ReactNode } from "react";

interface UserContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
