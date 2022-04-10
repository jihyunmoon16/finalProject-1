package com.chodae.repository;

import org.springframework.data.repository.CrudRepository;

import com.chodae.find.domain.UserLog;

public interface UserLogRepository extends CrudRepository<UserLog, Long>{
	

}
