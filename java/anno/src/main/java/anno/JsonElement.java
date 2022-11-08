package anno;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;

@Retention(RUNTIME)
@Target({ FIELD })
public @interface JsonElement {
    public String key() default "";
}
