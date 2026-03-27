package MessageApp.JavaBackend.DTO;

public class LoginDto {
    public String email;
    public  String password;
    public  Boolean stayLoggedIn;

    public  LoginDto(){}

    public  LoginDto(String email, String password, Boolean stayLoggedIn)
    {
        this.email = email;
        this.password = password;
        this.stayLoggedIn = stayLoggedIn;
    }
}
