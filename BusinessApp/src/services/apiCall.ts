import {DeviceEventEmitter} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance, AxiosError, AxiosResponse} from 'axios';

import {keyAsyncStorage} from 'common/Constants';
import {API_ERROR_CODE} from './errors';

export type RequestConfigProperties = {
  showMessage: boolean;
  showMessageError: boolean;
};

const ApiConfigs: any = {
  // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2d886d1639fa43688b7a81326fb76f23
  baseURL: 'https://newsapi.org/v2/',
  responseType: 'json',
  timeout: 15000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    timeout: 5000,
  },
};

export interface RequestQueueItemProperties {
  id: Number;
  config: RequestConfigProperties;
}

class AxiosClass {
  static instance: AxiosClass;

  static default() {
    if (!AxiosClass.instance) {
      AxiosClass.instance = new AxiosClass();
    }
    return AxiosClass.instance;
  }

  api!: AxiosInstance;
  incrementRequestId = 0;
  requestQueue: Array<RequestQueueItemProperties> = [];
  token = '';

  constructor() {
    this.api = axios.create(ApiConfigs);
    this.api.interceptors.request.use(
      async (config: any) => {
        let token = '';
        let language = 'en';
        try {
          const value = await AsyncStorage.getItem(keyAsyncStorage.TOKEN);
          //   const lang = await AsyncStorage.getItem(keyAsyncStorage.LANGUAGE);
          if (value !== null) {
            token = value;
          }
          //   if (lang !== null) {
          //     language = lang;
          //   }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Lỗi không đọc được token', e);
        }
        if (token) {
          config.headers.Authorization = token;
        }
        if (language) {
          config.headers.lang = language;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    this.api.interceptors.response.use(
      this.interceptorResponses,
      this.handleErrors,
    );
  }

  public setToken(_token: string) {
    this.token = _token;
    this.api.defaults.headers.Authorization = _token;
  }

  clear = () => {
    this.token = '';
    // store.dispatch(AuthActionImp.setToken(''))
    this.api.defaults.headers.common.Authorization = null;
  };

  handleErrors = (error: AxiosError) => {
    console.log('[error]', error);
    let message = '';
    const {response, request} = error;
    console.log('interceptorResponses error response', response);
    console.log('interceptorResponses error request', request);
    // GlobalService.hideLoading();
    if (response) {
      return this.handleErrorOnResponse(response);
    } else if (request) {
      NetInfo.fetch().then(connect => {
        if (!connect.isConnected) {
          console.log('---------not connection');
        } else {
          message = error.message;
        }
        console.log('--------have connection,', error.message);
        return Promise.reject(error);
      });
    } else {
      message = error.message;
    }
    return Promise.reject(error);
  };
  interceptorResponses = (response: AxiosResponse): Promise<any> => {
    return Promise.resolve(response.data);
  };

  getValidateMessage(data: {
    message: string;
    errors: {[key: string]: Array<string>};
  }) {
    try {
      const errors = data.errors;
      if (errors && Object.keys(errors).length !== 0) {
        let listError = Object.keys(errors).map(key => {
          return errors[key].pop();
        });
        // let mess = listError.join('\n');
        let mess = listError[0];
        console.log('-----errors', listError, mess);
        return mess;
      } else {
        return data.message ? data.message : '';
      }
    } catch (error) {
      console.log('----getValidateMessage err', error);
      //return API_ERROR_CODE.VALIDATE.MESSAGE;
    }
  }

  handleErrorOnResponse = (response: AxiosResponse) => {
    const {data, status, config} = response;
    const errMes = this.getValidateMessage(data.data);
    // const errMes = data.data;
    console.log('error', response);
    if (errMes) {
      showMessage({
        message: errMes,
        type: 'danger',
      });

      switch (errMes) {
        case API_ERROR_CODE.MESSAGE.NOT_VERIFY_EMAIL:
          const data = JSON.parse(config.data);
        //   NavigationUtils.navigate(ROUTER.UNAUTHENTICATION.VerificationCode, {
        //     email: data.email,
        //   });
      }
    }

    if (status === 401) {
      DeviceEventEmitter.emit(API_ERROR_CODE.STATUS.UN_AUTHENTICATION, {});
    }

    return Promise.reject(data);
  };

  pushRequestQueue = (config: RequestConfigProperties) => {
    this.incrementRequestId++;
    this.requestQueue.push({
      id: this.incrementRequestId,
      config,
    });
  };

  get<T>(url: string, config: RequestConfigProperties): Promise<T> {
    this.pushRequestQueue(config);
    console.log('GET ->', url);
    return this.api.get(url, {
      headers: {
        _id: this.incrementRequestId,
        ...this.api.defaults.headers,
      },
    });
  }

  del<T>(url: string, config: RequestConfigProperties): Promise<T> {
    this.pushRequestQueue(config);
    console.log('DELETE ->', url);
    return this.api.delete(url, {
      headers: {
        _id: this.incrementRequestId,
        ...this.api.defaults.headers,
      },
    });
  }

  put<T>(
    url: string,
    body: any,
    config: RequestConfigProperties = {
      showMessage: true,
      showMessageError: true,
    },
  ): Promise<T> {
    this.pushRequestQueue(config);
    console.log('PUT ->', url);
    return this.api.put(url, body, {
      headers: {
        _id: this.incrementRequestId,
      },
    });
  }

  postNormal<T>(
    url: string,
    body: any,
    config: RequestConfigProperties = {
      showMessage: true,
      showMessageError: true,
    },
    header: any = {},
  ): Promise<T> {
    this.pushRequestQueue(config);
    console.log('POST-NORMAL ->', url);
    return this.api.post(url, body, {
      headers: {
        _id: this.incrementRequestId,
        ...header,
      },
    });
  }

  postForm<T>(
    url: string,
    body: FormData,
    config: RequestConfigProperties,
  ): Promise<T> {
    this.pushRequestQueue(config);
    console.log('POST-FORM ->', url);
    return this.api.post(url, body, {
      headers: {
        _id: this.incrementRequestId,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default AxiosClass.default();
