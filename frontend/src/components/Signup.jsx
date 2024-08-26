import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setInput({ username: "", email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={signUpHandler}
        className="flex flex-col gap-5 p-8 shadow-lg"
      >
        <div>
          <h1 className="text-xl font-bold text-center ">LOGO</h1>
          <p className="text-sm text-center">
            SingUp to see photos & videos from your friends
          </p>
        </div>
        <div>
          <Label className="py-2 font-medium">UserName</Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="my-2 focus-visible:ring-transparent"
          />
        </div>
        <div>
          <Label className="py-2 font-medium">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="my-2 focus-visible:ring-transparent"
          />
        </div>
        <div>
          <Label className="py-2 font-medium">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="my-2 focus-visible:ring-transparent"
          />
        </div>
        <Button>Sign Up</Button>
        <span className="text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
      </form>
    </div>
  );
};

export default Signup;
