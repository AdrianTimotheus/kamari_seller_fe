type props = {
  text: string,
}
export default function SectionTitle({ text }:props) {
  return (
    <h6 className="fw-bold mt-1 mb-4">
      {text}
    </h6>
  );
}
