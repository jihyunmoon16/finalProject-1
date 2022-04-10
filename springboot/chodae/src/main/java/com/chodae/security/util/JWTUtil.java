package com.chodae.security.util;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.chodae.security.dto.MemberAuthDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.InvalidKeyException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.java.Log;

@Log
public class JWTUtil {
	
	//signature
	private final String SECRET_KEY = "qpalxksjzFNJIDNJIkfjvjdhfurtsnclop23mdi5fDNJIhdudifndjd8f73w4u4fnui"; 
	private final String REFRESH_KEY = "refjsdkfjk2fjkessfjf34rjjkfwnjkfnwjknqjiwncuwicnuDNDFKLFNASfjsdfjsdfjsoifhiosfjsdkl";
	
	Key akey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
	Key reKey = Keys.hmacShaKeyFor(REFRESH_KEY.getBytes(StandardCharsets.UTF_8));

	private long accessExpire = 60*1; //유효기간: 1시간! 60*1
	private long refreshExpire = 60*24*7; //유효기간 : 1주 
	
	public String generateAccessToken(String nickname, Collection<? extends GrantedAuthority> role) throws InvalidKeyException, UnsupportedEncodingException {
		

		return Jwts.builder()
				.setIssuedAt(new Date())
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(accessExpire).toInstant()))
//				.setExpiration(Date.from(ZonedDateTime.now().plusSeconds(1).toInstant()))
//				.setSubject(nickname)
//				.claim("id", id)
				.claim("iss", "chodae")
				.claim("nickname", nickname)
				.claim("role", role)
				.signWith(akey, SignatureAlgorithm.HS256)
				.compact();
	}
	public String generateRefreshToken(String nickname) throws InvalidKeyException, UnsupportedEncodingException {
		
		
		return Jwts.builder()
				.setIssuedAt(new Date())
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(refreshExpire).toInstant()))				
				.claim("iss", "chodae")
//				.claim("nickname", nickname)
				.signWith(reKey, SignatureAlgorithm.HS256)
				.compact();
	}
	
	public Claims validateAccessTokenExtract(String tokenString) {
		
		String contentValue = null;
		
		 Jws<Claims> jws = Jwts.parserBuilder()
				.setSigningKey(akey)
				.build()
				.parseClaimsJws(tokenString);

		 Claims claim =  jws.getBody();
		
		return claim;
		
		
	}
	public Claims validateRefreshTokenExtract(String tokenString) {
		
		String contentValue = null;
		
		Jws<Claims> jws = Jwts.parserBuilder()
				.setSigningKey(reKey)
				.build()
				.parseClaimsJws(tokenString);
		
		Claims claim =  jws.getBody();
		
		return claim;
		
		
	}
	
}
