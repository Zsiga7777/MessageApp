package MessageApp.JavaBackend.DTO;

import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class LoginWithRefreshTokenDto {
    private @NonNull String email;
    private  @NonNull  String refreshToken;
}
