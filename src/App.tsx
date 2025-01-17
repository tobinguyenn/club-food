import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-8 pb-2 flex flex-col items-center justify-between gap-0 lg:gap-64">
      <Calculator />
      <footer className="text-center w-full">Created by Github Copilot Claude 3.5 (Preview)</footer>
    </div>
  );
};

export default App;
