package com.merkle.rover.dao;

import com.merkle.rover.models.Rover;

import java.util.List;

public interface RoverDao {
    public Rover get();
    void save(Rover rover);
}
