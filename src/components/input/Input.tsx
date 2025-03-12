import { HTMLInputTypeAttribute } from 'react';

type InputProps = {
  value: string | number;
  placeholder?: string;
  error?: boolean;
  type?: HTMLInputTypeAttribute;
  ref?: (el: HTMLInputElement | null) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type FadeInputProps = {
  value: string | number;
  isEditing?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  value,
  placeholder,
  error,
  type,
  ref,
  onKeyDown,
  onChange
}: InputProps) => {
  return (
    <input
      className={`border-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded h-fit w-full font-normal ${error ? 'border-red-500' : 'border-zinc-400'}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={ref}
      onKeyDown={onKeyDown}
    />
  );
};

export const FadeInput = ({ value, onChange }: FadeInputProps) => {
  return (
    <input
      className={`w-fit bg-zinc-800 border-2 border-zinc-700 text-white py-2 px-4 rounded h-fit font-normal`}
      value={value}
      onChange={onChange}
    />
  );
};
