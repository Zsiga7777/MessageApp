package MessageApp.JavaBackend.Repositories;

import MessageApp.JavaBackend.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, String> {

}
