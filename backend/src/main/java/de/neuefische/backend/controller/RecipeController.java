package de.neuefische.backend.controller;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.service.RecipeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/recipes")

public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAll();
    }

    @GetMapping("{id}")
    Recipe getRecipeById(@PathVariable String id) {
        return recipeService.getRecipeById(id);
    }

    @PutMapping ("{id}")
    Recipe updateRecipe(@PathVariable String id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe);
    }


}
