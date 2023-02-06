// import { ICalendarDate, ICurrentDate } from "@interfaces";
import {API_URL} from 'common/ApiUrl';
import Constants from 'common/Constants';
import api, {RequestConfigProperties} from './apiCall';

// export function getNews(
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   },
// ): any {
//   const URL = API_URL.APP.DASHBOARD;
//   return api.get(URL, config);
// }

export function getNews(
  country: string,
  category: string,
  page: number,
  pageSize: number,
  config: RequestConfigProperties = {
    showMessage: false,
    showMessageError: true,
  },
): any {
  const URL = `${API_URL.NEW.TOP_HEADLINES}?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${Constants.apiKey}`;
  return api.get(URL, config);
}

// export function getListCategories(
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   },
// ): any {
//   const URL = API_URL.APP.LIST_CATEGORIES;
//   return api.get(URL, config);
// }

// // Api of Vams

// export function vamsDetail(
//   id: number | string,
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   },
// ): any {
//   const URL = `${API_URL.APP.VAM_DETAIL}${id}/confirm`;
//   return api.get(URL, config);
// }

// export function vamsConfirm(
//   id: number | string,
//   type: number,
//   message: string,
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   },
// ): any {
//   const URL = `${API_URL.APP.VAM_DETAIL}${id}/confirm?confirm=${type}&message=${message}`;
//   return api.get(URL, config);
// }

// export function getListVamRelated(
//   page?: number,
//   filterSearch?: any,
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   },
// ): any {
//   const URL = `${API_URL.APP.LIST_VAM_RELATED}`;
//   let stringSearch = '';
//   if (page) {
//     stringSearch += `&page=${page}`;
//   }
//   if (filterSearch?.state) {
//     stringSearch += `&state=${filterSearch?.state}`;
//   }
//   if (filterSearch?.dateFrom) {
//     stringSearch += `&date_from=${filterSearch?.dateFrom}`;
//   }
//   if (filterSearch?.dateTo) {
//     stringSearch += `&date_to=${filterSearch?.dateTo}`;
//   }
//   if (filterSearch?.projectId) {
//     stringSearch += `&project_id=${filterSearch?.projectId}`;
//   }
//   if (filterSearch?.purposeCategory) {
//     stringSearch += `&purpose_category=${filterSearch?.purposeCategory}`;
//   }

//   return api.get(`${URL}${stringSearch}`, config);
// }

// export function checkInCalendar(
//   params: ICurrentDate,
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   }
// ): any {
//   const URL = API_URL.APP.CHECK_IN_CALENDAR + `?month=${params.month}&year=${params.year}`;

//   return api.get(URL, config);
// }

// export function checkInDetail(
//   params: ICalendarDate,
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   }
// ): any {
//   const URL = API_URL.APP.CHECK_IN_DETAIL + `?date=${params}`;
//   return api.get(URL, config);
// }

// export function listUserInPJ(
//   id: number | string,
//   config: RequestConfigProperties = {
//     showMessage: false,
//     showMessageError: true,
//   },
// ): any {
//   const URL = API_URL.APP.LIST_USER_IN_PJ + `/${id}/users`;
//   return api.get(URL, config);
// }
