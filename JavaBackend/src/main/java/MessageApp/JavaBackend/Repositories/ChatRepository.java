package MessageApp.JavaBackend.Repositories;

import MessageApp.JavaBackend.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
List<Chat> findChatsByUserIds(List<String> userIds);
}
