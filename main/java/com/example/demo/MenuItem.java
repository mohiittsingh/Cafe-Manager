package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue
    private Long id;
    private String name;        // e.g., "Cappuccino"
    private String description; // e.g., "Creamy coffee with foam"
    private double price;       // e.g., 3.50
    private int stock;          // e.g., 20 units in inventory
    private boolean available;  // e.g., true if item is on menu
}