package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Users")
public class User{
    @Id
    private @Nullable String id;

    private   String password;

    private  String email;

    private  String name;

    private  Boolean isActive;

    private @Nullable String oTPCode;

    private  @Nullable Integer oTPCodeExpires;

    private  @Nullable String passwordResetCode;

    private String roleId;

    private  Integer age;

    public User(String password, String email, String name, Boolean isActive, String roleId, Integer age){
        this.password = password;
        this.email = email;
        this.name = name;
        this.isActive = isActive;
        this.roleId = roleId;
        this.age = age;
    }
}
