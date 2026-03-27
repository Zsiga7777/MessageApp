package MessageApp.JavaBackend;

import MessageApp.JavaBackend.Repositories.RoleRepository;
import MessageApp.JavaBackend.entity.Role;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class JavaBackendApplication {

	static void main(String[] args) {
		SpringApplication.run(JavaBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedDb(RoleRepository repository) {
		return args -> {
			System.out.println(repository.count());
			if(repository.findAll().isEmpty()) {
				repository.save(new Role("user"));
				repository.save(new Role("admin"));
				System.out.println("Roles added!");
			}
		};
	}
}
