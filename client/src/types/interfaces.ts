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
  
  export interface IAuthReduxProps {
    auth: { isAuthenticated: boolean };
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
  
  export interface IItem {
    _id?: string;
    name: string;
  }
  
  export interface IItemModal {
    addItem(name: string): void;
  }
  
  export interface IItemReduxProps extends IAuthReduxProps {
    shoppingList: {
      items: IExistingItem[];
    };
  }
  
  export interface IShoppingList {
    shoppingList: {
      items: IExistingItem[];
    };
    getItems(): void;
    deleteItem(id: string): void;
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