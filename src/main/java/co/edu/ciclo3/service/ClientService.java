/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.service;

import co.edu.ciclo3.model.Client;
import co.edu.ciclo3.repository.ClientRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll() {
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id) {
        return clientRepository.getClient(id);
    }

    public Client save(Client client) {
        if (client.getEmail().length() > 0 && client.getEmail().length() < 46
                && client.getAge() > 0 && client.getName().length() < 251
                && client.getPassword().length() > 0 && client.getPassword().length() < 46) {
            if (client.getIdClient() == null) {
                return clientRepository.save(client);
            } else {
                return client;
            }
        } else {
            return client;
        }
    }

    public boolean delete(int id) {
        boolean client = clientRepository.getClient(id).map(Client -> {
            clientRepository.delete(Client);
            return true;
        }).orElse(false);
        return client;
    }

    public Client update(Client client) {
        if (client.getAge() > 0 && client.getName().length() < 251
                && client.getPassword().length() > 0 && client.getPassword().length() < 46) {
            if (client.getIdClient() != null) {
                Optional<Client> clientConsultado = clientRepository.getClient(client.getIdClient());
                if (clientConsultado.isPresent()) {
                    if ((client.getAge() != null) && (client.getEmail() != null)
                            && (client.getName() != null) && (client.getPassword() != null)) {
                        clientConsultado.get().setAge(client.getAge());
                        clientConsultado.get().setEmail(client.getEmail());
                        clientConsultado.get().setName(client.getName());
                        clientConsultado.get().setPassword(client.getPassword());
                        clientConsultado.get().setReservations(client.getReservations());
                    }
                    return clientRepository.save(clientConsultado.get());
                }
            }
            return client;
        }
        return client;
    }

}
