import { X } from "lucide-react";
import CommentCard from "./CommentCard";

export const CommentModal = ({ setShowCommentsModal, comments }) => {
  //   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded-lg w-full max-w-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold">Comments</h3>
            <button
              onClick={() => setShowCommentsModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-center text-gray-500">No comments yet</p>
            ) : (
              comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
