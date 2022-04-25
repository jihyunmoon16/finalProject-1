package com.chodae.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chodae.domain.Reply;

public interface ReplyRepo extends JpaRepository<Reply, Long> {
	
	

}
