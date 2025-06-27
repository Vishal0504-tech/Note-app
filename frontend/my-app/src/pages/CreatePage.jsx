import { ArrowLeftIcon, FileText, Edit3, Sparkles, BookOpen, Lightbulb } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            {/* Back Button */}
            <Link 
              to="/" 
              className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/50 transition-all duration-300 hover:scale-105 mb-8"
            >
              <ArrowLeftIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-400 group-hover:-translate-x-1 transition-all duration-200" />
              <span className="text-gray-200 font-medium group-hover:text-blue-300">Back to Notes</span>
            </Link>
            
            {/* Hero Section */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Edit3 className="w-9 h-9 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Create New Note
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Transform your thoughts into beautiful notes. Let your creativity flow and capture ideas that matter.
              </p>
            </div>
          </div>

          {/* Main Creation Form */}
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-8 py-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-100">Note Details</h2>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title Input */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-gray-200 font-semibold">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span>Note Title</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Enter a compelling title for your note..."
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-400 text-lg"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Content Textarea */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-gray-200 font-semibold">
                    <Edit3 className="w-5 h-5 text-purple-400" />
                    <span>Note Content</span>
                  </label>
                  <div className="relative group">
                    <textarea
                      placeholder="Pour your thoughts here... Let your creativity flow and bring your ideas to life!"
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-400 resize-none text-lg leading-relaxed"
                      rows={14}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Stats and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-6">
                  {/* Writing Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-700/50 rounded-lg px-4 py-3 border border-gray-600/50">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">Words</span>
                      </div>
                      <div className="text-xl font-bold text-blue-400 mt-1">
                        {wordCount}
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg px-4 py-3 border border-gray-600/50">
                      <div className="flex items-center space-x-2">
                        <Edit3 className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300 text-sm">Characters</span>
                      </div>
                      <div className="text-xl font-bold text-purple-400 mt-1">
                        {charCount}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link 
                      to="/" 
                      className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 font-semibold rounded-xl border border-gray-600 transition-all duration-200 hover:scale-105"
                    >
                      Cancel
                    </Link>
                    
                    <button 
                      type="submit" 
                      className="group flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[160px]" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>Create Note</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Pro Tips Section */}
          <div className="mt-8">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-2">Pro Tips for Better Notes</h3>
                  <p className="text-amber-100/80 leading-relaxed">
                    Use descriptive titles that capture the essence of your note. Organize your thoughts with clear structure, 
                    and don't forget to review and refine your ideas before saving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;