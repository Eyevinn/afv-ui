type InputProps = {
  value: string;
  placeholder?: string;
  error?: boolean;
  ref?: (el: HTMLInputElement | null) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  value,
  placeholder,
  error,
  ref,
  onKeyDown,
  onChange
}: InputProps) => {
  return (
    <input
      className={`border-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded h-fit w-full font-normal ${error ? 'border-red-500' : 'border-zinc-400'}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={ref}
      onKeyDown={onKeyDown}
    />
  );
};
