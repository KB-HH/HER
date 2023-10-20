package de.neuefische.backend.controller;


import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RecipeControllerTest {

    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    MockMvc mockMvc;


    @Test
    @DirtiesContext
    void getAllRecipesIntegrationTest() throws Exception {
        recipeRepository.save(new Recipe("1", 30,"Erdbeerkuchen","2 Eier"
                ,"gramm",200,"backen","leckeres Rezept"
                ,"Kristina","https://www.","Winter"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {
                            "id": "1",
                            "title": "Erdbeerkuchen",
                            "description": "leckeres Rezept"
                        }
                        ]
        """));
    }

}