package com.chodae.find.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chodae.find.domain.User;
import com.chodae.find.ex.security.dto.MemberAuthDTO;
import com.chodae.find.ex.security.jwtutil.JWTUtil;
import com.chodae.find.repository.UserRepository;
import com.chodae.find5.repository.UserRepo;

import io.jsonwebtoken.security.InvalidKeyException;
import lombok.extern.java.Log;

@Log
@Service
public class UserFindServiceImpl implements UserFindService {
	
	private final UserRepo userRepo;
	private final PasswordEncoder passwordEncoder;
	private final JWTUtil jwtUtil;
	
	@Autowired
	public UserFindServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, JWTUtil jwtUtil) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}
	
	@Override
	public int updateRefreshToken(String nickname, String token) {
		//로그인시  새로발급한 리프레쉬 토큰으로 업데이트
		log.info(nickname+"@@@@@@@@@@"+token);
		
		int i = userRepo.updateRefreshToken(token, nickname, false);
		
		return i;
		
	}
	
	
	@Override
	public String getAccessToken(String nickname) {
		
		String accessToken = null;
		
		 User member = userRepo.findUserByNickname(nickname);
		 
		 MemberAuthDTO authMember = new MemberAuthDTO(
					member.getLoginId(),
					"null",
					member.isSocial(),
					member.getRoleSet().stream().map(role -> new SimpleGrantedAuthority("ROLE_"+role.name())).collect(Collectors.toSet()));
			
			authMember.setNickname(member.getNickname());
			authMember.setEmail(member.getEmail());
		
		
		//검증되면 액세스토큰 반환
		try {
			
			accessToken = jwtUtil.generateAccessToken(authMember);
			
			
		} catch (InvalidKeyException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return accessToken;
	}
		
	
	@Override
	public User checkRefreshToken(String nickname, String token) {
		
		//로그인시 발급하여 저장한 리프레시 토큰을 전달받은 리프레시토큰과  비교 하여 찾은 유저 정보 반환
		User member = userRepo.findUserByNickname(nickname);
		
		if(member.getRefreshToken().equals(token)) {
			log.info(member.getRefreshToken()+"=======>"+token);
			
			return member;
		}
	
		return null;
	}
	
	//로그인시 아이디 비밀번호 일치여부 확인할떄 사용가능
	@Override
	public User getUserEntityByCredentials(String loginId, String password, PasswordEncoder passwordEncoder) {
		
		Optional<User> result = userRepo.findByLoginId(loginId, false);
		
		User member = null;
		
		if(result.isPresent()) {
			member = result.get();
			if(passwordEncoder.matches(password, member.getPassword())) {
				return member;
			}
			
		}
		
		return null;
		
	}
 



	@Override
	public String searchId(String name, String email) {
		log.info(name+"~~~"+email);
		Optional<User> result = userRepo.findUserByNameAndEmail(name, email);
		
		if(result.isPresent()) {
			User user = result.get();
			return user.getLoginId();
		}
		
		return null;
	}


	@Override
	public String isUser(String loginId, String email) {
		log.info(loginId+"~~~"+email);
		Optional<User> result = userRepo.findUserByLoginIdAndEmail(loginId, email);
		
		if(result.isPresent()) {
			return result.get().getLoginId();
		}
		
		return null;
	}

	//업데이트 
	@Override
	public int updatePassword(String id, String password) {
		log.info(id+"~@@"+password);
		return userRepo.updatePassword(id, passwordEncoder.encode(password));
	}
	

}
