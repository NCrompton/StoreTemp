package anno;

@JsonSerializable
public class Anno {
    @JsonElement
    private String name;

    @JsonElement(key = "age")
    private int age;

    @Init
    private void initName() {
        this.name = this.name.substring(0, 1).toUpperCase() + this.name.substring(1);
    }

    public String getName() {
        return this.name;
    }

    public int getAge() {
        return this.age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
