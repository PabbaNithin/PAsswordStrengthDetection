package com.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PasswordServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    public String checkPasswordStrength(String password) {
        return restTemplate.postForObject("http://localhost:8080/password-strength/check", password, String.class);
    }

}

