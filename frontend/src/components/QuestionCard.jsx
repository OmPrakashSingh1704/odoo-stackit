import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuestionCard({ title, user, tags = [] }) {
  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState(null); // 'up' | 'down' | null

  const handleUpvote = () => {
    if (userVote === 'up') {
      setVotes((v) => v - 1);
      setUserVote(null);
    } else {
      setVotes((v) => (userVote === 'down' ? v + 2 : v + 1));
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setVotes((v) => v + 1);
      setUserVote(null);
    } else {
      setVotes((v) => (userVote === 'up' ? v - 2 : v - 1));
      setUserVote('down');
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link to={`/question/${encodeURIComponent(title)}`} className="text-lg font-semibold text-indigo-300 hover:underline">
            <h2 className="text-xl font-semibold text-indigo-200">{title}</h2>
          </Link>
          <p className="text-sm text-gray-400 mt-1">
            Asked by <span className="text-indigo-300">@{user}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#e6832d] text-white text-xs font-medium px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Voting UI */}
        <div className="ml-6 flex flex-col items-center bg-gray-700 rounded-xl px-2 py-3">
          <button
            onClick={handleUpvote}
            className={`p-1 rounded-full ${userVote === 'up' ? 'text-green-400' : 'hover:text-green-300'
              }`}
            title="Upvote"
          >
            <ArrowUp size={22} />
          </button>
          <span className="text-white font-semibold my-2">{votes}</span>
          <button
            onClick={handleDownvote}
            className={`p-1 rounded-full ${userVote === 'down' ? 'text-red-400' : 'hover:text-red-300'
              }`}
            title="Downvote"
          >
            <ArrowDown size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
