package com.chodae.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chodae.domain.Board;

public interface BoardRepo  extends JpaRepository<Board, Long> {

}
