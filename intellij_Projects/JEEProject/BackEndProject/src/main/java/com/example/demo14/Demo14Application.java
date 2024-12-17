    package com.example.demo14;

    import com.example.demo14.Entities.*;
    import com.example.demo14.Service.AccountService;
    import com.example.demo14.Service.AirportServiceImpl;
    import com.example.demo14.Service.AirplaneServiceImpl;
    import com.example.demo14.Service.FlightServiceImpl;
    import com.example.demo14.jwtEntities.AppRole;
    import com.example.demo14.jwtEntities.AppUser;
    import org.springframework.boot.CommandLineRunner;
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.context.annotation.Bean;

    import java.util.ArrayList;

    @SpringBootApplication
    public class Demo14Application {

        public static void main(String[] args) {
            SpringApplication.run(Demo14Application.class, args);
        }


        //@Bean
        CommandLineRunner commandLineRunner(AccountService accountService, AirplaneServiceImpl airplaneService,
                                            AirportServiceImpl airportService){
            return ( args -> {
                        accountService.createUser(new AppUser(null, "Marouane", "2001", new ArrayList<>()));
                        accountService.createUser(new AppUser(null, "Mahdi", "2006", new ArrayList<>()));

                        accountService.createRole(new AppRole(null,"ROLE_USER"));
                        accountService.createRole(new AppRole(null,"ROLE_ADMIN"));
                        accountService.createRole(new AppRole(null,"ROLE_MANAGER"));

                        accountService.addRoleToUser("Marouane", "ROLE_USER");
                        accountService.addRoleToUser("Mahdi", "ROLE_USER");
                        accountService.addRoleToUser("Mahdi", "ROLE_ADMIN");

                        airportService.create(new Airport(null, "USA", new Coordinate(39.368,-94.914), "USA"));
                        airportService.create(new Airport(null, "MOROCCO", new Coordinate(31.949,-4.401), "MOROCCO"));
                        airportService.create(new Airport(null, "SPAIN", new Coordinate(43.563,-6.034), "SPAIN"));
                        airportService.create(new Airport(null, "NETHERLANDS", new Coordinate(52.309,4.764), "NETHERLANDS"));
                        airportService.create(new Airport(null, "CHINA", new Coordinate(40.08,116.584), "CHINA"));
                        airportService.create(new Airport(null, "EGYPT", new Coordinate(31.073,33.836), "EGYPT"));
                        airportService.create(new Airport(null, "ENGLAND", new Coordinate(52.454,-1.748), "ENGLAND"));
                        airportService.create(new Airport(null, "FRANCE", new Coordinate(48.594,3.005), "FRANCE"));
                        airportService.create(new Airport(null, "RUSSIA", new Coordinate(43.062,74.478), "RUSSIA"));
                        airportService.create(new Airport(null, "SAUDI ARABIA", new Coordinate(22.703,39.07), "SAUDIARABIA"));
                        airportService.create(new Airport(null, "SUDAN", new Coordinate(15.589,32.553), "SUDAN"));
                        airportService.create(new Airport(null, "ITALY", new Coordinate(41.433,15.535), "ITALY"));
                        airportService.create(new Airport(null, "Canary Islands", new Coordinate(28.626,-17.756), "CANARYISLANDS"));
                        airportService.create(new Airport(null, "TUNISIA", new Coordinate(36.851,10.227), "TUNISIA"));
                        airportService.create((new Airport(null, "LIBYA", new Coordinate(28.638,21.438), "LIBYA")));
                        airportService.create(new Airport(null, "TURKEY", new Coordinate(40.128,32.995), "TURKEY")) ;
                        airportService.create((new Airport(null, "IRELAND", new Coordinate(53.301,-8.939), "IRELAND")));

                        airplaneService.create(new Airplane(null,"ShortAirplane", Airplane.TypeAvion.SHORT, 2000, 9331,2745 ));
                        airplaneService.create(new Airplane(null,"MediumAirplane", Airplane.TypeAvion.MEDIUM, 3100, 30030, 6850));
                        airplaneService.create(new Airplane(null,"LongAirplane", Airplane.TypeAvion.LONG, 12100, 242470, 14320));
            }) ;
        }
    }
