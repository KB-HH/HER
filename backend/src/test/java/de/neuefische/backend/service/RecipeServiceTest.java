package de.neuefische.backend.service;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RecipeServiceTest {

    RecipeRepository recipeRepository = mock(RecipeRepository.class);
    RecipeService recipeService = new RecipeService(recipeRepository);

    @Test
    void getAllRecipes() {
        //GIVEN
        Recipe recipe = new Recipe("1", 30,"Erdbeerkuchen","2 Eier"
                ,"gramm",200,"backen","leckeres Rezept"
                ,"Kristina","https://www.","Winter");
        List<Recipe> expected = new ArrayList<>(List.of(recipe));

        //WHEN
        when(recipeRepository.findAll()).thenReturn(expected);
        List<Recipe> actual = recipeService.getAll();

        //THEN
        verify(recipeRepository).findAll();
        assertEquals(expected,actual);

    }



}