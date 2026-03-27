package MessageApp.JavaBackend.Controllers;

import MessageApp.JavaBackend.DTO.PatchMessageDto;
import MessageApp.JavaBackend.entity.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {

    @GetMapping("/{chatId}/{sectionNumber}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable String chatId, @PathVariable Integer sectionNumber){

    }

    @PostMapping("/")
    public  ResponseEntity<String> createMessage(@RequestBody Message message){

    }

    @PatchMapping("/{messageId}")
    public  ResponseEntity<String> patchMessageAndUpdatedAt(@PathVariable String messageId, @RequestBody PatchMessageDto patchMessageDto){

    }

    @DeleteMapping("/{messageId}")
    public  ResponseEntity<String> deleteMessage(@PathVariable String messageId){

    }
}
