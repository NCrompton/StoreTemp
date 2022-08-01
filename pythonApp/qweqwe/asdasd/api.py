class Api():
    a = {}
    flag = "success"
    
    def __init__(self, dict1):
        self.a["status"] = self.flag
        self.a["data"] = dict1
        print(self.a)

    def generateAPI(self):
        return self.a
