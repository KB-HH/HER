package de.neuefische.backend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Categories;
import de.neuefische.backend.model.Ingredients;
import de.neuefische.backend.model.Method;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RecipeControllerTest {

    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;


    @Test
    @DirtiesContext
    void getAllRecipes() throws Exception {
        //GIVEN
        recipeRepository.save(new Recipe("6537c8883bacac19d92a6485", "45", "Tomatensuppe1",
                List.of(new Ingredients("g", "500", "Tomaten")),
                List.of(new Method("Die Zwiebel und den Knoblauch fein hacken.")),
                "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.", "Maria Müller", "https://example.com/tomatensuppe",List.of(new Categories("Suppe"))));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/recipes"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    [
                    {
                        "id": "6537c8883bacac19d92a6485",
                        "cookingtime": "45",
                        "title": "Tomatensuppe1",
                        "ingredients": [
                            {
                                "unit": "g",
                                "quantity": "500",
                                "name": "Tomaten"
                            }
                        ],
                        "method": [
                            {
                                "method": "Die Zwiebel und den Knoblauch fein hacken."
                            }
                        ],
                        "description": "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.",
                        "author": "Maria Müller",
                        "url": "https://example.com/tomatensuppe",
                        "categories": [
                            {
                                "categories": "Suppe"
                            }
                        ],
                    }
                    ]
                    """));
    }



    @Test
    @DirtiesContext
    void getAllRecipesIntegrationTest() throws Exception {

        recipeRepository.save(new Recipe("6537c8883bacac19d92a6485", "45", "Tomatensuppe1",
                List.of(new Ingredients("g", "500", "Tomaten")),
                List.of(new Method("Die Zwiebel und den Knoblauch fein hacken.")),
                "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.", "Maria Müller", "https://example.com/tomatensuppe",List.of(new Categories("Suppe"))));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/recipes"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    [
                    {
                        "id": "6537c8883bacac19d92a6485",
                        "cookingtime": "30",
                        "title": "Erdbeerkuchen",
                        "ingredients": [
                            {
                                "unit": "g",
                                "quantity": "500",
                                "name": "Tomaten"
                            }
                        ],
                        "method": [
                            {
                                "method": "Die Zwiebel und den Knoblauch fein hacken."
                            }
                        ],
                        "description": "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.",
                        "author": "Maria Müller",
                        "url": "https://example.com/tomatensuppe",
                        "categories": [
                            {
                                "categories": "Suppe"
                            }
                        ],
                        }
                        ]
                """));
    }

    @Test
    @DirtiesContext
    void getRecipeByIdIntegrationTest() throws Exception {
        Recipe savedRecipe = new Recipe("1", "30", "Erdbeerkuchen",
                List.of(new Ingredients("Ente", "1", null)),
                List.of(new Method("backen")),
                "leckeres Rezept", "Kristina", "h",List.of(new Categories("Sommer,Winter")));
        recipeRepository.save(savedRecipe);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/recipes/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    {
                        "id": "1",
                        "cookingtime": "30",
                        "title": "Erdbeerkuchen",
                        "ingredients": [
                            {
                                "unit": "Ente",
                                "quantity": "1",
                                "name": null
                            }
                        ],
                        "method": [
                            {
                                "method": "backen"
                            }
                        ],
                        "description": "leckeres Rezept",
                        "author": "Kristina",
                        "categories": ["Sommer", "Winter"],
                    }
                """));
    }
}