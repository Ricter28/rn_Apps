export const getCurrentState = async (useState: any): Promise<any> => {
  return new Promise((rs, rj) => {
    useState((pre: any) => {
      rs(pre);
      return pre;
    });
  });
};
