
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateCatInput {
    name?: string;
    age?: number;
}

export interface PageParams {
    limit: number;
    offset: number;
}

export interface IQuery {
    getCats(): Cat[] | Promise<Cat[]>;
    pages(params?: PageParams): CatConnection | Promise<CatConnection>;
    cat(id: string): Cat | Promise<Cat>;
}

export interface IMutation {
    createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;
}

export interface ISubscription {
    catCreated(): Cat | Promise<Cat>;
}

export interface Cat {
    id?: number;
    name?: string;
    age?: number;
}

export interface CatConnection {
    totalCount: number;
    cats?: Cat[];
}
