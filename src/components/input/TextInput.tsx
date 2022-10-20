import { ChangeEvent, useEffect, useState } from 'react';

interface ITextInput {
  label?: string;
  addClass?: string;
  type?: string;
  onChange: any;
  amount: number;
}

const TextInput = ({ addClass, label, type, onChange, amount }: ITextInput) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState(amount);

  useEffect(() => {
    if (focus) return;
    onChange(value);
    return () => {};
  }, [focus]);

  return (
    <span
      className={`relative border-[1px] ${
        focus ? 'border-blue/60' : 'border-light-grey/60'
      } transition-all duration-150 rounded-md ${addClass ?? ''}`}
    >
      <span className='absolute px-1 bg-white -translate-y-1/2 left-4 text-light-grey text-sm'>
        {label ?? ''}
      </span>
      <input
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(Number(e.target.value))
        }
        type={type ?? 'text'}
        className='border-none outline-none w-full h-full rounded-md px-4'
      />
    </span>
  );
};

export default TextInput;
