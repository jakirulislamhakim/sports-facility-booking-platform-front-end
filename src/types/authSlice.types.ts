export type TAuthUser = {
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
};
