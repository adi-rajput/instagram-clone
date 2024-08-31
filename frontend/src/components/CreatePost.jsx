import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const {posts} = useSelector((state)=>state.post)
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) {
      formData.append("image", file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPost([res.data.post, ...posts]))
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="flex flex-col gap-3 font-semibold text-center">
          Create new Post
        </DialogHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-sm font-semibold">{user?.username}</h1>
            <span className="text-sm text-gray-500">Bio here...</span>
          </div>
        </div>
        <Textarea
          className="border-none resize-none focus-visible:ring-transparent"
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {imagePreview && (
          <div className="flex items-center justify-center w-full h-64">
            <img
              src={imagePreview}
              alt="preview_img"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        )}
        <input ref={imageRef} type="file" hidden onChange={fileHandler} />
        <Button
          onClick={() => imageRef.current.click()}
          className="mx-auto w-fit hover:bg-blue-500"
        >
          Select Image
        </Button>
        {imagePreview &&
          (loading ? (
            <Button className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              type="submit"
              className="w-full mx-auto hover:bg-blue-500"
            >
              Create Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
