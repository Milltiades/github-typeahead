import "./App.css";
import UserList from "./components/UserList";
import { Input } from "./components/ui/input";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Input />
      <UserList />
      <Toaster />
    </>
  );
}

export default App;
