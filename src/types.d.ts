export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export type Userstate = {
  name: string;
  email: string;
  address: string;
};

export type State = {
  isLoading: boolean;
  users: User[];
  error: string;
};
