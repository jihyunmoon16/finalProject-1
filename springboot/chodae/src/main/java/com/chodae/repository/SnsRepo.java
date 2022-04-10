package com.chodae.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chodae.find.domain.SnsInfo;

public interface SnsRepo extends JpaRepository<SnsInfo, String>{

}
