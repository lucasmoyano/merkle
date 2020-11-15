package com.merkle.rover.controllers;

import com.merkle.rover.models.Obstacle;
import com.merkle.rover.models.Rover;
import com.merkle.rover.services.MapService;
import com.merkle.rover.services.RoverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("api/map")
public class MapController {

    @Autowired
    MapService mapService;

    @RequestMapping(value = "/obstacles/", method = RequestMethod.GET)
    List<Obstacle> getAllObstacles() {
        return mapService.getAll();
    }

    @RequestMapping(value = "/obstacles/{id}", method = RequestMethod.GET)
    Obstacle getObstacle(@RequestHeader HttpHeaders headers, @PathVariable Integer id) {
        return mapService.get(id);
    }

}
