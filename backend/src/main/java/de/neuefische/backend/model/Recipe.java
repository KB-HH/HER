package de.neuefische.backend.model;

public record Recipe(
        String id,
        int cookingtime,
        String title,
        String ingredients,
        String unit,
        double quantity,
        String method,
        String description,
        String author,
        String url,
        String categories
) {
}
