from multiprocessing.dummy import Array


def str_test():
    word_c = "THIS IS A TEXT"
    word_s = "this is a text"
    print(word_c.capitalize())
    print(word_s.capitalize())
    print(word_c.casefold())
    print(word_c.count("S"))
    print(word_c.endswith('T'))
    print("----------------------")
    print("word\t_c".expandtabs(30))
    print(word_c.find('TE'))
    print(word_c.index('TE'))
    print("wordc".isalnum())
    print(' '.join(("Ic", "Fc", "Cc", word_c, word_s)))
    print("wordcuivs".maketrans("wci", "mkp", "uis"))
    print(word_s.partition("is"))
    print(word_s.replace("is", "are"))
    print(word_s.rpartition("is"))
    print(word_c.rfind("T"))
    print(word_s.split("is"))
    print("word_s\nword_c\tgo".expandtabs(5).splitlines())
    print(word_c.translate({83: 80}))
    print((word_s.zfill(3)))
    print(word_s.title())

def split_word(*arg) -> Array:
    length = len(arg)
    arr = []
    for word in arg:
        word = translation(word, {"Witaj": "Welcome"})
        arr.append(word.split(" "))
    return len(arr)

def translation(word, dict):
    length = len(dict)
    print(dict)
    for i, h in dict.items():
        word = word.replace(i.lower(), h.lower())
    return word

#str_test()


result = split_word("th is so wierd", "witaj do domu", "auf wiedersehen herr", "bonjour s'il vous plait monsieur")
print(f"result is {result}")