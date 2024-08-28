import React from "react";
import { Dialog,DialogTrigger,DialogContent } from "./ui/dialog";
import { MessageCircle } from "lucide-react";

const CommentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MessageCircle className="cursor-pointer hover:text-gray-600 " />
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center text-sm text-center">
        <div className="flex items-center justify-between w-full">
          <input
            type="text"
            placeholder="Add a comment"
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
          />
          <button className="text-blue-500">Post</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
