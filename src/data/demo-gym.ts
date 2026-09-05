/**
 * Timetable for the Cadence Fitness demo.
 *
 * It sits in its own module because both the page (to render the grid) and the
 * script (to pick out today's column and count what's left today) read it —
 * one schedule, no chance of the two drifting apart.
 */

/** 0 = Sunday, matching JavaScript's Date#getDay(). */
export const days = [
  { index: 1, name: "Monday", short: "Mon" },
  { index: 2, name: "Tuesday", short: "Tue" },
  { index: 3, name: "Wednesday", short: "Wed" },
  { index: 4, name: "Thursday", short: "Thu" },
  { index: 5, name: "Friday", short: "Fri" },
  { index: 6, name: "Saturday", short: "Sat" },
  { index: 0, name: "Sunday", short: "Sun" },
] as const;

export type ClassKind = "strength" | "conditioning" | "mobility";

export type Session = {
  day: number;
  /** 24-hour, "HH:MM" — sorts correctly as a string, which the grid relies on. */
  start: string;
  minutes: number;
  name: string;
  kind: ClassKind;
  coach: string;
};

export const kindLabels: Record<ClassKind, string> = {
  strength: "Strength",
  conditioning: "Conditioning",
  mobility: "Mobility",
};

export const timetable: readonly Session[] = [
  {
    day: 1,
    start: "06:30",
    minutes: 45,
    name: "Barbell Basics",
    kind: "strength",
    coach: "Dee",
  },
  {
    day: 1,
    start: "12:15",
    minutes: 30,
    name: "Lunch Express",
    kind: "conditioning",
    coach: "Ravi",
  },
  {
    day: 1,
    start: "18:00",
    minutes: 60,
    name: "Strength 1",
    kind: "strength",
    coach: "Dee",
  },
  {
    day: 1,
    start: "19:15",
    minutes: 45,
    name: "Conditioning",
    kind: "conditioning",
    coach: "Marta",
  },

  {
    day: 2,
    start: "07:00",
    minutes: 45,
    name: "Metcon",
    kind: "conditioning",
    coach: "Ravi",
  },
  {
    day: 2,
    start: "09:30",
    minutes: 60,
    name: "Mobility & Flow",
    kind: "mobility",
    coach: "Marta",
  },
  {
    day: 2,
    start: "18:00",
    minutes: 60,
    name: "Strength 2",
    kind: "strength",
    coach: "Dee",
  },

  {
    day: 3,
    start: "06:30",
    minutes: 45,
    name: "Barbell Basics",
    kind: "strength",
    coach: "Dee",
  },
  {
    day: 3,
    start: "12:15",
    minutes: 30,
    name: "Lunch Express",
    kind: "conditioning",
    coach: "Ravi",
  },
  {
    day: 3,
    start: "18:00",
    minutes: 60,
    name: "Strength 1",
    kind: "strength",
    coach: "Marta",
  },
  {
    day: 3,
    start: "19:15",
    minutes: 45,
    name: "Engine Room",
    kind: "conditioning",
    coach: "Ravi",
  },

  {
    day: 4,
    start: "07:00",
    minutes: 45,
    name: "Metcon",
    kind: "conditioning",
    coach: "Ravi",
  },
  {
    day: 4,
    start: "09:30",
    minutes: 60,
    name: "Mobility & Flow",
    kind: "mobility",
    coach: "Marta",
  },
  {
    day: 4,
    start: "18:00",
    minutes: 60,
    name: "Strength 2",
    kind: "strength",
    coach: "Dee",
  },

  {
    day: 5,
    start: "06:30",
    minutes: 45,
    name: "Barbell Basics",
    kind: "strength",
    coach: "Dee",
  },
  {
    day: 5,
    start: "12:15",
    minutes: 30,
    name: "Lunch Express",
    kind: "conditioning",
    coach: "Marta",
  },
  {
    day: 5,
    start: "17:30",
    minutes: 45,
    name: "Friday Finisher",
    kind: "conditioning",
    coach: "Ravi",
  },

  {
    day: 6,
    start: "08:00",
    minutes: 60,
    name: "Saturday Squad",
    kind: "conditioning",
    coach: "Dee",
  },
  {
    day: 6,
    start: "09:30",
    minutes: 60,
    name: "Open Gym",
    kind: "strength",
    coach: "Marta",
  },
  {
    day: 6,
    start: "11:00",
    minutes: 45,
    name: "Mobility & Flow",
    kind: "mobility",
    coach: "Marta",
  },

  {
    day: 0,
    start: "10:00",
    minutes: 60,
    name: "Sunday Reset",
    kind: "mobility",
    coach: "Marta",
  },
];

/** "18:00" -> "6.00pm", the way a timetable on a wall would read. */
export const readableTime = (start: string) => {
  const [h, m] = start.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}.${String(m).padStart(2, "0")}${suffix}`;
};

export const sessionsFor = (day: number) =>
  timetable
    .filter((session) => session.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));
