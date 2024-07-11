package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.RecipeRequestDTO;
import lt.techin.ovidijus.back.dto.RecipeResponseDTO;
import lt.techin.ovidijus.back.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RecipeController {

    RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @PostMapping("/api/categories/{categoryId}/recipes")
    public ResponseEntity<?> createRecipe(@PathVariable Long categoryId, @RequestBody RecipeRequestDTO recipeRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(this.recipeService.createRecipe(categoryId, recipeRequestDTO));
    }

    @GetMapping("/api/recipes")
    public List<RecipeResponseDTO> findAllRecipes() {
        return this.recipeService.findAll();
    }

    @PutMapping("/api/categories/{categoryId}/recipes/{recipeId}")
    public ResponseEntity<?> updateRecipe(@PathVariable Long categoryId, @PathVariable Long recipeId, @RequestBody RecipeRequestDTO recipeRequestDTO){
         return ResponseEntity.ok(this.recipeService.updateRecipe(categoryId, recipeId, recipeRequestDTO));
    }


}
