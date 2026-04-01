package MessageApp.JavaBackend.DTO;

import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {
    private @NonNull   String oldPassword;
    private @NonNull  String newPassword;
}
