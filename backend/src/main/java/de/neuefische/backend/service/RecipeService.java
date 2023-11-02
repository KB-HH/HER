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

        Recipe updatedRecipe = new Recipe(
                id,
                recipe.cookingtime(),
                recipe.title(),
                recipe.ingredients(),
                recipe.method(),
                recipe.description(),
                recipe.author(),
                recipe.url(),
                recipe.categories()
        );

        return recipeRepository.save(updatedRecipe);
    }

    public Recipe save(Recipe saveRecipe) {
        return recipeRepository.save(saveRecipe);
    }

}
