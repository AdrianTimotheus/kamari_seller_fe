type props = {
  text: string,
}
export default function PageTitle({ text }:props) {
  return (
    <h2 className="text-white fw-bold">
      {text}
    </h2>
  );
}
