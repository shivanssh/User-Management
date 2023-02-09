export interface User {
  id: number;
  name: string;
  age: string;
  email: string;
  address: string;
}

export interface PageInfo {
  currentPage: number;
  pageLimit: string;
  searchQuery: string;
  totalPageCount: number;
  sortConfig: sortConfig;
}

export interface sortConfig {
  key: string;
  direction: string;
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
