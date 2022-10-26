type props = {
  keyword: string,
  fieldName: string,
  placeholder: string,
  handleChange: Function,
  handleSubmit: any,
}
export default function SearchGroup({
  keyword,
  fieldName,
  placeholder,
  handleChange,
  handleSubmit,
}:props) {
  return (
    <div>
      <div className="input-group mb-3 search-group">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          name={fieldName}
          value={keyword}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button
          className="btn grey-btn"
          type="button"
          onClick={() => handleSubmit()}
        >
          <i className="bi bi-search" />
        </button>
      </div>
    </div>
  );
}
