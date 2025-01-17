import React from 'react';

interface ResultsProps {
  userInputs: (number | '')[];
  results: number[];
  showResults: boolean;
}

const Results: React.FC<ResultsProps> = ({ userInputs, results, showResults }) => {
  if (!showResults) return null;

  const formatNumber = (value: number | '' | undefined): string => {
    if (value === '' || value == null) return '-';
    return value.toLocaleString();
  };

  // Only show rows with valid inputs
  const validRows = userInputs
    .map((input, index) => ({ input, result: results[index], index }))
    .filter((row) => typeof row.input === 'number' && row.input > 0);

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
          {validRows.map(({ input, result, index }) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-pink-50`}>
              <td className="px-4 py-3 border-b border-gray-200">{formatNumber(input)}</td>
              <td className="px-4 py-3 border-b border-gray-200">{formatNumber(result)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
