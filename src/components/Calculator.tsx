import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { calculatePayment } from '../utils/calculations';
import Legends from './Legends';
import Results from './Results';
import UserInput from './UserInput';

const Calculator: React.FC = () => {
  const [fee, setFee] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [userInputs, setUserInputs] = useState<(number | '')[]>(['', '']);
  const [results, setResults] = useState<number[]>([]);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const handleCalculate = useCallback(() => {
    if (fee === null || discount === null) {
      alert('Please enter fee and discount values');
      return;
    }

    if (userInputs.every((input) => input === '')) {
      alert('Please enter at least one amount');
      return;
    }

    const validInputs = userInputs.map((input) => (typeof input === 'number' ? input : 0));
    const calculatedResults = validInputs.map((input) => calculatePayment(input, fee, discount, validInputs));
    setResults(calculatedResults);
  }, [fee, discount, userInputs]);

  // Memoize validation state
  const isValid = useMemo(() => {
    return fee !== null && discount !== null && userInputs.some((input) => input !== '');
  }, [fee, discount, userInputs]);

  // Clean up effect
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c' && isValid) {
        handleCalculate();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleCalculate, isValid]);

  const handleUserInputChange = (index: number, value: number | '') => {
    const newUserInputs = [...userInputs];
    newUserInputs[index] = value;
    setUserInputs(newUserInputs);
  };

  const handleAddUserInput = () => {
    const newIndex = userInputs.length;
    setUserInputs([...userInputs, '']);
    setFocusIndex(newIndex);
  };

  const handleRemoveUserInput = (index: number) => {
    const newUserInputs = userInputs.filter((_, i) => i !== index);
    setUserInputs(newUserInputs);

    // Focus on previous input after deletion
    const newFocusIndex = index === 0 ? 0 : index - 1;
    setFocusIndex(newFocusIndex);
  };

  const handleReset = () => {
    setFee(null);
    setDiscount(null);
    setUserInputs(['', '']);
    setResults([]);
    setFocusIndex(null);
  };

  const handleNavigateNext = (currentIndex: number) => {
    const nextIndex = currentIndex === userInputs.length - 1 ? 0 : currentIndex + 1;
    setFocusIndex(nextIndex);
  };

  const handleNavigatePrevious = (currentIndex: number) => {
    const previousIndex = currentIndex === 0 ? userInputs.length - 1 : currentIndex - 1;
    setFocusIndex(previousIndex);
  };

  // Add total sum calculation
  const totalSum = useMemo(() => {
    const validInputs = userInputs.map((input) => (typeof input === 'number' ? input : 0));
    return validInputs.reduce((sum, curr) => sum + curr, 0);
  }, [userInputs]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6 justify-center lg:justify-end items-center lg:items-start">
        {/* Main calculator container */}
        <div className="w-full max-w-[600px] p-4 sm:p-6 bg-white rounded-lg shadow-lg space-y-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-pink">Club Food</h1>

          {/* Rest of the calculator content */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-pink">Fee: </label>
            <input
              autoFocus
              type="number"
              value={fee ?? ''}
              onChange={(e) => setFee(Number(e.target.value))}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink focus:border-pink sm:text-sm"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-pink">Discount: </label>
            <input
              type="number"
              value={discount ?? ''}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink focus:border-pink sm:text-sm"
            />
          </div>
          <hr />
          {userInputs.map((input, index) => (
            <UserInput
              key={index}
              value={input}
              onChange={(value) => handleUserInputChange(index, value)}
              onEnter={handleAddUserInput}
              onRemove={() => handleRemoveUserInput(index)}
              onDelete={() => handleRemoveUserInput(index)}
              onNext={() => handleNavigateNext(index)}
              onPrevious={() => handleNavigatePrevious(index)}
              index={index}
              totalInputs={userInputs.length}
              shouldFocus={focusIndex === index}
            />
          ))}

          {/* Add total sum display */}
          {totalSum > 0 && <div className="text-right text-sm text-pink">Total: {totalSum.toLocaleString()}</div>}

          <div className="flex space-x-4">
            <button
              onClick={handleReset}
              className="w-full inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-lg text-pink bg-white border-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
            >
              Reset
            </button>
            <button
              onClick={handleCalculate}
              disabled={!isValid}
              className={`w-full inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-lg text-white ${
                isValid ? 'bg-pink hover:bg-pink-400' : 'bg-gray-300 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400`}
            >
              Calculate
            </button>
          </div>
          <Results userInputs={userInputs} results={results} showResults={results.length > 0} />
        </div>

        {/* Legends */}
        <div className="w-full max-w-[320px] lg:sticky lg:top-8 lg:h-fit">
          <Legends />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
