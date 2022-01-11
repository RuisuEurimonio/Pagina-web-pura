/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.service;

import co.edu.ciclo3.model.Admin;
import co.edu.ciclo3.repository.AdminRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll() {
        return adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin admin) {
        if (admin.getEmail().length() > 0 && admin.getEmail().length() < 46 && admin.getPassword().length() > 0 && admin.getPassword().length() < 46 && admin.getName().length() < 251) {
            if (admin.getIdAdmin() == null) {
                return adminRepository.save(admin);
            } else {
                return admin;
            }
        } else {
            return admin;
        }
    }

    public boolean delete(int id) {
        boolean admin = adminRepository.getAdmin(id).map(Admin -> {
            adminRepository.delete(Admin);
            return true;
        }).orElse(false);
        return admin;
    }

    public Admin update(Admin admin) {
        if (admin.getIdAdmin() != null) {
            Optional<Admin> adminConsultado = adminRepository.getAdmin(admin.getIdAdmin());
            if (adminConsultado.isPresent()) {
                if ((admin.getName() != null) && (admin.getEmail() != null) && (admin.getPassword() != null)) {
                    adminConsultado.get().setName(admin.getName());
                    adminConsultado.get().setEmail(admin.getEmail());
                    adminConsultado.get().setPassword(admin.getPassword());
                }
                return adminRepository.save(adminConsultado.get());
            }
        }
        return admin;
    }
}
