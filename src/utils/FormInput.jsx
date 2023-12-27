export const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  rows,
  checked,
  className,
}) => {
  switch (type) {
    case "textarea":
      return (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="form-control"
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={className}
        />
      );
    case "search":
      return (
        <input
          type="search"
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
        />
      );
    default:
      return (
        <input
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="form-control"
        />
      );
  }
};
