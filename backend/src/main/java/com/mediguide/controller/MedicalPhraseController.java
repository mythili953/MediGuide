package com.mediguide.controller;

import com.mediguide.dto.MedicalPhraseDTO;
import com.mediguide.service.MedicalPhraseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phrases")
@RequiredArgsConstructor
@Tag(name = "Medical Phrases", description = "Multilingual medical phrase translations")
public class MedicalPhraseController {

    private final MedicalPhraseService phraseService;

    @GetMapping
    @Operation(summary = "Get medical phrases for a language")
    public ResponseEntity<List<MedicalPhraseDTO>> getPhrases(
            @RequestParam String language,
            @RequestParam(required = false) String category) {
        if (category != null) {
            return ResponseEntity.ok(phraseService.getByCategory(category, language));
        }
        return ResponseEntity.ok(phraseService.getPhrases(language));
    }

    @GetMapping("/search")
    @Operation(summary = "Search medical phrases by keyword")
    public ResponseEntity<List<MedicalPhraseDTO>> search(
            @RequestParam String query,
            @RequestParam String language) {
        return ResponseEntity.ok(phraseService.search(query, language));
    }
}
