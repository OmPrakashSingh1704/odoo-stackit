import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import AnswerCard from '../components/AnswerCard';

export default function QuestionDetail() {
  const { title } = useParams();
  const [answer, setAnswer] = useState('');
  const [showCount, setShowCount] = useState(10);

  // Sample static answers for demonstration
  const answers = [
    {
      id: 1,
      user: 'responder1',
      content: 'Here is how you log in JS:\n\n```javascript\nconsole.log("Hello World");\n```',
    },
    {
      id: 2,
      user: 'responder2',
      content: 'In Python:\n\n```python\nprint("Hello")\n```',
    },
    {
      id: 3,
      user: 'responder3',
      content: '**Bold markdown example**\n\nAnother snippet:\n```cpp\nstd::cout << "Hi";\n```',
    },
    // Add more mock answers if needed...
  ];

  const handleSubmit = () => {
    if (answer.trim()) {
      console.log('Submitted Answer:', answer);
      // TODO: send to backend here
      setAnswer('');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-8">
      {/* Question Title */}
      <h2 className="text-2xl font-bold text-indigo-300 mb-4">
        {decodeURIComponent(title)}
      </h2>

      {/* Render Answers */}
      <div className="mt-6">
        {answers.slice(0, showCount).map((a) => (
          <div key={a.id} className="mb-6">
            <AnswerCard text={a.content} user={a.user} />
          </div>
        ))}

        {showCount < answers.length && (
          <div className="text-center">
            <button
              onClick={() => setShowCount((prev) => prev + 10)}
              className="mt-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
            >
              Show More Answers
            </button>
          </div>
        )}
      </div>

      {/* Editor Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Your Answer</h3>
        <MDEditor
          value={answer}
          onChange={setAnswer}
          height={300}
          preview="edit"
        />
        <p className="text-sm text-gray-400 mt-2">
          Use markdown to format your answer. For code blocks:
          <br />
          <code>```language</code> (e.g. javascript, python, cpp)
          <br />
          <code>console.log("Hello");</code>
          <br />
          <code>```</code>
        </p>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600 px-6 py-2 rounded hover:bg-green-700"
        >
          ✅ Submit Answer
        </button>
      </div>
    </div>
  );
}
