package com.chodae.finds;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.find.domain.User;
import com.chodae.repository.UserRepo;
import com.chodae.security.util.JWTUtil;

import io.jsonwebtoken.security.InvalidKeyException;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;

@Log
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PasswordTest {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private JWTUtil jwtUtil;
	
	@Test
	public void testEncode() {
		
		String password = "1111";
		
		String enPw = passwordEncoder.encode(password);
		
		System.out.println(enPw);
		
		boolean matchResult = passwordEncoder.matches(password, enPw);
		
		System.out.println(matchResult);
		
	}
	
	@Test
	public void testSearchUser() {
		Optional<User> result = userRepo.findByLoginId("loginid1", false);
		
		User member = result.get();
		
		log.info(""+member);
		
	}
	
	@BeforeEach
	public void testBefore() {
		System.out.println("testbefore!!@@@@@@@@@@@@@@@@@@@@@@@");
		jwtUtil = new JWTUtil();
	}
	
	@Test
	public void encode() throws InvalidKeyException, UnsupportedEncodingException {
		String id = "loginid1";
//		String str = jwtUtil.generateToken(id);
//		System.out.println(str);
	}
	
	@Test
	public void validateTest() throws InterruptedException, InvalidKeyException, UnsupportedEncodingException {
		String id = "loginid1";
//		String str = jwtUtil.generateToken(id);
		
		Thread.sleep(5000);
		
//		String resultContent = jwtUtil.validateExtract(str);
//		System.out.println(resultContent);
		
	}
	
	
}
