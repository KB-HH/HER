package de.neuefische.backend.model;


import java.util.List;

public record Recipe (
        String id,
        String cookingtime,
        String title,
        List<Ingredients> ingredients,
        List<Method> method,
        String description,
        String author,
        String url,
        List<Categories> categories
)

{

    public List<Ingredients> getIngredients() {
        return ingredients();
    }

    public List<Method> getMethod() {
        return method();
    }

    public List<Categories> getCategories() {
        return categories();
    }

}
