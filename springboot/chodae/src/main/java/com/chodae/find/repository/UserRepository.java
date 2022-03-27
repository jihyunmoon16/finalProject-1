package com.chodae.find.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chodae.find.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	
	//쿼리메소드 : 메소드의 이름만으로 필요한 쿼리를 만들어내는 기능 지원  Select만 가능?
	//메소드 네이밍 rule : ex) find(엔티티이름)By(컬럼명)  
	//반환타입 : Collection<T> 형태로  주로 사용 ex) Page<T> , Slice<T> , List<T>
	List<User> findUserByName(String name); 
	
	
	//////////////////////////
	List<User> findUserByNameAndEmail(String name, String email);////////////////////////// 아이디 찾기 
	List<User> findUserByLoginIdAndEmail(String loginId, String email);////////////////////////// 비밀번호 찾기  - 유저 확인
	
	//update , delete, insert 시 @Transctional, @Modifying 어노테이션 필요하다. 
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("UPDATE FROM User u set u.password = ?2 WHERE u.loginId =?1")
	int updatePassword(String id, String password);
	
	/////////////////////////////////////////
	 

	List<User> findUserByNameContainingOrderByNameDesc(String name);
	
	//페이징 처리와 정렬 : 모든 쿼리메소드의 마지막 파라미터로 Pageable 인터페이스와 sort인터페이스 사용가능 
	//반환타입 : Slice 타입, Page 타입 , List 타입 이용 
	List<User> findUserByNameContainingOrderByNameDesc(String name,Pageable paging);
	
	//페이지 타입
	Page<User> findUserByNicknameContaining(String name,Pageable paging);
	
	
	
//	@Query("SELECT u FROM User u WHERE u.name LIKE %?1% AND u.id > 0 ORDER BY u.id DESC")
//	List<User> findUserByNameContaining(String name);
//	@Query("SELECT u FROM #{#entityName} u WHERE u.name LIKE %:name% AND u.id > 0 ORDER BY u.id DESC")
//	List<User> findUserByNameContaining(@Param("name") String name);
	@Query("SELECT u.id,u.name,u.email FROM #{#entityName} u WHERE u.name LIKE %:name% AND u.id > 0 ORDER BY u.id DESC")
	List<Object[]> findUserByNameContaining(@Param("name") String name);

	
	User findByloginId(String loginId);
	
	//@Query를 이용하더라도 페이징 처리를 하는 Pageable 인터페이스는 사용가능
}
