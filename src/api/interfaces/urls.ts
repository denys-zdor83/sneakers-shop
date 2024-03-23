export interface RGetAllWorks {
    data: WorksInterface[];
    links: {
        current: string;
    };
    meta: PaginationData;
}

interface PaginationData {
    currentPage: number;
    itemsPerPage: number;
    sortBy: [string, 'ASC' | 'DESC'][];
    totalItems: number;
    totalPages: number;
}

export interface WorksInterface {
    createdAt: string;
    id: number;
    isRegular: boolean;
    pay: string;
    title: string;
    updatedAt: string;
}

export interface AddNewWorkInterface {
    isRegular: boolean;
    pay: number;
    title: string;
}

export interface RAddNewWork extends WorksInterface {}

export interface UpdateWorkInterface extends AddNewWorkInterface {}

export interface RUpdateWork extends WorksInterface {}
