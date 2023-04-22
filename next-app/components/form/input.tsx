export default function Input({ title, type, placeholder }: {
  title: string;
  type: 'text';
  placeholder?: string;
}) {
  return (
    <>
      <label>
        <span className="w-1/5 inline-block text-right">
          {title}
        </span>
        :{' '}
        <input
          type={type}
          placeholder={placeholder}
          className="border rounded px-1.5 w-3/5"
        />
      </label>
    </>
  );
}
