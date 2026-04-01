package MessageApp.JavaBackend.Repositories;

import MessageApp.JavaBackend.entity.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    RefreshToken findRefreshTokenByToken(String token);

    RefreshToken updateRefreshTokenAndExpiresAtById(String id, String token, LocalDate expiresAt);
}
