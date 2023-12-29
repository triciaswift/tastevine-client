export const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  rows,
  checked,
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
          required
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="form-check-input"
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
    case "file":
      return (
        <input
          type="file"
          name="image"
          onChange={onChange}
          className="form-control"
          required
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
          required
        />
      );
  }
};
