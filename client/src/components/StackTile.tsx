export default function StackTile({ name }: { name: string }) {
  const colors: string[] = [
    "red",
    "yellow",
    "green",
    "blue",
    "teal",
    "orange",
    "amber",
    "cyan",
    "violet",
    "indigo",
    "rose",
  ];
  const color: string = colors[Math.floor(Math.random() * 11)];

  return (
    <section
      className={`w-52 h-64 rounded-xl p-3 flex items-center justify-center `}
      style={{ background: color }}
    >
      <h1 className="text-3xl font-bold text-white">{name}</h1>
    </section>
  );
}
