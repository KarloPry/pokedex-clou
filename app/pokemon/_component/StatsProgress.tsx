import { Progress } from "@nextui-org/react";

export default function StatsProgress({
  value,
  category,
}: {
  value: any;
  category: string;
}) {
  return (
    <div>
      <h1 className="text-xl py-2">
        {category}: {value}
      </h1>
      <div className="rounded-lg border-2 border-zinc-400 p-1">
        <Progress
          id={"progress"}
          classNames={{
            base: "w-full",
            track: "bg-white h-6",
          }}
          size="lg"
          value={value}
          maxValue={255}
          minValue={1}
        />
      </div>
    </div>
  );
}
