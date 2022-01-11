/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.repository;

import co.edu.ciclo3.crudRepository.AdminCrudRepository;
import co.edu.ciclo3.model.Admin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Usuario
 */
@Repository
public class AdminRepository {

    @Autowired
    private AdminCrudRepository adminCrudRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminCrudRepository.findAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return adminCrudRepository.findById(id);
    }

    public Admin save(Admin admin) {
        return adminCrudRepository.save(admin);
    }

    public void delete(Admin admin) {
        adminCrudRepository.delete(admin);
    }
}
