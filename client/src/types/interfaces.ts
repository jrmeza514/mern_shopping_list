export enum E_Error {
  LOGING_FAILED = 'LOGIN_FAILED',
  REGISTER_FAILED = 'REGISTER_FAILED'
}

export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// AUTH
export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILoginModal extends IAuthForm {
  login(user: IUser): void;
}

export interface IRegisterModal extends IAuthForm {
  register(user: IUser): void;
}

export interface ILogoutProps {
  logout(): void;
}

export interface IError {
  id: E_Error;
  msg: string;
}

export type UserPrefTheme = "THEME_LIGHT" | "THEME_DARK";

export interface IUserPrefs {
  theme: UserPrefTheme
}
export interface IUserState {
  name: string,
  userPrefs: IUserPrefs
}

export interface IAuthReduxProps {
  auth: {
    isAuthenticated: boolean;
    user: IUserState
  };
  error: IError;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// NAVBAR
export interface IAppNavbar {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };

}

// ITEMS
export interface IExistingItem {
  _id: string;
  name: string;
}

export interface IExistingList {
  _id: string;
  title: string;
  items: []
}

export interface IItem {
  _id?: string;
  name: string;
}

export interface IList {
  _id?: string;
  title: string
}

export interface IItemModal {
  addItem(name: string, listId: string): void;
  open: boolean,
  toggle(): void,
  listId: string | null,
  listTitle: string | null
}

export interface IListModal {
  addList(name: string): void;
}

export interface IItemReduxProps extends IAuthReduxProps {
  shoppingList: {
    items: IExistingItem[];
  };
}

export interface IListReduxProps extends IAuthReduxProps {
  shoppingList: {
    lists: IExistingList[];
  };
}


export interface IShoppingList {
  shoppingList: {
    lists: IExistingList[];
  };
  getLists(): void;
  deleteItem(id: string, listId: string): void;
  isAuthenticated: boolean;
}

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}