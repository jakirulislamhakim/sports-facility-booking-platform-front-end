type TErrorSource = {
  path: string;
  message: string;
};

// This error response type represents the structure of the 
// error object returned by the backend when an API call fails.
export type TApiErrorResponse = {
  data: {
    errorSources: TErrorSource[];
    message?: string;
    success: boolean;
    status: number;
  };
};


export type TApiArgQuery =
  | {
      name: string;
      value: string;
    }[]
  | undefined;
