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
@Table(name = "obstacle")
public class Obstacle {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(name = "x")
    private Integer x;

    @Column(name = "y")
    private Integer y;
}
