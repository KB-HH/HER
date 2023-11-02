export type Recipe = {
    id?: string,
    cookingtime: number,
    title: string,
    ingredients: Ingredients[];
    method: Method[];
    description: string,
    author: string,
    url: string,
    categories: Category[];
}
export type Ingredients = {
    id: number;
    unit: string;
    quantity: number;
    name: string;
}

export type Method = {
    id: number;
    method: string;
};
export type Category = {
    id: number;
    categories: string;
};



