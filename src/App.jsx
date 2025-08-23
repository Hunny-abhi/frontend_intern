import { BrowserRouter, Routes, Route, Link, useParams } from "react-router";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import AllBlogs from "./pages/AllBlogs";
import AddBlog from "./pages/AddBlog";
import SingleBlog from "./pages/SingleBlog";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 ">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
