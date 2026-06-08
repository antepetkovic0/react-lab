export type TokenExchangeResult =
  | {
      status: "success";
      title: string;
      description: string;
      accessToken: string;
      idToken: string;
    }
  | {
      status: "error";
      title: string;
      description: string;
    };
