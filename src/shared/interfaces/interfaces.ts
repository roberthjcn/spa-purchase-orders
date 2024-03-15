export interface ICustomer {
    id?: number;
    name: string;
    lastname: string;
}

export interface IDialogCustomer {
    open: boolean;
    onClose: () => void;
    onAddEdit: (customer: ICustomer) => void;
    customerEdit?: ICustomer;
}

export interface IArticle {
    id?: number;
    name: string;
    price: number;
    uniqueCode: string;
}

export interface IDialogArticle {
    open: boolean;
    onClose: () => void;
    onAdd: (article: IArticle) => void;
}export interface IDialogOrder {
    open: boolean;
    onClose: () => void;
    onAdd: (orden: IOrder) => void;
    customers: ICustomer[];
    articles: IArticle[];
}

export interface IOrder {
    id?: number;
    clientId?: number;
    client?: ICustomer;
    articleIds: number[];
    articles?: IArticle[];
    uniqueCode?: string;
    date?: string;
}

