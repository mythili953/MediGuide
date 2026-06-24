package com.mediguide.controller;

import com.mediguide.dto.HelplineDTO;
import com.mediguide.service.HelplineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/helplines")
@RequiredArgsConstructor
@Tag(name = "Emergency Helplines", description = "Local emergency contacts and helplines")
public class HelplineController {

    private final HelplineService helplineService;

    @GetMapping
    @Operation(summary = "Get helplines by country and/or city")
    public ResponseEntity<List<HelplineDTO>> getHelplines(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city) {
        return ResponseEntity.ok(helplineService.getHelplines(country, city));
    }
}
