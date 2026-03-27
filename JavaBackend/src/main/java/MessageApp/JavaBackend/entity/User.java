package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User{
    @Id
    public @Nullable String id;

    public  String password;

    public  String email;

    public  String name;

    public  Boolean isActive;

    public @Nullable String oTPCode;

    public  @Nullable Integer oTPCodeExpires;

    public  @Nullable String passwordResetCode;

    public String roleId;

    public  Integer age;

    public  User(){}

    public  User(String password, String email, String name, Boolean isActive, String roleId, Integer age)
    {
        this.password = password;
        this.email = email;
        this.name = name;
        this.isActive = isActive;
        this.roleId = roleId;
        this.age = age;
    }
}
