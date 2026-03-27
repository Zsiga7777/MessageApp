package MessageApp.JavaBackend.Controllers;
import MessageApp.JavaBackend.DTO.ChangePasswordDto;
import MessageApp.JavaBackend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @GetMapping("/{email}")
    public  ResponseEntity<User> getUserByEmail(@PathVariable String email)
    {

    }

    @GetMapping("/{id}")
    public  ResponseEntity<User> getUserById(@PathVariable String id)
    {

    }

    //csak adminnak
    @GetMapping("/")
    public  ResponseEntity<List<User>> getAllUser()
    {

    }

    @PatchMapping("/{userId}")
    public  ResponseEntity<String> patchEmail(@PathVariable String userId, @RequestBody String email){

    }

    @PatchMapping("/{userId}")
    public  ResponseEntity<String> patchAge(@PathVariable String userId, @RequestBody Integer age){

    }

    @PatchMapping("/{userId}")
    public  ResponseEntity<String> patchName(@PathVariable String userId, @RequestBody String name){

    }

    @PatchMapping("/{userId}")
    public  ResponseEntity<String> patchPassword(@PathVariable String userId, @RequestBody ChangePasswordDto changePasswordDto){

    }

    @DeleteMapping("/{userId}")
    public  ResponseEntity<String> deleteUser(@PathVariable String userId){

    }
}
