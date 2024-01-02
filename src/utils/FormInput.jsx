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
          className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
          required
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="form-check-input checked:bg-green-700 checked:border-green-700 focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
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
          className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
          required
        />
      );
    case "email":
      return (
        <input
          className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
          type="email"
          value={value}
          onChange={onChange}
          required
        />
      );
    case "password":
      return (
        <input
          className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
          type="password"
          value={value}
          onChange={onChange}
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
          className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
          required
        />
      );
  }
};
