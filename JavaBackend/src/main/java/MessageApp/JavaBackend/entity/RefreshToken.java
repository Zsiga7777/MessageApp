package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "RefreshTokens")
public class RefreshToken {
    @Id
    private @Nullable String id;

    private   String token;

    private   String userId;

    private LocalDate expiresAt;

    private   LocalDate createdAt;

    public  RefreshToken(String token, String userId, LocalDate expiresAt, LocalDate createdAt){
        this.token=token;
        this.userId = userId;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
    }
}
