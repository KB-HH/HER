package de.neuefische.backend.controller;
import de.neuefische.backend.model.*;
import de.neuefische.backend.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


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
    @ResponseBody
    @PostMapping
    public ResponseEntity<Object> addRecipe(@RequestBody NewRecipe newRecipe) {
        List<Ingredients> ingredients = newRecipe.ingredients();
        List<Method> methods = newRecipe.method();
        List<Category> categories = newRecipe.categories();

        if (!newRecipe.title().isEmpty() && !newRecipe.description().isEmpty()) {
            Recipe saveRecipe = new Recipe(
                    UUID.randomUUID().toString(),
                    newRecipe.cookingtime(),
                    newRecipe.title(),
                    ingredients,
                    methods,
                    newRecipe.description(),
                    newRecipe.author(),
                    newRecipe.url(),
                    categories
            );

            return ResponseEntity.ok(recipeService.save(saveRecipe));
        } else {
            return ResponseEntity.badRequest().body("Das hat leider nicht geklappt, bitte Titel und Beschreibung angeben");
        }
    }



}
