const InputText = ({ id, placeholder, handleChange, value }) => {
  return (
    <input
      className="m-1 h-12 rounded-lg border-[1px] bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px]"
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputText;
