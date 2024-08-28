import React from "react";
import { Dialog,DialogTrigger,DialogContent } from "./ui/dialog";
import { MessageCircle } from "lucide-react";

const CommentDialog = ({open, setOpen}) => {
  return (
    <Dialog open={open} >
      <DialogContent onInteractOutside={()=>setOpen(false)}>
       <img src="https://images.unsplash.com/photo-1724710152067-f5cda1ed9820?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="post_img" />
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
