package MessageApp.JavaBackend.Repositories;

import MessageApp.JavaBackend.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
