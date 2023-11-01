package de.neuefische.backend.model;

import java.util.List;

public record NewRecipe(
        String cookingtime,
        String title,
        List<Ingredients> ingredients,
        List<Method> method,
        String description,
        String author,
        String url,
        List<Category> categories
) {
}
