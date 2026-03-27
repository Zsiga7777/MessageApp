package MessageApp.JavaBackend.DTO;

import java.util.Date;

public class PatchMessageDto {
    public String message;

    public Date updatedAt;

    public PatchMessageDto() {}

    public PatchMessageDto(String message, Date updatedAt)
    {
        this.message = message;
        this.updatedAt = updatedAt;
    }
}
