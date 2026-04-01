package MessageApp.JavaBackend.DTO;

import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {

    private @NonNull String password;

    private  @NonNull  String email;

    private  @NonNull  String name;

    private  @NonNull  Integer age;
}
