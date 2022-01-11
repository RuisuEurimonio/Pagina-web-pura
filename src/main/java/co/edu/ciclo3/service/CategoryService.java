/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.service;

import co.edu.ciclo3.model.Category;
import co.edu.ciclo3.repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int id) {
        return categoryRepository.getCategory(id);
    }

    public Category save(Category category) {
        if (category.getName().length() > 0 && category.getName().length() < 46
                && category.getDescription().length() < 251) {
            if (category.getId() == null) {
                return categoryRepository.save(category);
            } else {
                return category;
            }
        } else {
            return category;
        }
    }

    public boolean delete(int id) {
        boolean category = categoryRepository.getCategory(id).map(Category -> {
            categoryRepository.delete(Category);
            return true;
        }).orElse(false);
        return category;
    }

    public Category update(Category category) {
        System.out.println("Ejecutando servicio category");
        System.out.println("1 de 5");
        if (category.getId() != null) {
            System.out.println("2 de 5");
            Optional<Category> categoryConsultada = categoryRepository.getCategory(category.getId());
            if (categoryConsultada.isPresent()) {
                System.out.println("3 de 5");
                if ((category.getDescription() != null) && (category.getName() != null)) {
                    System.out.println("4 de 5");
                    categoryConsultada.get().setComputers(category.getComputers());
                    categoryConsultada.get().setDescription(category.getDescription());
                    categoryConsultada.get().setName(category.getName());
                }
                System.out.println("5 de 5");
                System.out.println("Saliendo de servicio category");
                return categoryRepository.save(categoryConsultada.get());
            }
        }
        return category;
    }

}
