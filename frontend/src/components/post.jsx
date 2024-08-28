import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
const Post = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if(inputText.trim())
    {
      setText(inputText);
    }else{
      setText("");
    }
  };
  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <hi>username</hi>
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
      <img
        className="object-cover w-full my-2 rounded-sm aspect-square "
        src="https://images.unsplash.com/photo-1724710152067-f5cda1ed9820?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="post_image"
      />
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <FaRegHeart size={"22px"} className="cursor-pointer" />
          <MessageCircle onClick={()=>setOpen(true)} className="text-sm cursor-pointer " />
          <Send className="cursor-pointer hover:text-gray-600 " />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="block mb-2 font-medium">1k Likes</span>
      <p>
        <span className="mr-2 font-medium">username</span>
        caption
      </p>
      <span onClick={()=>setOpen(true)} className="text-gray-600 cursor-pointer">view all 10 comments</span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Add A Comment...."
          value={text}
          onChange={changeEventHandler}
          className="w-full text-sm outline-none"
        />
        {
          text && <span className="text-[blue]">Post </span>
        }
      </div>
    </div>
  );
};

export default Post;
