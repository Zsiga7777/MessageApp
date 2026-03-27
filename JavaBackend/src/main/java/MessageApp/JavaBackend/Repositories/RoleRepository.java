package MessageApp.JavaBackend.Repositories;

import MessageApp.JavaBackend.entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface RoleRepository extends MongoRepository<Role, String> {
}
