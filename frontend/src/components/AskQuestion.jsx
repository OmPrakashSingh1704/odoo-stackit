import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function AskQuestion({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const formattedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');

    const payload = {
      title,
      description,
      tags: formattedTags,
      content, // markdown text
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-indigo-300 mb-4">Ask a New Question</h2>
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Close"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief summary of your question"
            rows={3}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, javascript, frontend"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
        </div>

        {/* Markdown Editor */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Your Question</label>
          <MDEditor
            value={content}
            onChange={setContent}
            height={300}
            preview="edit"
          />
          <p className="text-sm text-gray-400 mt-2">
            Use <code>```language</code> for code blocks. Example:<br />
            <code>```js</code><br />
            <code>console.log("Hello")</code><br />
            <code>```</code>
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
}
