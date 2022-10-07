class ScholarPaper:
    def __init__(self, title, scholar_list, pages, publish_status, permanent_link, doi):
        self.scholar_list = scholar_list
        self.title = title
        self.pages = pages
        self.publish_status = publish_status
        self.permanent_link = permanent_link 
        self.doi = doi 
    
    def to_json(self) -> dict[str, any]:
        pass

class ScholarConference(ScholarPaper): 
    def __init__(self, title, scholar_list, pages, publish_status, period, permanent_link, doi) -> None:
        super().__init__(title, scholar_list, pages, publish_status, permanent_link, doi)
        self.period = period

    def to_json(self):
        return {"type": "Conference", "title": self.title, "scholar_list": self.scholar_list, "pages": self.pages, "publish_status": self.publish_status, 
        "period": self.period, "permanent_link": self.permanent_link, "DOI": self.doi }

class ScholarJournal(ScholarPaper): 
    def __init__(self, title, scholar_list, pages, publish_status, online_publish, permanent_link, doi) -> None:
        super().__init__(title, scholar_list, pages, publish_status, permanent_link, doi)
        self.online_publish = online_publish

    def to_json(self):
        return {"type": "Journal", "title": self.title, "scholar_list": self.scholar_list, "pages": self.pages, "publish_status": self.publish_status, 
        "online_publish": self.online_publish, "permanent_link": self.permanent_link, "DOI": self.doi }