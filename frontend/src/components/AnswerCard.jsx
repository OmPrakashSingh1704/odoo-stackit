import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function AnswerCard({ text, user }) {
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
    <div className="bg-gray-700 p-4 rounded-lg shadow flex justify-between items-start">
      {/* Answer Text */}
      <div className="flex-1">
        <MDEditor.Markdown
          source={text}
          style={{ backgroundColor: '#374151', color: '#f9fafb', padding: '0.5rem', borderRadius: '0.5rem' }}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
        <p className="text-sm text-gray-400 mt-2">
          Answered by <span className="text-indigo-400">@{user}</span>
        </p>
      </div>

      {/* Voting UI */}
      <div className="ml-6 flex flex-col items-center bg-gray-800 rounded-xl px-2 py-3">
        <button
          onClick={handleUpvote}
          className={`p-1 rounded-full ${
            userVote === 'up' ? 'text-green-400' : 'hover:text-green-300'
          }`}
          title="Upvote"
        >
          <ArrowUp size={22} />
        </button>
        <span className="text-white font-semibold my-2">{votes}</span>
        <button
          onClick={handleDownvote}
          className={`p-1 rounded-full ${
            userVote === 'down' ? 'text-red-400' : 'hover:text-red-300'
          }`}
          title="Downvote"
        >
          <ArrowDown size={22} />
        </button>
      </div>
    </div>
  );
}
