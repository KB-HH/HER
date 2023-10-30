export type Recipe = {
    id?: string,
    cookingtime: number,
    title: string,
    ingredients: Ingredients[];
    method: Method[];
    description: string,
    author: string,
    url: string,
    categories: Categories[];
}
export type Ingredients = {
    id: string;
    unit: string;
    quantity: number;
    name: string;
}

export type Method = {
    id: number;
    method: string;
};
export type Categories = {
    id: number;
    categories: string;
};



