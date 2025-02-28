export type TResponse<T = undefined> = T extends undefined
  ? { message: string | string[]}
  : {
      data: T;
      message: string | string[];
    };
