/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.service;

import co.edu.ciclo3.model.Client;
import co.edu.ciclo3.model.Computer;
import co.edu.ciclo3.model.Reservation;
import co.edu.ciclo3.model.custom.CountClient;
import co.edu.ciclo3.model.custom.StatusReservation;
import co.edu.ciclo3.repository.ClientRepository;
import co.edu.ciclo3.repository.ComputerRepository;
import co.edu.ciclo3.repository.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Clase que sera la encargada de realizar las validaciones de los datos y sirve
 * de puente entre el controlador y el repositorio de las reservaciones.
 *
 * @author Luis Felipe Linares Perdomo
 */
@Service
public class ReservationService {

    /**
     * Se crea la variable correspondiente a un objeto del repositorio de
     * reserva, con la etiqueta autowired.
     */
    @Autowired
    private ReservationRepository reservationRepos;

    /**
     * Se crea la variable correspondiente a un objeto del repositorio de
     * cliente con la etiqueta autowire, esta sirve para la relacion.
     */
    @Autowired
    private ClientRepository clientRepository;

    /**
     * Se crea la variable correspondiente a un objeto del repositorio de
     * computador con la etiqueta autowire, esta sirve para la relacion.
     */
    @Autowired
    private ComputerRepository computerRepos;

    /**
     * Metodo que sirve para obtener la lista de objetos existentes en la
     * reserva.
     *
     * @return metodo del repositorio para obtener todos lo valores.
     */
    public List<Reservation> getAll() {
        return reservationRepos.getAll();
    }

    /**
     * Metodo que sirve para obtener una reserva en especifico por medio de su
     * id
     *
     * @param id
     * @return metodo del repositorio para obtener una sola reserva
     */
    public Optional<Reservation> getReservation(int idReservation) {
        return reservationRepos.getReservation(idReservation);
    }

    /**
     * Metodo para guardar una nueva reserva recibiendo un objeto de tipo
     * reservation
     *
     * @param reservation
     * @return si los datos son correctos retorna el metodo del repositorio para
     * guardar, si es falso retorna el objeto reservation actual.
     * @throws ParseException
     */
    public Reservation save(Reservation reservation) throws ParseException {
        /**
         * condicional que valida si el id es nulo, si es verdadero retorna la
         * funcion de guardado del repositorio, si es falso valida si no esta
         * vacio para retonar un guardado auxiliar.
         */
        if (reservation.getIdReservation() == null) {
            return reservationRepos.save(reservation);
        } else {
            Optional<Reservation> reservationAux = reservationRepos.getReservation(reservation.getIdReservation());
            /**
             * condicional que compara si la cadena esta vacia o tiene
             * contenido, si es verdadero retorna el guardado axuliar, si es
             * falso retorna el objeto.
             */
            if ("".equals(reservationAux)) {
                return reservationRepos.save(reservation);
            } else {
                return reservation;
            }
        }
    }

    /**
     * Metodo que sirve para eliminar una reserva por medio de su id, hace un
     * mapeo a los objetos y elimina el que coinda con el id
     *
     * @param id
     * @return si es true ejecuta el metodo de elimado, si es falso retorna el
     * objeto.
     */
    public boolean delete(int idReservation) {
        boolean reservation = reservationRepos.getReservation(idReservation).map(message -> {
            reservationRepos.delete(message);
            return true;
        }).orElse(false);
        return false;
    }

    /**
     * metodo para actualizar una reserva obteniendo los valores necesarios.
     *
     * @param reservation
     * @return si es true retorna el metodo de actualizacion del repositorio, si
     * es falso retorna el objeto.
     */
    public Reservation update(Reservation reservation) {
        System.out.println("Ejecutando servicio reservation");
        System.out.println("1 de 10");
        /**
         * Condicional que valida que el id no sea nulo si es false retorna el
         * objeto
         */
        if (reservation.getIdReservation() != null) {
            System.out.println("2 de 10");
            /**
             * Condicional que valida que la fecha inicio sea menor que la fecha
             * fin si es false retorna el objeto
             */
            if (reservation.getStartDate().before(reservation.getDevolutionDate())
                    || reservation.getStartDate().equals(reservation.getDevolutionDate())) {
                System.out.println("3 de 10");
                Optional<Reservation> reserConsul = reservationRepos.getReservation(reservation.getIdReservation());
                /**
                 * Condicional que valida que la reserva ya exista
                 */
                if (reserConsul.isPresent()) {
                    System.out.println("4 de 10");
                    /**
                     * condicional que valida que los datos no sean nulos
                     */
                    if (reservation.getDevolutionDate() != null && reservation.getScore() != null
                            && reservation.getStartDate() != null && reservation.getStatus() != null) {
                        System.out.println("5 de 10");
                        reserConsul.get().setDevolutionDate(reservation.getDevolutionDate());
                        reserConsul.get().setScore(reservation.getScore());
                        reserConsul.get().setStartDate(reservation.getStartDate());
                        reserConsul.get().setStatus(reservation.getStatus());
                    }
                    /**
                     * condicional que valida que el id del cliente relacionado
                     * no sea nulo
                     */
                    if (reservation.getClient().getIdClient() != null) {
                        System.out.println("6 de 10");
                        Optional<Client> reservationRel = clientRepository.getClient(reservation.getClient().getIdClient());
                        if (reservationRel.isPresent()) {
                            System.out.println("7 de 10");
                            reserConsul.get().setClient(reservationRel.get());
                        }
                    }
                    /**
                     * condicional que valida que el id del computador
                     * relacionado no sea nulo
                     */
                    if (reservation.getComputer().getId() != null) {
                        System.out.println("8 de 10");
                        Optional<Computer> computerRelation = computerRepos.getComputer(reservation.getComputer().getId());
                        if (computerRelation.isPresent()) {
                            System.out.println("9 de 10");
                            reserConsul.get().setComputer(computerRelation.get());
                        }
                    }
                    System.out.println("10 de 10");
                    System.out.println("Saliendo de servicio reservation");
                    return reservationRepos.save(reserConsul.get());
                }
            }
            return reservation;
        }
        return reservation;
    }

    /**
     * Metodo que sirve para crear los reportes de los status solo con los
     * completados y los cancelados.
     *
     * @return Nuevo objeto tipo statusreservation.
     */
    public StatusReservation reporteStatusServicio() {
        List<Reservation> completed = reservationRepos.ReservacionStatusRepositorio("completed");
        List<Reservation> cancelled = reservationRepos.ReservacionStatusRepositorio("cancelled");

        return new StatusReservation(completed.size(), cancelled.size());
    }

    /**
     * Metodo para crear los reportes por medio del tiempo ingresado, parseando
     * el tipo date y recibiendo los dos strings ingresados para pasarlos a
     * dates
     *
     * @param datoA
     * @param datoB
     * @return metodo del reservation repository.
     */
    public List<Reservation> reporteTiempoServicio(String datoA, String datoB) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");

        Date datoUno = new Date();
        Date datoDos = new Date();

        try {
            datoUno = parser.parse(datoA);
            datoDos = parser.parse(datoB);
        } catch (ParseException evt) {
            evt.printStackTrace();
        }
        if (datoUno.before(datoDos)) {
            return reservationRepos.ReservacionTiempoRepositorio(datoUno, datoDos);
        } else {
            return new ArrayList<>();

        }
    }

    /**
     * Metodo para crear el reporte de los clientes.
     *
     * @return metodo que recibe los clientes del repositorio.
     */
    public List<CountClient> reporteClientesServicio() {
        return reservationRepos.getClientesRepositorio();
    }

}
