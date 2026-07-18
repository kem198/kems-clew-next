"use client";

type Props = {
  groupByYear: boolean;
  setGroupByYear: (v: boolean) => void;
};

export default function GroupToggle({ groupByYear, setGroupByYear }: Props) {
  return (
    <fieldset className="flex items-center gap-4">
      <legend className="sr-only">Grouping</legend>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="group"
          checked={!groupByYear}
          onChange={() => setGroupByYear(false)}
        />
        <span>All</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="group"
          checked={groupByYear}
          onChange={() => setGroupByYear(true)}
        />
        <span>Group by year</span>
      </label>
    </fieldset>
  );
}
