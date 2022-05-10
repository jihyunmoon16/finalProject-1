package com.chodae.finds;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.repository.UserRepo;

import lombok.extern.java.Log;

@Log
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PasswordTest {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Test
	public void testEncode() {
		
		String password = "1111";
		
		String enPw = passwordEncoder.encode(password);
		
		System.out.println(enPw);
		
		boolean matchResult = passwordEncoder.matches(password, enPw);
		
		System.out.println(matchResult);
		
	}

}
