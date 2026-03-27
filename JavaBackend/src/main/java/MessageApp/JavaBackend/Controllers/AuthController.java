package MessageApp.JavaBackend.Controllers;

import MessageApp.JavaBackend.DTO.LoginDto;
import MessageApp.JavaBackend.DTO.LoginWithRefreshTokenDto;
import MessageApp.JavaBackend.DTO.RegisterUserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterUserDto registerUserDto){

    }

    @PostMapping("/login")
    public  ResponseEntity<String> login(@RequestBody LoginDto loginDto){

    }

    @PostMapping("/refreshTokenLogin")
    public  ResponseEntity<String> login(@RequestBody LoginWithRefreshTokenDto loginWithRefreshTokenDto){

    }
}
