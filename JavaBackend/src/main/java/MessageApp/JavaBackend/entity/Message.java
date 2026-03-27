package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Messages")
public class Message {
    @Id
    public  @Nullable String id;

    public  String message;

    public String userId;

    public String chatId;

    public Date sentAt;

    public  @Nullable Date updatedAt;

    public  Date updatedDate;

    public  Message(){}

    public  Message(String message, String userId, String chatId, Date sentAt){
        this.message = message;
        this.userId = userId;
        this.chatId = chatId;
        this.sentAt = sentAt;
    }
}
