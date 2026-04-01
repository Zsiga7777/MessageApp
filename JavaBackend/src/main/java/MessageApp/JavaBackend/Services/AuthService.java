package MessageApp.JavaBackend.Services;

import MessageApp.JavaBackend.DTO.LoginDto;
import MessageApp.JavaBackend.DTO.LoginResponseDto;
import MessageApp.JavaBackend.DTO.LoginWithRefreshTokenDto;
import MessageApp.JavaBackend.DTO.RegisterUserDto;
import MessageApp.JavaBackend.Repositories.RefreshTokenRepository;
import MessageApp.JavaBackend.Repositories.RoleRepository;
import MessageApp.JavaBackend.Repositories.UserRepository;
import MessageApp.JavaBackend.entity.RefreshToken;
import MessageApp.JavaBackend.entity.Role;
import MessageApp.JavaBackend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final HelperServices helperServices;
    private final RefreshTokenRepository refreshTokenRepository;

    public ResponseEntity<String> register(RegisterUserDto registerUserDto){
        Role role = roleRepository.findRoleByName("user");

        userRepository.save(new User(registerUserDto.getPassword(),
                registerUserDto.getEmail(),
                registerUserDto.getName(),
                true,
                role.getId(),
                registerUserDto.getAge()));

        return new ResponseEntity<>("sikeres regisztráció", HttpStatus.CREATED);
    }

    public ResponseEntity<LoginResponseDto> login(LoginDto loginDto){
        User user = userRepository.findUserByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword());
        if(user == null){
            return new ResponseEntity<LoginResponseDto>(HttpStatus.UNAUTHORIZED);
        }

        String token = helperServices.generateRandomStrings(20);
        LocalDate date = LocalDate.now().plusDays(30);
            refreshTokenRepository.save(new RefreshToken(token, user.getId(), date, LocalDate.now()));

            return new ResponseEntity<LoginResponseDto>(new LoginResponseDto(user.getId(), token), HttpStatus.OK);
    }

    public ResponseEntity<LoginResponseDto> loginWithRefreshToken(LoginWithRefreshTokenDto loginWithRefreshTokenDto){
        RefreshToken refreshToken = refreshTokenRepository.findRefreshTokenByToken(loginWithRefreshTokenDto.getRefreshToken());
        if(refreshToken == null){
            return new ResponseEntity<LoginResponseDto>(HttpStatus.UNAUTHORIZED);
        }

        if(LocalDate.now().isAfter(refreshToken.getExpiresAt())){
            return new ResponseEntity<LoginResponseDto>(HttpStatus.UNAUTHORIZED);
        }

        String token = helperServices.generateRandomStrings(20);
        LocalDate date = LocalDate.now().plusDays(30);
        refreshTokenRepository.updateRefreshTokenAndExpiresAtById(refreshToken.getId(), token, date);

        return new ResponseEntity<LoginResponseDto>(new LoginResponseDto(refreshToken.getUserId(), token), HttpStatus.OK);
    }
}
