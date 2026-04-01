package MessageApp.JavaBackend.Repositories;

import MessageApp.JavaBackend.DTO.LoginDto;
import MessageApp.JavaBackend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findUserByEmailAndPassword(String email, String password);
}
