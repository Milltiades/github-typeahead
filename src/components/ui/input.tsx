import * as React from "react";

import { cn } from "@/lib/utils";

import { UserContext } from "@/context/UserProvider";
import { useContext, ChangeEvent } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { user, setUser } = useContext(UserContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUser(e.target.value);
      console.log(user);
    };

    return (
      <>
        <h1 className=" font-extrabold my-5">Find GitHub Users!</h1>
        <input
          onChange={handleChange}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
