/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.service;

import co.edu.ciclo3.model.Client;
import co.edu.ciclo3.model.Computer;
import co.edu.ciclo3.model.Message;
import co.edu.ciclo3.repository.ClientRepository;
import co.edu.ciclo3.repository.ComputerRepository;
import co.edu.ciclo3.repository.MessageRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ComputerRepository computerRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Message> getAll() {
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id) {
        return messageRepository.getMessage(id);
    }

    public Message save(Message message) {
        if (message.getMessageText().length() < 251) {
            if (message.getIdMessage() == null) {
                return messageRepository.save(message);
            } else {
                return message;
            }
        } else {
            return message;
        }
    }

    public boolean delete(int id) {
        boolean message = messageRepository.getMessage(id).map(Message -> {
            messageRepository.delete(Message);
            return true;
        }).orElse(false);
        return message;
    }

    public Message update(Message message) {
        System.out.println("Ejecutando mensaje service");
        System.out.println("1 de 7");
        if (message.getMessageText().length() < 251) {
            System.out.println("2 de 7");
            if (message.getIdMessage() != null) {
                System.out.println("3 de 7");
                Optional<Message> messageConsultado = messageRepository.getMessage(message.getIdMessage());
                if (messageConsultado.isPresent()) {
                    System.out.println("4 de 7");
                    if ((message.getMessageText() != null)) {
                        System.out.println("5 de 7");
                        messageConsultado.get().setMessageText(message.getMessageText());
                    }
                    if (message.getComputer().getId() != null) {
                        System.out.println("6 de 7");
                        Optional<Computer> computerRelational = computerRepository.getComputer(message.getComputer().getId());
                        if (computerRelational.isPresent()) {
                            messageConsultado.get().setComputer(computerRelational.get());
                        }
                    }
                    if (message.getClient().getIdClient() != null) {
                        System.out.println("7 de 7");
                        Optional<Client> clientRelational = clientRepository.getClient(message.getClient().getIdClient());
                        if (clientRelational.isPresent()) {
                            messageConsultado.get().setClient(clientRelational.get());
                        }
                    }
                    System.out.println("Salida esperada, salir de mensaje service");
                    return messageRepository.save(messageConsultado.get());
                }
            }
            return message;
        }
        return message;
    }
}
