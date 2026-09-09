import { useFormContext } from 'react-hook-form';

const TextField = ({
  label,
  name,
  register,
  placeholder,
  isRequired,
  rules = {},
  className = '',
  disable = false,
}) => {
  const methods = useFormContext();
  const fieldError = methods?.formState?.errors?.[name];
  // const textareaRef = useRef();

  // const handleResize = () => {
  //   const el = textareaRef.current;
  //   if (el) {
  //     el.style.height = 'auto';
  //     el.style.height = el.scrollHeight + 'px';
  //   }
  // };

  // useEffect(() => {
  //   handleResize();
  // }, []);

  return (
    <div>
      <label className='block mb-2 font-medium text-gray-700'>
        {label} {isRequired && <span className='text-red-500'>*</span>}
      </label>
      <textarea
        {...register(name, { required: isRequired, ...rules })}
        // ref={textareaRef}
        placeholder={placeholder}
        disabled={disable}
        // onInput={handleResize}
        className={
          `w-full border px-3 py-2 rounded resize-none overflow-hidden ${
            fieldError ? 'border-red-400' : 'border-gray-300'
          } ${disable ? 'cursor-not-allowed bg-gray-100' : ''} ` + className
        }
        rows={1}
      />
      {fieldError && (
        <p className='mt-1 text-xs text-red-500'>
          {fieldError.message || `${label} wajib diisi.`}
        </p>
      )}
    </div>
  );
};

export default TextField;
