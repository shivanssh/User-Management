export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
}

interface PageInfo {
  currentPage: number;
  pageLimit: string;
  searchQuery: string;
  totalPageCount: number;
  sortConfig: {
    key: string;
    direction: string;
  };
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
