type props = {
  main: string,
  sub: string,
}
export default function PageBreadcrumb({ main, sub }:props) {
  return (
    <div className="breadcrumb">
      <span>{main}</span>
      <span>&#62;</span>
      <span>{sub}</span>
    </div>
  );
}
