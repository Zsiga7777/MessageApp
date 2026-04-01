package MessageApp.JavaBackend.Controllers;

import MessageApp.JavaBackend.DTO.LoginDto;
import MessageApp.JavaBackend.DTO.LoginResponseDto;
import MessageApp.JavaBackend.DTO.LoginWithRefreshTokenDto;
import MessageApp.JavaBackend.DTO.RegisterUserDto;
import MessageApp.JavaBackend.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

   private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterUserDto registerUserDto){
        return authService.register(registerUserDto);
    }

    @PostMapping("/login")
    public  ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto){
        return authService.login(loginDto);
    }

    @PostMapping("/refreshTokenLogin")
    public  ResponseEntity<LoginResponseDto> login(@RequestBody LoginWithRefreshTokenDto loginWithRefreshTokenDto){
        return authService.loginWithRefreshToken(loginWithRefreshTokenDto);
    }
}
