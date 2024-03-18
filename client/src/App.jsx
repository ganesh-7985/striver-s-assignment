import React, { useState, useEffect } from 'react';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    codeLanguage: '',
    stdin: '',
    sourceCode: ''
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const response = await fetch('http://localhost:5050/submissions');
    const data = await response.json();
    setSubmissions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5050/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      console.log('Submission successful');
      fetchSubmissions();
      setFormData({
        username: '',
        codeLanguage: '',
        stdin: '',
        sourceCode: ''
      });
    } else {
      console.error('Submission failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Code Snippet Submission</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
            <input type="text" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codeLanguage">Code Language:</label>
            <input type="text" id="codeLanguage" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.codeLanguage} onChange={e => setFormData({ ...formData, codeLanguage: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stdin">Standard Input:</label>
            <input type="text" id="stdin" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.stdin} onChange={e => setFormData({ ...formData, stdin: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sourceCode">Source Code:</label>
            <textarea id="sourceCode" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.sourceCode} onChange={e => setFormData({ ...formData, sourceCode: e.target.value })} />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </form>
        <h2 className="text-2xl font-semibold text-center mb-4">Submitted Entries</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Username</th>
                <th className="text-left py-2">Code Language</th>
                <th className="text-left py-2">Standard Input</th>
                <th className="text-left py-2">Source Code (Short)</th>
                <th className="text-left py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{submission.username}</td>
                  <td className="border px-4 py-2">{submission.code_language}</td>
                  <td className="border px-4 py-2">{submission.stdin}</td>
                  <td className="border px-4 py-2">{submission.source_code_short}</td>
                  <td className="border px-4 py-2">{submission.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
