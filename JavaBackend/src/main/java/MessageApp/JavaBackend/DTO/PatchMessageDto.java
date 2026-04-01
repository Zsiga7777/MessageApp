package MessageApp.JavaBackend.DTO;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class PatchMessageDto {
    private @NonNull String message;

    private @NonNull LocalDate updatedAt;
}
