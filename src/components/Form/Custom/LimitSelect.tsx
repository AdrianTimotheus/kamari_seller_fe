type props = {
  value: string,
  handleChange: Function
}
export default function LimitSelect({
  value,
  handleChange,
}:props) {
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <span>Data per halaman</span>
      <select
        className="form-select w-auto"
        name="limit"
        value={value}
        onChange={(e) => handleChange(e)}
      >
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
