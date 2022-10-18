interface ITextInput {
  label?: string;
  addClass?: string;
  type?: string;
  onChange?: any;
}

const TextInput = ({ addClass, label, type, onChange }: ITextInput) => {
  return (
    <span
      className={`relative border-[1px] border-light-grey/60 rounded-md ${
        addClass ?? ''
      }`}
    >
      <span className='absolute px-1 bg-white -translate-y-1/2 left-4 text-light-grey text-sm'>
        {label ?? ''}
      </span>
      <input
        onChange={onChange ?? undefined}
        type={type ?? 'text'}
        className='border-none outline-none w-full h-full rounded-md px-4'
      />
    </span>
  );
};

export default TextInput;
