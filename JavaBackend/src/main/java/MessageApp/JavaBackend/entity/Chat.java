package MessageApp.JavaBackend.entity;

import com.mongodb.lang.Nullable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Document(collection = "Chats")
public class Chat {
    @Id
    private @Nullable String id;

    private   String name;

    private List<String> userIds;

    private @Nullable LocalDate updatedAt;
}
