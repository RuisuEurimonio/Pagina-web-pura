package co.edu.ciclo3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = {"co.edu.ciclo3"})
@SpringBootApplication
public class Ciclo3Application {

    public static void main(String[] args) {
        SpringApplication.run(Ciclo3Application.class, args);

        System.out.println("Ejecutando");
    }
}
