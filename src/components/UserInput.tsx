import React, { useEffect, useRef } from 'react';

interface UserInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
  onEnter: () => void;
  onRemove: () => void;
  index: number;
  totalInputs: number;
  shouldFocus: boolean;
  onDelete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const UserInput: React.FC<UserInputProps> = ({
  value,
  onChange,
  onEnter,
  onRemove,
  index,
  totalInputs,
  shouldFocus,
  onDelete,
  onNext,
  onPrevious,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      // Only select the text if the input is empty
      if (value === '') {
        inputRef.current.select();
      }
    }
  }, [shouldFocus, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === totalInputs - 1) {
        onEnter(); // Create new input and focus it
      } else {
        onNext(); // Just move to next input
      }
    } else if (e.key === 'Delete' && totalInputs > 2) {
      // Add check for minimum inputs
      onDelete();
    } else if (e.key.toLowerCase() === 'n') {
      onNext();
    } else if (e.key.toLowerCase() === 'p') {
      onPrevious();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onChange('');
    } else {
      const num = Number(value);
      if (!isNaN(num) && num >= 0) {
        // Prevent negative numbers
        onChange(num);
      }
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor={`numberInput-${index}`} className="text-sm font-medium text-pink">
          Enter Number
        </label>
        <div className="flex gap-2">
          <input
            id={`numberInput-${index}`} // Unique ID
            ref={inputRef}
            type="number"
            min="0" // Prevent negative numbers
            value={value}
            onChange={handleChange}
            placeholder="Enter amount"
            onKeyDown={handleKeyDown}
            aria-label={`Amount input ${index + 1}`} // Accessibility
            className="flex-1 px-4 py-2 rounded-md border border-gray-300  focus:ring-pink focus:border-pink outline-none shadow-sm"
          />
          <button
            onClick={onRemove}
            disabled={totalInputs <= 2}
            className={`px-3 py-2 rounded-md ${
              totalInputs <= 2 ? 'text-gray-400 cursor-not-allowed' : 'text-pink hover:text-pink-400'
            }`}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
