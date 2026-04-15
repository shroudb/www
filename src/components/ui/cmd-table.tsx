type Command = [name: string, args: string, description: string];

type CmdTableProps = {
  commands: Command[];
};

export function CmdTable({ commands }: CmdTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-base-800">
      <table className="w-full text-sm">
        <thead className="bg-base-dark text-left">
          <tr>
            <th className="px-4 py-2.5 font-medium text-base-cream">Command</th>
            <th className="px-4 py-2.5 font-medium text-base-cream">Args</th>
            <th className="px-4 py-2.5 font-medium text-base-cream">Description</th>
          </tr>
        </thead>
        <tbody>
          {commands.map(([name, args, desc]) => (
            <tr
              key={name}
              className="border-t border-base-800 align-top"
            >
              <td className="px-4 py-2.5 font-mono text-base-cream">{name}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-base-500">
                {args || <span aria-hidden>—</span>}
              </td>
              <td className="px-4 py-2.5 text-base-300">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
