package com.merkle.rover.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.merkle.rover.enums.Orientation;
import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Table(name = "rover")
public class Rover {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "x")
    private Integer x;

    @Column(name = "y")
    private Integer y;

    @Column(name = "orientation")
    private Orientation orientation;
}
