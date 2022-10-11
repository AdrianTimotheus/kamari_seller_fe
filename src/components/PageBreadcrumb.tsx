type props = {
  main: string,
  sub: string,
}
export default function PageBreadcrumb({ main, sub }:props) {
  return (
    <div className="text-white d-flex flex-row gap-2">
      <span>{main}</span>
      <span>&#62;</span>
      <span>{sub}</span>
    </div>
  );
}
