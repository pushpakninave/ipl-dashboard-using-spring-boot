package com.sports.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import com.sports.ipldashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long> {
    
    Team findByTeamName(String teamName);

}
