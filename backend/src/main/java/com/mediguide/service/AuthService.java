package com.mediguide.service;

import com.mediguide.dto.AuthDTOs.*;
import com.mediguide.entity.User;
import com.mediguide.exception.DuplicateResourceException;
import com.mediguide.exception.ResourceNotFoundException;
import com.mediguide.repository.UserRepository;
import com.mediguide.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nationality(request.getNationality())
                .preferredLanguage(request.getPreferredLanguage())
                .phoneNumber(request.getPhoneNumber())
                .role(User.Role.USER)
                .build();

        User saved = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(saved);
        String refreshToken = jwtTokenProvider.generateRefreshToken(saved);

        return new AuthResponse(token, refreshToken, saved.getId(),
                saved.getName(), saved.getEmail(), saved.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", 0L));

        String token = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return new AuthResponse(token, refreshToken, user.getId(),
                user.getName(), user.getEmail(), user.getRole().name());
    }
}
