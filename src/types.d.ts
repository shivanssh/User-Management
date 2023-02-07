export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface Paginate {
  page: number;
  limit: number;
}

export interface State {
  isLoading: boolean;
  users: User[];
  error: string;
  isUsersListUpdated: boolean;
  isUserDeleted: boolean;
}

export interface ListParams {
  id?: string;
  [key: string]: any;
}
