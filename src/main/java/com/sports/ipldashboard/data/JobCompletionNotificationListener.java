package com.sports.ipldashboard.data;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.sports.ipldashboard.model.Team;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final EntityManager em;

  @Autowired
  public JobCompletionNotificationListener(EntityManager em) {
    this.em = em;
  }

  // we need to check if the job of reading, writing and processing is done. If
  // the job is done success message is shown and we are
  // asking for the query.
  @Override
  @Transactional
  public void afterJob(JobExecution jobExecution) {
    if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");
      Map<String, Team> teamData = new HashMap<>();

      // allows to specify query using JPQL
      // returns a list of array of objects as, it don't have any idea about what the
      // query is returning.
      em.createQuery("select m.team1, count(*) from Match m group by m.team1", Object[].class)
          .getResultList()
          .stream()
          .map(e -> new Team((String) e[0], (Long) e[1]))
          .forEach(team -> teamData.put(team.getTeamName(), team));

      em.createQuery("select m.team2, count(*) from Match m group by m.team2", Object[].class)
          .getResultList()
          .stream()
          .forEach(e -> {
            Team team = teamData.get((String) e[0]);
            team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
          });

      em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
          .getResultList()
          .stream()
          .forEach(e -> {
            Team team = teamData.get((String) e[0]);
            if (team != null)
              team.setTotalWins((long) e[1]);
          });

      teamData.values().forEach(team -> em.persist(team));

      // teamData.values().forEach(team -> System.out.println(team));
    }
  }
}