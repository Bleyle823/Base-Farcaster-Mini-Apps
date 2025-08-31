import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  onSelect: () => void;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  style?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
}

export default function Select({ value, options, style, optionStyle }: SelectProps) {
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" style={style}>
      <div className="p-2 border rounded bg-white">
        {selectedOption ? (
          <div className="flex items-center justify-between">
            <span>{selectedOption.label}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ) : (
          <span className="text-gray-500">Select option</span>
        )}
      </div>
      
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
        {options.map((option) => (
          <div
            key={option.value}
            className="p-2 hover:bg-gray-50 cursor-pointer"
            onClick={option.onSelect}
            style={optionStyle}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
