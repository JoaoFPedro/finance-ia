"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useRouter, useSearchParams } from "next/navigation";
const TimeSelect = () => {
  const MONTH_OPTIONS = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const onMonthChange = (month: string) => {
    push(`/?month=${month}`);
  };
  return (
    <>
      <Select
        onValueChange={(value) => onMonthChange(value)}
        defaultValue={month ?? ""}
      >
        <SelectTrigger className="w-[100px] rounded-full font-bold">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {MONTH_OPTIONS.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default TimeSelect;
