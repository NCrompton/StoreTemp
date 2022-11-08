def accepts(*types):
    def check_accepts(f):
        assert len(types) == f.__code__.co_argcount, \
            "the length %s is not expected %s" % (len(types), f.__code__.co_argcount)
        def new_f(*args, **kwds):
            for (a, t) in zip(args, types):
                assert isinstance(a, t), \
                       "arg %r does not match %s" % (a,t)
            print("OK")
            return f(*args, **kwds)
        new_f.__name__ = f.__name__
        print(f.__name__)
        return new_f
    return check_accepts

def returns(rtype):
    def check_returns(f):
        def new_f(*args, **kwds):
            result = f(*args, **kwds)
            assert isinstance(result, rtype), \
                   "return value %r does not match %s" % (result,rtype)
            return result
        new_f.__name__ = f.__name__
        return new_f
    return check_returns

#@accepts(int, (int,float))
#@returns((int,float))
def func(arg1, arg2):
    return arg1 * arg2

def newfunc(arg1, arg2):
    print("SUCCESS!")
    return arg1 * arg2

accepts(int, (int, float))(newfunc)(3, 5.3)
#func(3, 5)

def deececc(func):
    def secondlayer(*args):
        func(*args)
        print("finished")
        return func
    print(func.__name__)
    return secondlayer
#deececc(voivoi)(*args)
@deececc
def voivoi(str):
    print(f"hello world {str}")

voivoi("guten tag")("Bonjour")

def checkFunc(addon:str):
    def increment(num:int):
        w:str = addon * num
        def printMeta(func):
            print(f"you are running function {'{'}{func.__name__}{'}'}")
            def runFunc(*arg):
                txt = w + func(*arg)
                print(txt)
                return txt
            return runFunc
        return printMeta
    print(addon)
    return increment

@checkFunc("NEW")(12)
def first(word:str) -> str:
    word = word.capitalize()
    print(f"{word} is the key")
    return f"{word} is the key"

first("Whole")

