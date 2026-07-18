"use client";

type Props = {
  groupByYear: boolean;
  setGroupByYear: (v: boolean) => void;
};

export default function GroupToggle({ groupByYear, setGroupByYear }: Props) {
  return (
    <div className="flex gap-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={groupByYear}
          onChange={(e) => setGroupByYear(e.target.checked)}
        />
        <span>Group by year</span>
      </label>
    </div>
  );
}
