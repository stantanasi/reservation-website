export const getWeekDate = (
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  weekOffset = 0,
): Date => {
  const dayIndex = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  }[day];

  const now = new Date();

  const targetTime = now.getDate() - (now.getDay() || 7) + dayIndex + (weekOffset * 7);
  const targetDate = new Date(now.setDate(targetTime));

  return targetDate;
};