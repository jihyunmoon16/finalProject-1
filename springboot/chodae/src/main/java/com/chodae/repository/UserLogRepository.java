package com.chodae.repository;

import org.springframework.data.repository.CrudRepository;

import com.chodae.domain.UserLog;

public interface UserLogRepository extends CrudRepository<UserLog, Long>{
	

}
