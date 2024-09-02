import { Label } from "@radix-ui/react-label";
import logo from "../assets/pngegg.png";
import React, { useState }   from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/")
        toast.success(res.data.message);
        setInput({ email: "", password: "" });
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
        className="flex flex-col gap-4 p-8 shadow-lg"
      >
        <div>
          {/* <h1 className="text-xl font-bold text-center ">LOGO</h1> */}
          <img src={logo} alt="Logo" className="h-auto ml-[4.5rem] w-36" />
          <p className="text-sm text-center">
            Login to see photos & videos from your friends
          </p>
        </div>
        {/* <div>
          <Label className="py-2 font-medium">UserName</Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="my-2 focus-visible:ring-transparent"
          />
        </div> */}
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
        {
          loading ? (
           <Button>
              <Loader2 className="w-4 h-4 nr-2 animate-spin" />
              Please Wait
           </Button> 
          ) : (
            <Button>Login</Button>
          )
        }     
        <span className="text-center">Don't have an account? <Link to="/signup" className="text-blue-600">SignUp</Link></span>
      </form>
    </div>
  );
};

export default Login;
