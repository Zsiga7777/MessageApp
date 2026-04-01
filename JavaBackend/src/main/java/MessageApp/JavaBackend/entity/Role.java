package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Roles")
public class Role {
    @Id
    private @Nullable String id;

    private  String name;

    public Role(String name){
        this.name = name;
    }
}
