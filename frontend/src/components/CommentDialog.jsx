import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { MessageCircle, MoreHorizontal, User } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const changeHandler = (e) => {
    const inputText=(e.target.value);
    if(inputText.trim()){
      setText(inputText);
    }else{
      setText("");
    }
  };
  const sendMessageHandler = () => {
    if(text.trim()){
      setText("");
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="flex flex-col max-w-5xl p-8"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1724710152067-f5cda1ed9820?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="post_img"
              className="object-cover w-full h-full rounded-l-lg"
            />
          </div>
          <div className="flex flex-col justify-between w-1/2">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Link>
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1724710152067-f5cda1ed9820?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="text-xs font-semibold">username</Link>
                  {/* <span className="text-sm text-gray-500">Bio Here...</span> */}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <Button
                    variant="ghost"
                    className="cursor-pointer w-fit text-[#ED4956] font-bold"
                  >
                    Unfollow
                  </Button>
                  <Button variant="ghost" className="cursor-pointer w-fit ">
                    Add to favorites
                  </Button>
                  <Button variant="ghost" className="cursor-pointer w-fit ">
                    Delete
                  </Button>
                  <Button variant="ghost" className="cursor-pointer w-fit ">
                    Report
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 p-4 overflow-y-auto max-h-96">
              comments 
            </div>
            <div className="flex items-center justify-between">
              <input onChange={changeHandler} value={text} type="text" placeholder="Add a comment..." className="w-full p-2 mx-2 border border-gray-300 rounded-md outline-rounded"/>
              <Button onClick={sendMessageHandler} variant="secondary" className="text-sm font-semibold">Post</Button>
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
