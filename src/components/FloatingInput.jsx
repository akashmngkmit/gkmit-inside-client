import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * A reusable input component that implements the Floating Label pattern.
 * The label sits inside the input field and floats to the top when focused or filled.
 */
export const FloatingInput = ({ id, label, type = 'text', value, onChange, disabled, required, className = '', ...props }) => {
  // Check if the input has content (to keep the label floated)
  const isFilled = value && value.toString().length > 0;
  // Track focus state
  const [isFocused, setIsFocused] = useState(false);

  // Determine the floating state
  const isFloating = isFilled || isFocused;

  // Renders the input and label in a relative container
  return (
    <div className={`relative ${className}`}>
      
      {/* Label Component */}
      <Label
        htmlFor={id}
        // Tailwind classes for the modern floating transition
        className={`
          absolute left-3 transition-all duration-200 ease-in-out cursor-text
          pointer-events-none text-gray-500
          
          ${isFloating
            // State when floated (smaller, higher, darker text)
            ? 'top-[-10px] text-xs px-1 bg-white z-10 text-gray-600' 
            // State when resting (larger, centered text)
            : 'top-1/2 -translate-y-1/2 text-base'
          }
        `}
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </Label>
      
      {/* Input Component (must have specific padding to allow label space) */}
      <Input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        required={required}
        // Ensure the input has enough vertical padding (py-3) to fit the resting label
        className="pt-6 pb-2 placeholder-transparent focus:placeholder-gray-500"
        {...props}
      />
    </div>
  );
};