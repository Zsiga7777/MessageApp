package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Roles")
public class Role {
    @Id
    public @Nullable String id;

    public  String name;

    public Role(){}

    public  Role(String name){
        this.name=name;
    }
}
