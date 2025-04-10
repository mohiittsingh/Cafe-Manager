package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    private final MenuRepository repository;

    public MenuController(MenuRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return repository.findAll();
    }

    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem menuItem) {
        return repository.save(menuItem);
    }

    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id, @RequestBody MenuItem updatedItem) {
        MenuItem menuItem = repository.findById(id).orElseThrow();
        menuItem.setName(updatedItem.getName());
        menuItem.setDescription(updatedItem.getDescription());
        menuItem.setPrice(updatedItem.getPrice());
        menuItem.setStock(updatedItem.getStock());
        menuItem.setAvailable(updatedItem.isAvailable());
        return repository.save(menuItem);
    }

    @DeleteMapping("/{id}")
    public void deleteMenuItem(@PathVariable Long id) {
        repository.deleteById(id);
    }
}