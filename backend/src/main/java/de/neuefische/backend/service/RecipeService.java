package de.neuefische.backend.service;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAll() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(String id) {
        return recipeRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Rezept nicht gefunden"));
    }

    public Recipe updateRecipe(String id, Recipe recipe) {
        Recipe existingRecipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        Recipe updatedRecipe = new Recipe(
                existingRecipe.id(),
                recipe.cookingtime(),
                recipe.title(),
                recipe.getIngredients(),
                recipe.getMethod(),
                recipe.description(),
                recipe.author(),
                recipe.url(),
                recipe.getCategories()
        );

        return recipeRepository.save(updatedRecipe);
    }




}
