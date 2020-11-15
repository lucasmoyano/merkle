package com.merkle.rover.services;

import com.merkle.rover.dao.RoverDao;
import com.merkle.rover.enums.Orientation;
import com.merkle.rover.models.Rover;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoverService {

    @Autowired
    RoverDao roverDao;

    @Autowired
    MapService mapService;

    public Rover get() {
        return roverDao.get();
    }

    public Rover executeCommand(String command) {
        Rover rover = roverDao.get();
        Boolean canMove = true;

        switch (command) {
            case "r":
                rotate(rover,true);
                break;

            case "l":
                rotate(rover,false);
                break;

            case "f":
                canMove = moveToNextPosition(rover,true);
                break;

            case "b":
                canMove = moveToNextPosition(rover,false);
                break;
        }
        if (canMove) {
            save(rover);
        }
        return rover;
    }

    private void save(Rover rover) {
        roverDao.save(rover);
    }

    public Boolean moveToNextPosition(Rover rover, Boolean isForward) {
        Integer x = rover.getX();
        Integer y = rover.getY();

        Orientation current = rover.getOrientation();
        switch(current) {
            case NORTH:
                y += isForward ? -1 : 1;
                break;

            case EAST:
                x += isForward ? 1 : -1;
                break;

            case SOUTH:
                y += isForward ? 1 : -1;
                break;

            case WEST:
                x += isForward ? -1 : 1;
                break;
        }

        if (x < 0) { x = 9; }
        else if (x > 9) { x = 0; }
        if (y < 0) { y = 9; }
        else if (y > 9) { y = 0; }

        if (mapService.hasObstacle(x, y)) {
            return false;
        }
        rover.setX(x);
        rover.setY(y);
        return true;
    }

    public void rotate(Rover rover, Boolean turnRight) {
        Orientation orientation = rover.getOrientation();

        if (turnRight) {
            orientation = orientation == Orientation.NORTH ? Orientation.EAST :
                orientation == Orientation.EAST ? Orientation.SOUTH :
                orientation == Orientation.SOUTH ? Orientation.WEST:
                Orientation.NORTH;
        } else {
            orientation = orientation == Orientation.NORTH ? Orientation.WEST :
                orientation == Orientation.WEST ? Orientation.SOUTH :
                orientation == Orientation.SOUTH ? Orientation.EAST:
                Orientation.NORTH;
        }
        rover.setOrientation(orientation);
    }
}
