import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {isRateLimited && <RateLimitedUI />}

        <div className="max-w-7xl mx-auto p-6 mt-8">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="relative mb-8">
                  {/* Outer ring */}
                  <div className="w-20 h-20 rounded-full border-4 border-gray-700 absolute animate-pulse"></div>
                  {/* Inner spinning ring */}
                  <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
                  {/* Center dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xl font-semibold text-gray-200">Loading your notes...</div>
                  <div className="text-gray-400">Fetching your latest thoughts and ideas</div>
                </div>
                
                {/* Loading dots animation */}
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {notes.length === 0 && !loading && !isRateLimited && (
            <div className="relative">
              <NotesNotFound />
            </div>
          )}

          {/* Notes Grid */}
          {notes.length > 0 && !loading && !isRateLimited && (
            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Your Notes
                  </span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  {notes.length === 1 
                    ? "You have 1 note in your collection" 
                    : `You have ${notes.length} notes in your collection`
                  }
                </p>
              </div>

              {/* Notes Grid with Staggered Animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.map((note, index) => (
                  <div 
                    key={note._id} 
                    className="group transform transition-all duration-500 hover:scale-105 hover:z-10 relative"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInUp 0.6s ease-out forwards'
                    }}
                  >
                    {/* Card glow effect on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    
                    {/* Note Card Container */}
                    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                      <NoteCard note={note} setNotes={setNotes} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Initially hide cards for staggered animation */
        .grid > div {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HomePage;