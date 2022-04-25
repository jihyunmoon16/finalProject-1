package com.chodae.finds;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.domain.User;
import com.chodae.domain.UserLog;
import com.chodae.repository.UserLogRepository;
import com.chodae.repository.UserRepo;

import lombok.extern.java.Log;

@Commit
@Log
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class UserFindServiceTest {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private UserLogRepository userLogRepo;
	
	String login_id = "loginid";
	String password = "비밀번호";
	String name = "이름";
	String email = "aaa@aaa.com";
	Integer level = 0;
	String nickname = "닉네임";
	String status = "T";
	String role = "nomal";
	
	@Test
	public void insertUser() {
		IntStream.range(1, 51).forEach(i -> {
			User user = new User();
			user.setLoginId(login_id+i);
			user.setPassword(password+i);
			user.setName(name+i);
			user.setEmail(email+i);
			user.setLevel(level);
			user.setNickname(nickname+i);
			user.setStatus(status);
			
			
			
			userRepo.save(user);
		});
	}
	
	@Test
	public void insertUserLog() {
		
		User user = new User();
		user.setId(2L);
				
		IntStream.range(1, 51).forEach(i -> {
			
			UserLog ulog = new UserLog();
			
			ulog.setLogin_date(LocalDateTime.now());
			ulog.setLogin_status("T");
			ulog.setUser(user);
			
			userLogRepo.save(ulog);
		});
		
	}

}
