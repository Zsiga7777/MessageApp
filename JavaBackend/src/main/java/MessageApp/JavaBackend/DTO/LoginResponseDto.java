package MessageApp.JavaBackend.DTO;

import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private @NonNull String userId;
    private @NonNull  String refreshToken;
}
