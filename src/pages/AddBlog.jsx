import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { SquarePen } from "lucide-react";

const AddBlog = function () {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newBlog = {
      title: title,
      content: content,
      author: author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };
    console.log(newBlog);
    try {
      setIsLoading(true);
      await axios.post("http://localhost:5000/api/v1/blogs", newBlog);
      console.log("axios is working..");
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      alert("Error creating blog. please try again!!!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto">
      <h1 className=" flex items- center justify - center gap-2 text-4xl text-gray-700 font-bold mb-8 text-center">
        Write a New Blog <SquarePen width={32} />
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
          focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your blog title"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
          focus:ring-blue-200 focus:border-transparent"
            placeholder="your name (optional)"
            value={author}
            onChange={function (e) {
              setAuthor(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          {/* <textarea>
            <input
              type="text"
              id="content"
              name="content"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
          focus:ring-blue-200 focus:border-transparent"
              placeholder="write your blog content here...."
              value={content}
              onChange={function (e) {
                setContent(e.target.value);
              }}
            />
          </textarea> */}

          <textarea
            id="content"
            name="content"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
          focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter tags separated by commas (e.g., technology,react,programming)"
            value={tags}
            onChange={function (e) {
              setTags(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isloading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isloading ? "publishing blog..." : "publish blog"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBlog;
