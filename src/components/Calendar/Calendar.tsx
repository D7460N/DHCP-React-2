"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, TrendingUp } from "lucide-react";
import clsx from "clsx";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Tooltip
} from "recharts";

type Event = {
  title: string;
  time: string;
};

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const events: Record<string, Event[]> = {
  "2025-06-11": [
    { title: "Team Sync Meeting", time: "9am - 10am" },
    { title: "Design Review", time: "11:30am - 12:30pm" },
    { title: "Client Presentation", time: "2pm - 3pm" },
  ],
};

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()));
  const currentMonth = 5; // June (0-indexed)
  const currentYear = 2025;
  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);

  const parseSelectedDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  return (
  <div className="flex flex-col p-6">
    <div className="flex flex-col gap-4">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center text-sm font-medium px-2">
          <ChevronLeft className="w-4 h-4 cursor-pointer" />
          <span>June 2025</span>
          <ChevronRight className="w-4 h-4 cursor-pointer" />
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d}>{d}</div>
          ))}
          {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={clsx(
                  "w-8 h-8 rounded-full text-sm",
                  isSelected ? "bg-sky-800 text-white" : "hover:bg-gray-200"
                )}
                >
                {day}
                </button>
            );
          })}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-sm font-medium mb-2">
              <span>
                {parseSelectedDate(selectedDate).toLocaleDateString("en-US", { dateStyle: "long" })}
              </span>
              <button className="text-gray-500 hover:text-black">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {events[selectedDate]?.map((event, i) => (
                <div key={i} className="bg-primary/50 text-sky-800 rounded-md p-2 text-sm">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-sky-800">
                    {parseSelectedDate(selectedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}, {event.time}
                  </div>
                </div>
              )) || <p className="text-xs text-gray-500">No events</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
