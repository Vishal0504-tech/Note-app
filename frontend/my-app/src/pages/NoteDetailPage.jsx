import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon, EditIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gray-800 rounded-full shadow-lg flex items-center justify-center border border-gray-700">
              <LoaderIcon className="animate-spin w-8 h-8 text-blue-400" />
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-800/30 animate-pulse opacity-75"></div>
          </div>
          <p className="text-gray-300 font-medium">Loading your note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Header with glassmorphism effect */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-gray-900/70 border-b border-gray-700/50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800/80 hover:bg-gray-700 shadow-lg border border-gray-600/50 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeftIcon className="h-4 w-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
              <span className="text-gray-200 font-medium group-hover:text-blue-300">Back to Notes</span>
            </Link>
            
            <button 
              onClick={handleDelete} 
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-red-900/50 hover:bg-red-800/70 text-red-300 hover:text-red-200 border border-red-700/50 transition-all duration-200 hover:scale-105"
            >
              <Trash2Icon className="h-4 w-4" />
              <span className="font-medium">Delete Note</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Note Editor Card */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-700 px-8 py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <EditIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Edit Note</h1>
                  <p className="text-blue-100 text-sm">Make your changes below</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Note Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your note title..."
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-100 placeholder-gray-400"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-focus-within:opacity-10 transition-opacity pointer-events-none"></div>
                </div>
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Note Content
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Start writing your note here..."
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-100 placeholder-gray-400 resize-none"
                    rows="12"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-focus-within:opacity-10 transition-opacity pointer-events-none"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4">
                <button 
                  className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                  disabled={saving} 
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <LoaderIcon className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <SaveIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;