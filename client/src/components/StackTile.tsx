export default function StackTile({ name }: { name: string }) {
  return (
    <section className="w-10 h-16 bg-red-50">
      <h1>{name}</h1>
    </section>
  );
}
