import sharp from "sharp";
import { Post } from "../models/post_model.js";
import { User } from "../models/user_model.js";
import { Comment } from "../models/comment_model.js";
import cloudinary from "../utils/cloudinary.js";
export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) {
      return res.status(400).json({ message: "Please upload an image." });
    }
    //image upload
    const optimizedImage = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat(".jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImage.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "new post added",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username,profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username,profilePicture",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username,profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username,profilePicture",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const likeKrneWala = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });
    // like logic started
    await post.updateOne({ $addToSet: { likes: likeKrneWala } });
    await post.save();

    //implement socket.io for real time notification

    return res.status(200).json({
      message: "post liked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const dislikeKrneWala = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });
    // like logic started
    await post.updateOne({ $pull: { likes: dislikeKrneWala } });
    await post.save();

    //implement socket.io for real time notification

    return res.status(200).json({
      message: "post disliked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commntKrneWala = req.id;
    const { text } = req.body;
    const post = await Post.findById(postId);
    if (!text) return res.status(400).json({ message: "text required" });

    const comment = await comment
      .create({
        text,
        author: commntKrneWala,
        post: postId,
      })
      .populate({
        path: "author",
        select: "username,profilePicture",
      });
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json({
      message: "comment added successfully",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsofPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({
      post: postId,
    }).populate("author", "username,profilePicture");
    if (!comments) return res.status(404).json({ message: "no comments" });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });

    //check if the logged in user is the owner of the post
    if (post.author.toString() !== authorId)
      return res.status(403).json({ message: "unauthorized" });

    //delete post
    await Post.findByIdAndDelete(postId);
    //remove the postId from user post
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();
    // delete associated comments
    await Comment.deleteMany({ post: postId });
    return res.status(200).json({
      success: true,
      message: "post deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkPost = async (res, req) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });

    const user = await User.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      // already bookmark->remove for bookmarks
      await user.updateOne({ $pull: { bookmarks: post.id } });
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "post unbookmarked" });
    } else {
      //bookmark it
      await user.updateOne({ $addToSet: { bookmarks: post.id } });
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "post bookmarked" });
    }
  } catch (error) {
    console.log(error);
  }
};
