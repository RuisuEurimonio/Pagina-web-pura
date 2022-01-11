/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Modelo de la entidad computer que va a contener las relaciones con categoria
 * y reservaciones, ademas de los demas atributos, con los get y set
 * correspondiente a cada variable encapsulada.
 *
 * @author Luis Felipe Linares Perdomo.
 */
@Entity
@Table(name = "computer")
public class Computer implements Serializable {

    /**
     * Variable de id que va a ser la llave primaria de la base de datos ademas
     * de ser autoincrementable
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * variable que contendra el nombre del computer
     */
    private String name;
    /**
     * variable que va a contener el modelo del computer
     */
    private String brand;
    /**
     * variable que va a contener el año del computer
     */
    private Integer year;
    /**
     * variable que va a contener el
     */
    private String description;

    /**
     * Creo una variable con relacion con category, donde es una relacion muchos
     * a uno, creando una llave foranea llamada category_id y para evitar los
     * ciclos infinitos se coloca el jsonignore referenciando a la tabla
     * computers de la relacion. Este dato es de tipo category.
     */
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("computers")
    private Category category;

    /**
     * Creo otra variable con relacion con messages, siendo una relacion de uno
     * a muchos con una ejecucion en cascada y que busca la variable computer
     * creada en la otra clase, ademas ignora la tabla computer y la de cliente.
     * Este dato guarda una lista de messages.
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "computer")
    @JsonIgnoreProperties({"computer", "client"})
    private List<Message> messages;

    /**
     * Creo una variable con relacion con reservations, donde es una relacion
     * muchos a uno, con ejecucion en cascada y busca el computer de la otra
     * clase, ignora de igual forma computer de esa clase. Este dato guarda una
     * lista de reservations.
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "computer")
    @JsonIgnoreProperties("computer")
    private List<Reservation> reservations;

    /**
     * Get de id para obtener el dato
     *
     * @return id del dato
     */
    public Integer getId() {
        return id;
    }

    /**
     * Set para establecer un id
     *
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Get de brand para obtener el dato
     *
     * @return brand del dato
     */
    public String getBrand() {
        return brand;
    }

    /**
     * Set para establecer un brand
     *
     * @param brand
     */
    public void setBrand(String brand) {
        this.brand = brand;
    }

    /**
     * Get de year para obtener el dato
     *
     * @return year del dato
     */
    public Integer getYear() {
        return year;
    }

    /**
     * Set para establecer un year
     *
     * @param year
     */
    public void setYear(Integer year) {
        this.year = year;
    }

    /**
     * Get de category para obtener el dato
     *
     * @return category del dato
     */
    public Category getCategory() {
        return category;
    }

    /**
     * Set para establecer un category
     *
     * @param category
     */
    public void setCategory(Category category) {
        this.category = category;
    }

    /**
     * Get de name para obtener el dato
     *
     * @return name del dato
     */
    public String getName() {
        return name;
    }

    /**
     * Set para establecer un name
     *
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get de description para obtener el dato
     *
     * @return description del dato
     */
    public String getDescription() {
        return description;
    }

    /**
     * Set para establecer un description
     *
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Get de message para obtener el dato
     *
     * @return message del dato
     */
    public List<Message> getMessages() {
        return messages;
    }

    /**
     * Set para establecer un message
     *
     * @param messages
     */
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    /**
     * Get de reservation para obtener el dato
     *
     * @return reservations del dato
     */
    public List<Reservation> getReservations() {
        return reservations;
    }

    /**
     * Set para establecer un reservation
     *
     * @param reservations
     */
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

}
