/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.crudRepository;

import co.edu.ciclo3.model.Message;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Usuario
 */
public interface MessageCrudRepository extends CrudRepository<Message, Integer> {

}
