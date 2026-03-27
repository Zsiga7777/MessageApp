package MessageApp.JavaBackend.DTO;

public class LoginWithRefreshTokenDto {
    public String email;
    public  String refreshToken;

    public  LoginWithRefreshTokenDto(){}

    public  LoginWithRefreshTokenDto(String email, String refreshToken)
    {
        this.email = email;
        this.refreshToken = refreshToken;
    }
}
