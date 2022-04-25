package com.chodae.finds;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.domain.User;
import com.chodae.group.MemberRole;
import com.chodae.repository.UserRepo;

@ExtendWith(SpringExtension.class)
@ContextConfiguration
@SpringBootTest
public class UserRepositoryTests {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Test
	public void inspect() {
		
		//실제 객체의 클래스 이름
		Class<?> clz = userRepo.getClass();
		
		System.out.println(clz.getName());
		
		//클래스가 구현하고 있는 인터페이스 목록 
		Class<?>[] interfaces = clz.getInterfaces();
		
		Stream.of(interfaces).forEach(inter -> System.out.println(inter.getName())); 
		
		Class<?> superClasses = clz.getSuperclass();
		
		System.out.println(superClasses.getName());
		
	}
	String login_id = "loginid";
	String password = "비밀번호";
	String name = "이름";
	String email = "aaa@aaa.com";
	String nickname = "닉네임";
	String status = "T";
	
	@Test
	public void testInsert() {
		
		User user = new User();
		user.setLoginId(login_id);
		user.setPassword(password);
		user.setName(name);
		user.setEmail(email);
		
		user.setNickname(nickname);
		user.setStatus(status);
		
		
		
		userRepo.save(user);
	
	}
	
	@Test
	public void testSelect() {
		Optional<User> user  = userRepo.findById(1L);
		System.out.println(user.toString());
//		userRepo.findById(1).ifPresent((user1)->{
//			System.out.println(user1);
//		});
	}
	
	@Test
	public void testUpdate() {
		Optional<User> userInfo  = userRepo.findById(1L);
		if(userInfo.isPresent()) {
			User user = userInfo.get();
			user.setName("변경할이름");
			userRepo.save(user);			
		}
		
	}
	
	@Test
	public void testDelete() {
		userRepo.deleteById(1L);
	}
	
	@Test
	public void testDeleteAll() {
		userRepo.deleteAll();
	}
	
	
	//유저 테스트 데이터 입력 + 권한
	@Test
	public void testInsert100() {
		
		for(int i = 1; i <=100;i++) {
			
			User user = new User();
			user.setPassword(passwordEncoder.encode("11111"));
			user.setName(name);
			user.setEmail(i+email);
			user.setNickname(nickname+i);
			user.setStatus(status);
			user.setLoginId(login_id+i);
			user.setSocial(false);
			
			user.addMemberRole(MemberRole.USER);
			
//			if( i > 95) {
				//95번 이상 멤버는 추가로 관리자 권한 부여
//				user.addMemberRole(MemberRole.ADMIN);
//			}
			
			userRepo.save(user);
		}
	}

}
