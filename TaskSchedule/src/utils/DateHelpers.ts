export const getDistanceBetweenTwoDate = (date1: any, date2: any) => {
  try {
    const newDate1: any = new Date(date1);
    const newDate2: any = new Date(date2);
    const date1_time_stamp = newDate1.getTime();
    const date2_time_stamp = newDate2.getTime();
    const diff = (date1_time_stamp - date2_time_stamp) / 1000 / 3600;
    const checkDayIsToday = newDate1.getDate() === newDate2.getDate();
    const checkMonthIsToday = newDate1.getMonth() === newDate2.getMonth();
    const checkYearIsToday = newDate1.getFullYear() === newDate2.getFullYear();

    if (checkDayIsToday && checkMonthIsToday && checkYearIsToday) {
      if (diff < 0) {
        return 3;
      } else if (diff > 0 && diff <= 24) {
        return 1;
      }
      return 0;
    } else {
      if (diff < 0) {
        return 3;
      } else if (diff > 24 && diff <= 72) {
        return 2;
      }
      return 0;
    }
  } catch (error) {
    console.log(error);
    return -1;
  }
};

export const getDistanceWithToday = (
  date1: any,
  date2: any,
  year: number,
  month: number,
  day: number,
) => {
  try {
    const newDate1: any = new Date(date1);
    const newDate2: any = new Date(date2);
    const date1_time_stamp = newDate1.getTime();
    const date2_time_stamp = newDate2.getTime();
    const diff = (date1_time_stamp - date2_time_stamp) / 1000 / 3600;
    const checkDayIsToday = newDate1.getDate() === day;
    const checkMonthIsToday = newDate1.getMonth() === month;
    const checkYearIsToday = newDate1.getFullYear() === year;
    if (checkDayIsToday && checkMonthIsToday && checkYearIsToday) {
      return 1;
    }
    return 0;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

export const getExpireTaskByDate = (date1: any, date2: any) => {
  try {
    const newDate1: any = new Date(date1);
    const newDate2: any = new Date(date2);
    const date1_time_stamp = newDate1.getTime();
    const date2_time_stamp = newDate2.getTime();
    const diff = (date1_time_stamp - date2_time_stamp) / 1000 / 3600;

    if (diff < 0) {
      return 3;
    } else if (diff > 24 && diff <= 72) {
      return 2;
    }
    return 0;
  } catch (error) {
    console.log(error);
    return -1;
  }
};
