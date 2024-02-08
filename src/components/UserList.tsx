import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserProvider";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "./ui/use-toast";

const UserList = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const debouncedSearch = useDebounce(user);

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (user === "") {
        setLoading(false);
      } else {
        setLoading(true);
      }

      try {
        if (user) {
          const response = await fetch(
            `https://api.github.com/search/users?q=${debouncedSearch}`
          );
          const data = await response.json();
          setLoading(false);
          if (data.items.length !== 0) {
            setUsersData(data.items.slice(0, 5));
            console.log("First 5 filtered users:", usersData);
            console.log("user length:", user.length);
          } else {
            toast({
              title: "No Users Found!",
            });
            setUsersData([]);
          }
        } else {
          setUsersData([]);
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    fetchData();
  }, [debouncedSearch]);

  return (
    <div>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {usersData &&
        usersData.map((user: any, index: any) => {
          return (
            <div className=" flex-col my-5" key={index}>
              <div className="flex gap-4 items-center">
                <img
                  className=" w-16 h-16 rounded-2xl"
                  src={user.avatar_url}
                  alt=""
                />
                <h1 className=" capitalize font-bold">{user.login}</h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
