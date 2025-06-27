import { NotebookIcon } from "lucide-react";

const NotesNotFound = () => {
  // Mock Link component for demo
  const Link = ({ to, className, children, ...props }) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center">
        <div className="bg-blue-500/20 rounded-full p-8 border border-blue-500/30">
          <NotebookIcon className="w-12 h-12 text-blue-400" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-white">No notes yet</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Ready to organize your thoughts? Create your first note to get started on your journey.
          </p>
        </div>
        
        <Link 
          to="/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
        >
          Create Your First Note
        </Link>
      </div>
    </div>
  );
};

export default NotesNotFound;