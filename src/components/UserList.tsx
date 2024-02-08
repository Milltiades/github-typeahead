import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserProvider";
import { useDebounce } from "@/hooks/useDebounde";

const UserList = () => {
  const [usersData, setUsersData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const debouncedSearch = useDebounce(user);

  useEffect(() => {
    const fetchData = async () => {
      if (user === "") {
        setLoading(false);
      } else {
        setLoading(true);
      }

      try {
        if (user.length > 0) {
          const response = await fetch(
            `https://api.github.com/search/users?q=${debouncedSearch}`
          );
          const data = await response.json();
          setLoading(false);
          if (data.items.length !== 0) {
            setUsersData(data.items.slice(0, 5));
            console.log("First 5 filtered users:", usersData);
            console.log("user length:", user.length);
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
      {loading && <div>Loading...</div>}
      {usersData &&
        usersData.map((user: any, index: any) => {
          return <div key={index}>{user.login}</div>;
        })}
    </div>
  );
};

export default UserList;
