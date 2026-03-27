package MessageApp.JavaBackend.DTO;

public class ChangePasswordDto {
    public  String oldPassword;
    public  String newPassword;

    public  ChangePasswordDto(){}

    public  ChangePasswordDto(String oldPassword, String newPassword)
    {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
