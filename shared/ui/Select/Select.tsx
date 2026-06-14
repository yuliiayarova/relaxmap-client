'use client';

import { useState, useRef, useEffect } from 'react';
import css from './Select.module.css';
import Icon from '../Icon/Icon';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  initialValue?: SelectOption | null;
}

export default function CustomSelect({
  options,
  placeholder = 'Select one...',
  onChange,
  initialValue = null,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    initialValue || null,
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const set = () => setSelectedOption(initialValue);
    set();
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option.value);
  };

  const hasValue = selectedOption && selectedOption.value !== '';

  return (
    <div ref={selectRef} className={css.selectContainer}>
      <button
        type="button"
        className={`${css.selectHeader} ${isOpen ? css.activeHeader : ''} ${selectedOption ? css.hasValue : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{hasValue ? selectedOption.label : placeholder}</span>
        <Icon
          // name={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          name="keyboard_arrow_down"
          className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={css.optionsList}>
          {options.map((option) => {
            const isSelected = selectedOption?.value === option.value;
            return (
              <li
                key={option.value}
                className={`${css.optionItem} ${isSelected ? css.selectedItem : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
