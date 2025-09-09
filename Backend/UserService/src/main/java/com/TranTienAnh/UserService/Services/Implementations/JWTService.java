package com.TranTienAnh.UserService.Services.Implementations;

import com.TranTienAnh.UserService.Models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTService {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value(("${jwt.expiration}"))
    private long expirationTime;

    private SecretKey getSignKey() {
        byte[] keyByte = secretKey.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyByte, "HmacSHA256");
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("role", user.getRole().name());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSignKey())
                .compact();
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
        return claimsTFunction.apply(Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload());
    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public Boolean isTokenExpire(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }

    public Boolean isTokenValid(String token, UserDetails userDetails) {
        String username = userDetails.getUsername();
        return (username.equals(extractUsername(token)) && !isTokenExpire(token));
    }
}
