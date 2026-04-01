package MessageApp.JavaBackend.Services;

import org.springframework.stereotype.Service;

@Service
public class HelperServices {

    public String generateRandomStrings(int cnt) {
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        char[] ret = new char[cnt];
        for (int i = 0; i < cnt; i++) {
            ret[i] = chars.charAt((int) (Math.random() * chars.length()));
        }
        return new String(ret);
    }
}
