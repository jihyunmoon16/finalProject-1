package com.chodae.find5.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.chodae.find.domain.User;

public interface UserRepo extends JpaRepository<User, Long> {

	List<User> findUserByNameAndEmail(String name, String email);////////////////////////// 아이디 찾기 
	
	List<User> findUserByLoginIdAndEmail(String loginId, String email);////////////////////////// 비밀번호 찾기  - 유저 확인
	
	//update , delete, insert 시 @Transctional, @Modifying 어노테이션 필요하다. 
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("UPDATE FROM User u set u.password = ?2 WHERE u.loginId =?1")
	int updatePassword(String id, String password);
	
	User findUserByNickname(String nickname);
	
	
	
	// 소셜 회원이 아닌 회원을  로그인 아이디로 검색. 
	@EntityGraph(attributePaths = {"roleSet"}, type = EntityGraph.EntityGraphType.LOAD)
	@Query("SELECT u from User u WHERE u.social = :social and u.loginId = :loginId")
	Optional<User> findByLoginId(String loginId, boolean social);
	
	Boolean existsByLoginId(String loginId);
	
	User findByLoginIdAndPassword(String loginId,String password);
	
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("UPDATE FROM User u set u.refreshToken = :token WHERE u.social = :social AND u.nickname = :nickname")
	int updateRefreshToken(String token, String nickname, boolean social);
	
	Optional<User> findById(Long id);
	User save(User user);
	Optional<User> findByEmail(String email);
	void delete(User user);


	
}
