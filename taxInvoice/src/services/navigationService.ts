import * as React from "react";
import { StackActions } from "@react-navigation/native";

export const navigationRef: any = React.createRef();
export const isReadyRef: any = React.createRef();

export function push(...args: any) {
  navigationRef.current?.dispatch(StackActions.push(args));
}
export function goBack(...args: any) {
  navigationRef.current?.goBack();
}
export function navigate(name: string, params?: object) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    setTimeout(() => {
      navigationRef?.current?.navigate(name, params);
    }, 600);
  }
}
