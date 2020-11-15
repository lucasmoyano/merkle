package com.merkle.rover;

import com.merkle.rover.dao.MapDao;
import com.merkle.rover.dao.RoverDao;
import com.merkle.rover.enums.Orientation;
import com.merkle.rover.models.Obstacle;
import com.merkle.rover.models.Rover;
import com.merkle.rover.services.MapService;
import com.merkle.rover.services.RoverService;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.Assert;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
class RoverDaoTests {

    @InjectMocks
    RoverService roverService;

    @Mock
    MapService mapService;

    @Mock
    RoverDao roverDao;

    @Mock
    MapDao mapDao;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void test_get_rover()
    {
        prepareMockDataBase();
        Rover rover =  roverService.get();
        Assert.assertTrue(rover.getX() == 5);
        Assert.assertTrue(rover.getY() == 2);
    }

    @Test
    public void test_rotation()
    {
        prepareMockDataBase();
        Rover rover =  roverService.get();
        Assert.assertTrue(rover.getOrientation() == Orientation.NORTH);
        roverService.executeCommand("r");
        Assert.assertTrue(rover.getOrientation() == Orientation.EAST);
        roverService.executeCommand("r");
        Assert.assertTrue(rover.getOrientation() == Orientation.SOUTH);
        roverService.executeCommand("r");
        Assert.assertTrue(rover.getOrientation() == Orientation.WEST);
        roverService.executeCommand("r");
        Assert.assertTrue(rover.getOrientation() == Orientation.NORTH);
        roverService.executeCommand("l");
        Assert.assertTrue(rover.getOrientation() == Orientation.WEST);
        roverService.executeCommand("l");
        Assert.assertTrue(rover.getOrientation() == Orientation.SOUTH);
        roverService.executeCommand("l");
        Assert.assertTrue(rover.getOrientation() == Orientation.EAST);
        roverService.executeCommand("l");
        Assert.assertTrue(rover.getOrientation() == Orientation.NORTH);
    }

    @Test
    public void test_movement_with_obstacles()
    {
        prepareMockDataBase();
        Rover rover =  roverService.get();
        Assert.assertTrue(rover.getY() == 2);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getY() == 1);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getY() == 1);
        roverService.executeCommand("l");
        Assert.assertTrue(rover.getOrientation() == Orientation.WEST);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getX() == 4);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getX() == 3);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getX() == 2);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getX() == 1);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getX() == 0);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getX() == 9);
        roverService.executeCommand("r");
        Assert.assertTrue(rover.getOrientation() == Orientation.NORTH);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getY() == 0);
        roverService.executeCommand("f");
        Assert.assertTrue(rover.getY() == 9);
    }

    private void prepareMockDataBase() {
        Rover rover = new Rover();
        rover.setId(1);
        rover.setName("ExoMars");
        rover.setX(5);
        rover.setY(2);
        rover.setOrientation(Orientation.NORTH);

        when(roverDao.get()).thenReturn(rover);


        Obstacle obstacleA = new Obstacle();
        obstacleA.setId(1);
        obstacleA.setX(2);
        obstacleA.setY(2);

        Obstacle obstacleB = new Obstacle();
        obstacleB.setId(1);
        obstacleB.setX(5);
        obstacleB.setY(0);

        List<Obstacle> obstacles = new ArrayList<>();
        obstacles.add(obstacleA);
        obstacles.add(obstacleB);

        when(mapService.getAll()).thenReturn(obstacles);
        when(mapService.hasObstacle(2, 2)).thenReturn(true);
        when(mapService.hasObstacle(5, 0)).thenReturn(true);
        when(mapDao.hasObstacle(anyInt(), anyInt())).thenReturn(false);
    }

}
