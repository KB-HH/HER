package de.neuefische.backend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
    void testGetAllRecipes() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/recipes"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"));
    }

    @Test
    @DirtiesContext
    void testHandleNoSuchElementException() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/recipes/6537c8883bacac19d92a648")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Rezept nicht gefunden"));
    }



    @Test
    @DirtiesContext
    void updateRecipeIntegrationTest() throws Exception {
        // GIVEN
        Recipe initialRecipe = new Recipe(
                "6537c8883bacac19d92a6485",
                "45",
                "Tomatensuppe3",
                List.of(new Ingredients("g", "500", "Tomaten"),
                        new Ingredients("", "1", "Zwiebel"),
                        new Ingredients("Knoblauchzehe", "1", "Knoblauch"),
                        new Ingredients("EL", "2", "Olivenöl"),
                        new Ingredients("TL", "1", "Zucker"),
                        new Ingredients("ml", "500", "Gemüsebrühe"),
                        new Ingredients("Prise", "1", "Salz und Pfeffer")),
                List.of(new Method("Die Zwiebel und den Knoblauch fein hacken."),
                        new Method("In einem Topf das Olivenöl erhitzen und die Zwiebel und den Knoblauch darin anschwitzen."),
                        new Method("Die Tomaten in Würfel schneiden und hinzufügen."),
                        new Method("Zucker zugeben und kurz karamellisieren lassen."),
                        new Method("Die Gemüsebrühe hinzufügen und alles zum Kochen bringen."),
                        new Method("Die Suppe etwa 20 Minuten köcheln lassen.Mit Salz und Pfeffer abschmecken."),
                        new Method("Die Suppe pürieren und heiß servieren.")),
                "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.",
                "Maria Müller",
                "https://example.com/tomatensuppe",
                List.of(new Category("Suppe"),
                        (new Category("warm"))));
        recipeRepository.save(initialRecipe);

        Recipe updatedRecipe = new Recipe(
                "6537c8883bacac19d92a6485",
                "60",
                "Tomatensuppe3 (Updated)",
                initialRecipe.ingredients(),
                initialRecipe.method(),
                "Eine aktualisierte Tomatensuppe.",
                initialRecipe.author(),
                initialRecipe.url(),
                initialRecipe.categories()
        );

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/recipes/6537c8883bacac19d92a6485")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedRecipe))) // Serialize the updatedRecipe to JSON
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
        {
            "id": "6537c8883bacac19d92a6485",
            "cookingtime": "60",
            "title": "Tomatensuppe3 (Updated)",
            "ingredients": [
                {
                    "unit": "g",
                    "quantity": "500",
                    "name": "Tomaten"
                },
                {
                    "unit": "",
                    "quantity": "1",
                    "name": "Zwiebel"
                },
                {
                    "unit": "Knoblauchzehe",
                    "quantity": "1",
                    "name": "Knoblauch"
                },
                {
                    "unit": "EL",
                    "quantity": "2",
                    "name": "Olivenöl"
                },
                {
                    "unit": "TL",
                    "quantity": "1",
                    "name": "Zucker"
                },
                {
                    "unit": "ml",
                    "quantity": "500",
                    "name": "Gemüsebrühe"
                },
                {
                    "unit": "Prise",
                    "quantity": "1",
                    "name": "Salz und Pfeffer"
                }
            ],
            "method": [
                {
                    "method": "Die Zwiebel und den Knoblauch fein hacken."
                },
                {
                    "method": "In einem Topf das Olivenöl erhitzen und die Zwiebel und den Knoblauch darin anschwitzen."
                },
                {
                    "method": "Die Tomaten in Würfel schneiden und hinzufügen."
                },
                {
                    "method": "Zucker zugeben und kurz karamellisieren lassen."
                },
                {
                    "method": "Die Gemüsebrühe hinzufügen und alles zum Kochen bringen."
                },
                {
                    "method": "Die Suppe etwa 20 Minuten köcheln lassen.Mit Salz und Pfeffer abschmecken."
                },
                {
                    "method": "Die Suppe pürieren und heiß servieren."
                }
            ],
            "description": "Eine aktualisierte Tomatensuppe.",
            "author": "Maria Müller",
            "url": "https://example.com/tomatensuppe",
            "categories": [
                {
                    "categories": "Suppe"
                },
                {
                    "categories": "warm"
                }
            ]
        }
        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
    @Test
    void addNewRecipe() throws Exception{
        //WHEN
        mockMvc.perform(post("/api/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                     {
                        "title": "Mein Test",
                        "description": "..."
                     }
                    """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                     {

                        "title": "Mein Test",
                        "description": "..."
                     }
                    """))
                .andExpect(jsonPath("$.id").isNotEmpty());


    }
    @Test
    void testPostRecipeWithInvalidData() throws Exception {
        //GIVEN
        recipeRepository.save(new Recipe("1",
                "45",
                "",
                List.of(new Ingredients("g", "500", "Tomaten"),
                        new Ingredients("", "1", "Zwiebel"),
                        new Ingredients("Knoblauchzehe", "1", "Knoblauch"),
                        new Ingredients("EL", "2", "Olivenöl"),
                        new Ingredients("TL", "1", "Zucker"),
                        new Ingredients("ml", "500", "Gemüsebrühe"),
                        new Ingredients("Prise", "1", "Salz und Pfeffer")),
                List.of(new Method("Die Zwiebel und den Knoblauch fein hacken."),
                        new Method("In einem Topf das Olivenöl erhitzen und die Zwiebel und den Knoblauch darin anschwitzen."),
                        new Method("Die Tomaten in Würfel schneiden und hinzufügen."),
                        new Method("Zucker zugeben und kurz karamellisieren lassen."),
                        new Method("Die Gemüsebrühe hinzufügen und alles zum Kochen bringen."),
                        new Method("Die Suppe etwa 20 Minuten köcheln lassen.Mit Salz und Pfeffer abschmecken."),
                        new Method("Die Suppe pürieren und heiß servieren.")),
                "Eine leckere und einfache Tomatensuppe, perfekt für kalte Tage.",
                "Maria Müller",
                "https://example.com/tomatensuppe",
                List.of(new Category("Suppe"),
                        (new Category("warm")))));
        //WHEN
        mockMvc.perform(post("/api/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "title":"",
                                "description": ""
                                }
                                """)
                )
                //THEN
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.content().string("Das hat leider nicht geklappt, bitte Titel und Beschreibung angeben"));
    }



}
