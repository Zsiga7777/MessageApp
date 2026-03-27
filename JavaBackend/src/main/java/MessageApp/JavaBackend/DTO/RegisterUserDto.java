package MessageApp.JavaBackend.DTO;

public class RegisterUserDto {

    public  String password;

    public  String email;

    public  String name;

    public  Integer age;

    public  RegisterUserDto(){}

    public  RegisterUserDto(String password, String email, String name, Integer age){
        this.password = password;
        this.email = email;
        this.name = name;
        this.age = age;
    }
}
