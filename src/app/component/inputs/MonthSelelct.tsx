// src/components/inputs/MonthSelect.tsx
"use client";
import { generateMonthOptions } from "@/constants/utils/monthOptions";

interface MonthSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const MonthSelect: React.FC<MonthSelectProps> = ({ label, value, onChange }) => {
  const months = generateMonthOptions();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{ fontWeight: 600 }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: "50px", // ✅ Taller
          backgroundColor: "#f9fafb", // ✅ Lighter gray background
          border: "1px solid #e5e7eb", // ✅ Single light gray border
          borderRadius: "0.5rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          fontSize: "1rem",
          color: "#111827",
        }}
      >
        <option value="">Select month</option>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelect;