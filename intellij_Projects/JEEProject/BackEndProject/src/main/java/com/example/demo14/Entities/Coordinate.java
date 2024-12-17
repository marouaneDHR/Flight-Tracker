package com.example.demo14.Entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor @Builder
@Embeddable
public class Coordinate {
    @Nullable
    private double latitude ;
    @Nullable
    private double longitude ;
}
