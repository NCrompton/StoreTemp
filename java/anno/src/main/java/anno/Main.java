package anno;

public class Main {

    public static void main(String[] args) {
        Anno anno = new Anno();
        ObjectToJsonConverter converter = new ObjectToJsonConverter();
        try {
            converter.convertToJson(anno);
        } catch (Error e) {
            System.out.println(e);
        }
    }

}
