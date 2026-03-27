package MessageApp.JavaBackend.Controllers;

import MessageApp.JavaBackend.entity.Chat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @GetMapping("/{userId}")
    public ResponseEntity<Chat> getChetByUserId(@PathVariable String userId){

    }

    @PostMapping("/")
    public ResponseEntity<String> createChat(@RequestBody Chat chat){

    }

    @PatchMapping("/{chatId}")
    public  ResponseEntity<String> patchChatNameChat(@PathVariable String chatId, @RequestBody String name){

    }

    @PatchMapping("/{chatId}")
    public  ResponseEntity<String> patchChatMembersChat(@PathVariable String chatId, @RequestBody List<String> userIds){

    }

    @PatchMapping("/{chatId}")
    public  ResponseEntity<String> patchLastUpdatedAtChat(@PathVariable String chatId, @RequestBody Date lastUpdatedAt){

    }

    @DeleteMapping("/{chatId}")
    public  ResponseEntity<String> deleteChat(@PathVariable String chatId){

    }
}
