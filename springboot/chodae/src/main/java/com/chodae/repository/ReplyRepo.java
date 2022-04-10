package com.chodae.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chodae.find.domain.Reply;

public interface ReplyRepo extends JpaRepository<Reply, Long> {
	
	

}
