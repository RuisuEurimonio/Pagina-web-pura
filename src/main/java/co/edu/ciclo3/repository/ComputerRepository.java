/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.repository;

import co.edu.ciclo3.crudRepository.ComputerCrudRepository;
import co.edu.ciclo3.model.Computer;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Usuario
 */
@Repository
public class ComputerRepository {

    @Autowired
    private ComputerCrudRepository computerCrudRepository;

    public List<Computer> getAll() {
        return (List<Computer>) computerCrudRepository.findAll();
    }

    public Optional<Computer> getComputer(int id) {
        return computerCrudRepository.findById(id);
    }

    public Computer save(Computer computer) {
        return computerCrudRepository.save(computer);
    }

    public void delete(Computer computer) {
        computerCrudRepository.delete(computer);
    }
}
