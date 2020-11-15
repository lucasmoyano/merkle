package com.merkle.rover.enums;

import java.io.Serializable;

public enum Orientation implements Serializable {
    NORTH,
    EAST,
    SOUTH,
    WEST;

    public String getName() {
        return this.name();
    }
}
