import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import AskQuestion from '../components/AskQuestion';

export default function ForumPage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  const questions = [...Array(25)].map((_, index) => ({
    id: index + 1,
    title: `Sample Question ${index + 1}`,
    user: `user${index + 1}`,
    tags: ['javascript', 'react'],
  }));

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const paginated = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );


  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'answered') return matchesSearch && q.answers.length > 0;
    if (filter === 'unanswered') return matchesSearch && q.answers.length === 0;
    return matchesSearch;
  });

  const handleSubmitQuestion = (blocks) => {
    console.log('New Question:', blocks);
    // TODO: Send to backend
  };

  return (
    <div className="min-h-screen bg-[#2e2e2e] text-white px-6 py-8">

      {showModal && (
        <AskQuestion
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitQuestion}
        />
      )}

      <div className=" text-white">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-[#2e2e2e]">
          <div className="text-2xl font-bold text-indigo-400">StackIt</div>
          <div className="space-x-4">
            <button className="bg-indigo-600 px-4 py-1 rounded hover:bg-indigo-500">Login</button>
            <button className="bg-gray-700 px-4 py-1 rounded hover:bg-gray-600">Sign Up</button>
          </div>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search questions..."
              className="bg-gray-800 text-white px-4 py-2 rounded-xl w-full sm:w-64 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-xl border border-gray-700"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Unanswered</option>
            </select>
            <button onClick={() => setShowModal(true)} className="bg-[#e36e2a] text-white px-4 py-2 rounded-xl hover:bg-[#ea8a53]">
              Ask New Question
            </button>
          </div>
        </div>

        {paginated.map((q, idx) => (

          <div key={idx} className='mb-5'>
            <QuestionCard title={q.title} user={q.user} tags={q.tags} />
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Scroll to top
              }}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
