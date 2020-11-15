package com.merkle.rover.dao;

import com.merkle.rover.models.Obstacle;
import java.util.List;

public interface MapDao {
    Obstacle get(Integer id);
    List<Obstacle> getAll();
    void save(Obstacle obstacle);
    boolean hasObstacle(Integer x, Integer y);
}
