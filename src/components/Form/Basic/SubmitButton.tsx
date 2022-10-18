type props = {
  text: string,
}

export default function SubmitButton({ text }: props) {
  return (
    <button type="submit" className="btn btn-secondary">
      {text}
    </button>
  );
}
