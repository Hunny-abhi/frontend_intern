import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const SingleBlog = function () {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchBlog() {
        try {
          const response = await axios.get(`${API_BASE}/api/v1/blogs/${id}`);
          console.log(response.data);
          setBlog(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchBlog();
    },
    [id]
  );

  async function deleteBlog(id) {
    try {
      await axios.delete(`${API_BASE}/api/v1/blogs/${id}`);
      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h1>
        <Link
          to={"/blogs"}
          className="text-blue-600 'text-white' px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to all blogs
        </Link>
      </div>
    );
  }

  const { author, content, createdAT, tags, title, _id } = blog;

  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* {Header} */}
          <div className="mb-b">
            <Link
              to={"/blogs"}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1"
            >
              <ArrowLeft /> Back to all Blogs..
            </Link>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>

            <div className="flex justify-between items-center text-gray-600 mb-6">
              <div>
                <span className="font-medium">By {author}</span>
                <span className="mx-2">.</span>
                <span>{createdAT}</span>
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                onClick={() => deleteBlog(_id)}
              >
                Delete Blog
              </button>
            </div>
            {/* {tags} */}
            {tags && tags.length > 0 && (
              <div className="mb-6">
                {tags.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold mr-2"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          {/* {content} */}
          <div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {content}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBlog;
