export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
}

interface PageInfo {
  pageCount: number;
  pageLimit: string;
  searchQuery: string;
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
