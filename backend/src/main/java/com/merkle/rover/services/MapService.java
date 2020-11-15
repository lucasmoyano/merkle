package com.merkle.rover.services;

import com.merkle.rover.dao.MapDao;
import com.merkle.rover.models.Obstacle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapService {

    @Autowired
    MapDao mapDao;

    public Obstacle get(Integer id) {
        return mapDao.get(id);
    }

    public List<Obstacle> getAll() {
        return mapDao.getAll();
    }

    public boolean hasObstacle(Integer x, Integer y) {
        return mapDao.hasObstacle(x, y);
    }

}
