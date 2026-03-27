package MessageApp.JavaBackend.Repositories;

import MessageApp.JavaBackend.entity.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
}
