package com.merkle.rover.dao.imp;

import com.merkle.rover.dao.MapDao;
import com.merkle.rover.models.Obstacle;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class MapDaoImp implements MapDao {

    @PersistenceContext
    protected EntityManager entityManager;

    /**
     * Return a Obstacle by id.
     *
     * @param id
     * @return
     */
    @Transactional
    @Override
    public Obstacle get(Integer id) {
        if (id == null) {
            return null;
        }
        return entityManager.find(Obstacle.class, id);
    }

    /**
     * Return all Obstacles.
     *
     * @return
     */
    @Transactional
    @Override
    public List<Obstacle> getAll() {
        String hql = "FROM Obstacle";
        return (List<Obstacle>) entityManager.createQuery(hql).getResultList();
    }

    /**
     * Save the Obstacle
     * @return
     */
    @Transactional
    @Override
    public void save(Obstacle obstacle) {
        entityManager.merge(obstacle);
    }

    /**
     * Check if exists an obstacle in x and y
     * @param x
     * @param y
     * @return
     */
    public boolean hasObstacle(Integer x, Integer y) {
        String hql = "FROM Obstacle where x = :x and y = :y";
        List<Obstacle> list = entityManager.createQuery(hql)
                .setParameter("x", x)
                .setParameter("y", y)
                .getResultList();

        return list != null && list.size() > 0;
    }

}
