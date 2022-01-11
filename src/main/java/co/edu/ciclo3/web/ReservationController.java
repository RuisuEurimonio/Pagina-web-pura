/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.web;

import co.edu.ciclo3.model.Reservation;
import co.edu.ciclo3.model.custom.CountClient;
import co.edu.ciclo3.model.custom.StatusReservation;
import co.edu.ciclo3.service.ReservationService;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Usuario
 */
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getMessages() {
        return reservationService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getMessage(@PathVariable("id") int id) {
        return reservationService.getReservation(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation) throws ParseException {
        return reservationService.save(reservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") int id) {
        return new ResponseEntity<>(reservationService.delete(id), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation) {
        System.out.println("Ejecutando controller reservation");
        System.out.println("1 de 1");
        return reservationService.update(reservation);
    }
    
    @GetMapping("/report-status")
    public StatusReservation getReservas(){
        return reservationService.reporteStatusServicio();
    }
    
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
     public List<Reservation> getReservasTiempo (@PathVariable("dateOne")String dateOne, @PathVariable("dateTwo")String dateTwo ){
         return reservationService.reporteTiempoServicio(dateOne, dateTwo);
     }
     
     @GetMapping("/report-clients")
     public List<CountClient> getClientes(){
         return reservationService.reporteClientesServicio();
     }

}
