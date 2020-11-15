package com.merkle.rover.dao.imp;

import com.merkle.rover.dao.RoverDao;
import com.merkle.rover.models.Rover;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class RoverDaoImp implements RoverDao {

    @PersistenceContext
    protected EntityManager entityManager;

    /**
     * Return a rover
     *
     * @return
     */
    @Transactional
    @Override
    public Rover get() {
        return entityManager.find(Rover.class, 1);
    }

    /**
     * Save the rover
     * @return
     */
    @Transactional
    @Override
    public void save(Rover rover) {
        entityManager.merge(rover);
    }
}
