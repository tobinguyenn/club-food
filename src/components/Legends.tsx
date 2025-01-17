import React from 'react';

const Legends: React.FC = () => {
  const shortcuts = [
    { key: 'Enter', description: 'Next input / Add new' },
    { key: 'N', description: 'Navigate to next input' },
    { key: 'P', description: 'Navigate to previous input' },
    { key: 'Delete', description: 'Remove current input' },
    { key: 'C', description: 'Calculate results' },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 sticky top-8">
      <h2 className="text-md font-medium text-pink mb-4">Keyboard Shortcuts</h2>
      <div className="grid gap-2">
        {shortcuts.map(({ key, description }) => (
          <div key={key} className="flex items-center text-sm">
            <kbd className="px-2 py-1 bg-white border border-pink-300 rounded-md shadow-sm text-xs font-semibold text-pink min-w-[40px] text-center">
              {key}
            </kbd>
            <span className="ml-2 text-gray-600">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legends;
