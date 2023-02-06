import * as React from 'react';
import {
  NavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(routeName: any, params?: object) {
  navigationRef.current?.navigate(routeName, params);
}

export function reset(routeName: string, params?: object) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
}

export function pop() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

export function popN(n: number) {
  navigationRef.current?.dispatch(StackActions.pop(n));
}

export function replace(routeName: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function push(routeName: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}
