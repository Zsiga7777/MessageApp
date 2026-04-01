package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Document(collection = "Messages")
public class Message {
    @Id
    private    @Nullable String id;

    private   String message;

    private String userId;

    private String chatId;

    private Date sentAt;

    private   @Nullable LocalDate updatedAt;

}
