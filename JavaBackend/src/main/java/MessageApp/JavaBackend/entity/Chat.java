package MessageApp.JavaBackend.entity;

import com.mongodb.lang.NonNullApi;
import com.mongodb.lang.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "Chats")
public class Chat {
    @Id
    public @Nullable String id;

    public  String name;

    public List<String> userIds;

    public @Nullable Date updatedAt;

    public  Chat(){}

    public  Chat(String name, List<String> userIds){
        this.name = name;
        this.userIds = userIds;
    }
}
