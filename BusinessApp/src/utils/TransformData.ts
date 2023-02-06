import {monthNames} from 'common/Constants';

export const getDayByMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const dates: any = [];

  if (year && month) {
    while (date.getMonth() === month) {
      const days = weekday[date.getDay()];
      dates.push({
        day: date.getDate(),
        dayOnWeek: days,
        isToday: false,
      });
      date.setDate(date.getDate() + 1);
    }
  }

  return dates;
};

export const formatTxTDate = (date: Date) => {
  try {
    let timeType = '';

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let hour: any = date.getHours();
    if (hour <= 11) {
      timeType = 'AM';
    } else {
      timeType = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }

    if (hour > 9) {
      hour = hour;
    } else {
      hour = `0${hour}`;
    }

    let minutes: any = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    const result = `${hour.toString()}:${minutes.toString()} ${timeType}, ${day} ${
      monthNames[month]
    } ${year}`;

    return result;
  } catch {
    return '';
  }
};

export const renderStatusTxt = (status: string) => {
  if (status === 'onProgress') {
    return 'On Progress';
  } else if (status === 'completed') {
    return 'Completed';
  } else {
    return '';
  }
};

export const formatTxTDateTime = (date: Date) => {
  try {
    let timeType = '';
    let hour: any = date.getHours();

    if (hour <= 11) {
      timeType = 'AM';
    } else {
      timeType = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }

    if (hour > 9) {
      hour = hour;
    } else {
      hour = `0${hour}`;
    }

    let minutes: any = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    const result = [
      hour.toString(),
      minutes.toString(),
      timeType,
      `${hour.toString()}:${minutes.toString()} ${timeType}`,
    ];

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const formatDateTimeToArray = (date: Date) => {
  try {
    let timeType = '';
    let hour: any = date.getHours();

    if (hour <= 11) {
      timeType = 'AM';
    } else {
      timeType = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }

    if (hour > 9) {
      hour = hour;
    } else {
      hour = `0${hour}`;
    }

    let minutes: any = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    const result = [
      hour.toString(),
      minutes.toString(),
      timeType,
      `${hour.toString()} : ${minutes.toString()} ${timeType}`,
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    ];

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const formatTimeToArray = (date: Date) => {
  try {
    let timeType = '';
    let hour: any = date.getHours();

    if (hour <= 11) {
      timeType = 'AM';
    } else {
      timeType = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }

    if (hour > 9) {
      hour = hour;
    } else {
      hour = `0${hour}`;
    }

    let minutes: any = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    const result = [
      hour.toString(),
      minutes.toString(),
      timeType,
      `${hour.toString()}:${minutes.toString()} ${timeType}`,
    ];

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const formatDateToArray = (date: Date) => {
  try {
    let timeType = '';
    let hour: any = date.getHours();

    if (hour <= 11) {
      timeType = 'AM';
    } else {
      timeType = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }

    if (hour > 9) {
      hour = hour;
    } else {
      hour = `0${hour}`;
    }

    let minutes: any = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    const result = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    ];

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};
