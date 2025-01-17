import React from 'react';

interface ResultsProps {
  userInputs: (number | '')[];
  results: number[];
  showResults: boolean;
}

const Results: React.FC<ResultsProps> = ({ userInputs, results, showResults }) => {
  if (!showResults) return null;

  return (
    <div className="mt-8">
      <hr className="mb-6 border-t border-gray-200" />
      <table className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">Input</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">Result</th>
          </tr>
        </thead>
        <tbody>
          {userInputs.map((input, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-pink-50`}>
              <td className="px-4 py-3 border-b border-gray-200">{input === '' ? '-' : input.toLocaleString()}</td>
              <td className="px-4 py-3 border-b border-gray-200">{results[index].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
