package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Ref;
import java.util.Date;

@Document(collection = "RefreshTokens")
public class RefreshToken {
    @Id
    public @Nullable String id;

    public  String token;

    public  String userId;

    public Date expiresAt;

    public  Date createdAt;

    public @Nullable  Date updatedAt;

    public  RefreshToken() {}

    public RefreshToken(String token, String userId, Date expiresAt, Date createdAt){
        this.token = token;
        this.userId = userId;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
    }
}
