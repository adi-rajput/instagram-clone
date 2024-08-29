import { setPost } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/post/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setPost(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPost();
  }, [dispatch]); // Added dispatch to dependency array
};

export default useGetAllPost;
