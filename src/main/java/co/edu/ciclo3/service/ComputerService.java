/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.service;

import co.edu.ciclo3.model.Computer;
import co.edu.ciclo3.repository.ComputerRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class ComputerService {

    @Autowired
    private ComputerRepository computerRepository;

    public List<Computer> getAll() {
        return computerRepository.getAll();
    }

    public Optional<Computer> getComputer(int id) {
        return computerRepository.getComputer(id);
    }

    public Computer save(Computer computer) {
        if (computer.getBrand().length() > 0 && computer.getBrand().length() < 46
                && computer.getName().length() > 0 && computer.getName().length() < 46
                && computer.getYear() > 999 && computer.getYear() < 10000
                && computer.getDescription().length() < 251) {
            if (computer.getId() == null) {
                return computerRepository.save(computer);
            } else {
                return computer;
            }
        } else {
            return computer;
        }
    }

    public boolean delete(int id) {
        boolean computer = computerRepository.getComputer(id).map(Computer -> {
            computerRepository.delete(Computer);
            return true;
        }).orElse(false);
        return computer;
    }

    public Computer update(Computer computer) {
        System.out.println("Ejecutando servicio computador.");
        System.out.println("1 de 6");
        if (computer.getBrand().length() < 46 && computer.getName().length() < 46
                && computer.getYear() > 999 && computer.getYear() < 10000
                && computer.getDescription().length() < 251) {
            System.out.println("2 de 6");
            if (computer.getId() != null) {
                System.out.println("3 de 6");
                Optional<Computer> computerConsultado = computerRepository.getComputer(computer.getId());
                if (computerConsultado.isPresent() && (computer.getMessages() == null) && (computer.getReservations() == null)) {
                    System.out.println("4 de 6");
                    if ((computer.getBrand() != null) && (computer.getDescription() != null) 
                            && (computer.getName() != null) && (computer.getYear() != null)) {
                        System.out.println("5 de 6");
                        computerConsultado.get().setBrand(computer.getBrand());
                        computerConsultado.get().setDescription(computer.getDescription());
                        computerConsultado.get().setMessages(computer.getMessages());
                        computerConsultado.get().setName(computer.getName());
                        computerConsultado.get().setReservations(computer.getReservations());
                        computerConsultado.get().setYear(computer.getYear());
                    }
                    System.out.println("6 de 6");
                    System.out.println("Terminando servicio computador");
                    return computerRepository.save(computerConsultado.get());
                }
            }
            return computer;
        }
        return computer;
    }
}
