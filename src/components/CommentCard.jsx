import React from "react";
import { X, ThumbsUp, ThumbsDown, MessageCircle, User } from "lucide-react";

const CommentCard = ({ comment }) => {
  //   console.log(comment);
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium text-gray-900">
              {comment?.commenterName}
            </h4>
            <span className="text-sm text-gray-500">
              {comment?.commentingTime}
            </span>
          </div>
          <p className="mt-1 text-gray-700">{comment?.comment}</p>
          <div className="mt-2 flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500">
              <ThumbsUp className="w-4 h-4" />
              <span>{comment?.likes || 0}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500">
              <ThumbsDown className="w-4 h-4" />
              <span>{comment?.dislikes || 0}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </div>

          {/* {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-3 space-y-3">
              {comment?.replies.map((reply, i) => (
                <CommentCard key={i} comment={reply} />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
