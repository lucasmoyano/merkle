package com.merkle.rover.controllers;

import com.merkle.rover.models.Rover;
import com.merkle.rover.services.RoverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("api/rover")
public class RoverController {

    @Autowired
    RoverService roverService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    Rover get() {
        return roverService.get();
    }

    /**
     * Move the Rover
     * @param headers
     * @param command Can be 'l', 'r', 'f' or 'b'.
     */
    @RequestMapping(value = "/command/{command}", method = RequestMethod.GET)
    Rover move(@RequestHeader HttpHeaders headers, @PathVariable String command) {
        return roverService.executeCommand(command);
    }
}
