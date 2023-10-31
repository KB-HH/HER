package de.neuefische.backend.service;

import de.neuefische.backend.model.Category;
import de.neuefische.backend.model.Ingredients;
import de.neuefische.backend.model.Method;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class RecipeServiceTest {

    RecipeRepository recipeRepository = mock(RecipeRepository.class);
    RecipeService recipeService = new RecipeService(recipeRepository);

    @Test
    void getAllRecipes() {
        //GIVEN

        Recipe recipe = new Recipe("1", "30", "Erdbeerkuchen",
                List.of(new Ingredients("Ente", "1", null)),
                List.of(new Method("backen")),
                "leckeres Rezept", "Kristina", "",List.of(new Category("Suppe,warm")));

        //WHEN
        when(recipeRepository.findAll()).thenReturn(Collections.singletonList(recipe));
        List<Recipe> actual = recipeService.getAll();

        //THEN
        verify(recipeRepository).findAll();
        assertIterableEquals(Collections.singletonList(recipe), actual);

    }


    @Test
    void getRecipeById() {
        String id = "1";
        //GIVEN
        Recipe recipe = new Recipe("1", "30", "Erdbeerkuchen",
                List.of(new Ingredients("Ente", "1", null)),
                List.of(new Method("backen")),
                "leckeres Rezept", "Kristina", "",List.of(new Category("Suppe,warm")));
        //WHEN
        when(recipeRepository.findById(id)).thenReturn(Optional.of(recipe));
        Recipe actual = recipeService.getRecipeById(id);
        //THEN
        verify(recipeRepository).findById(id);
        assertEquals(recipe, actual);
    }

    @Test
    void updateRecipeShouldReturnUpdatedRecipe() {
        //GIVEN
        String id = "6537c8883bacac19d92a6485";
        Recipe recipe = new Recipe("6537c8883bacac19d92a6485", "45", "Tomatensuppe3", List.of(new Ingredients("g", "500", "Tomaten")),
                List.of(new Method("Die Zwiebel und den Knoblauch fein hacken.In einem Topf das Olivenöl erhitzen und die Zwiebel und den Knoblauch darin anschwitzen.Die Tomaten in Würfel schneiden und hinzufügen. Den Zucker zugeben und kurz karamellisieren lassen." +
                        "Die Gemüsebrühe hinzufügen und alles zum Kochen bringen.Die Suppe etwa 20 Minuten köcheln lassen.Mit Salz und Pfeffer abschmecken.Die Suppe pürieren und heiß servieren.")),
                "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.", "Maria Müller", "https://example.com/tomatensuppe", List.of(new Category("Suppe,warm")));

        Recipe expected = new Recipe("6537c8883bacac19d92a6485", "45", "Tomatensuppe3",List.of(new Ingredients("g", "500", "Tomaten")),
                List.of(new Method("Die Zwiebel und den Knoblauch fein hacken.In einem Topf das Olivenöl erhitzen und die Zwiebel und den Knoblauch darin anschwitzen.Die Tomaten in Würfel schneiden und hinzufügen. Den Zucker zugeben und kurz karamellisieren lassen." +
                        "Die Gemüsebrühe hinzufügen und alles zum Kochen bringen.Die Suppe etwa 20 Minuten köcheln lassen.Mit Salz und Pfeffer abschmecken.Die Suppe pürieren und heiß servieren.")),
                "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.", "Maria Müller", "https://example.com/tomatensuppe",List.of(new Category("Suppe,warm")));
        //WHEN
        when(recipeRepository.save(expected)).thenReturn(expected);
        Recipe actual = recipeService.updateRecipe(id,recipe);
        //THEN
        verify(recipeRepository).save(expected);
        assertEquals(expected, actual);
    }




}