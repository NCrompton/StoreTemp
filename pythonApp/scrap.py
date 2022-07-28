
import requests #
import re #
import sys
import smtplib
import ssl
import configparser
from email.mime.text import MIMEText
from getpass import getpass

CLEANR = re.compile('<li.*?</li>') 
CLEANR2 = re.compile('<.*?>') 
config = configparser.ConfigParser()
config.read('config.env')
mailsetting = config['EMAIL']

def cleanhtml(text, index):
    cleantext = []
    for n in index:
        cleantext.append(re.sub(CLEANR2, '', text[n:]))
    return cleantext

def findli(text):
    return [m.start() for m in re.finditer(CLEANR, text)]

def removeDuplicate(text):
    tmp = ''
    result = []
    for n in reversed(text):
        temp2 = n
        result.append(n.replace(tmp, ''))
        tmp = temp2
    return result 

def findHiddenList(pagesrc):
    index = pagesrc.find("<ul class=\"relations persons common_hidden associates_authors_full_list\">") 
    indexend = pagesrc.find("</ul>", index)
    newtext = pagesrc[index:indexend]
    return newtext

def findExposedList(pagesrc):
    index = pagesrc.find("<ul class=\"relations persons\">") 
    indexend = pagesrc.find("</ul>", index)
    newtext = pagesrc[index:indexend]
    return newtext

def sendemail(server, message):
    sender_email = mailsetting["FROM"]
    receiver_email = mailsetting["TO"]
    msg = MIMEText(message, "html")
    msg['Subject'] = mailsetting["SUBJECT"]
    server.sendmail(sender_email, receiver_email, msg.as_string())

def mailserver(message):
    smtp_server = mailsetting['SERVER']
    port = 587  # For starttls
    sender_email = mailsetting['FROM']
    if mailsetting['PWD'] == "ASK":
        password = getpass(prompt="Please enter the password of email {} : ".format(sender_email))
    else: 
        password = mailsetting['PWD']

    # Create a secure SSL context
    context = ssl.create_default_context()
    try:
        server = smtplib.SMTP(smtp_server,port)
        server.ehlo() # identify itself that it support extension ESMTP?
        server.starttls(context=context) # Secure the connection
        server.ehlo() 
        server.login(sender_email, password)
        sendemail(server, message)
    except Exception as e:
        print(e)
    #finally:
        #server.quit()

def createTemplate(list, url):
    colsetting = "<colgroup><col span=\"{col}\" style=\"width:{per}%\"></colgroup>".format(col = 1, per = 3)
    #colsetting = mailsetting['COLSETTING']
    template = "<table style=\"width=100%\">{}".format(colsetting)
    template += "<tr><td align=center colspan=\"100%\"><strong>{}</strong></td></tr>".format(mailsetting['TITLE'])
    template += "<tr><td colspan=\"100%\"><a href={u}>{u}</td></tr>".format(u = url)
    id = 1 #scholar id
    for row in list:
        template += "<tr>"

        template += "<td>{}</td>".format(str(id))
        template += "<td>{}</td>".format(row)

        template += "</tr>"
        id += 1
    return template + "</table>"
    

def main(url):
    #url = "https://scholars.cityu.edu.hk/en/publications/ultrahard-bccalcocrfeni-bulk-nanocrystalline-highentropy-alloy-formed-by-nanoscale-diffusioninduced-phase-transition(d2a32cb6-6bc9-49fb-9c51-8fc6a3700bc7).html"
    page = requests.get(url)
    pagesrc = page.text

    newtext = findExposedList(pagesrc)
    k = findli(newtext)
    y = cleanhtml(newtext, k)
    newy = removeDuplicate(y)
    for g in newy:
        print("{}\n".format(g))

    if pagesrc.find("relations persons common_hidden associates_authors_full_list", k[0]):
        newy.pop(0)
        hiddentext = findHiddenList(pagesrc)
        k2 = findli(hiddentext)
        y2 = cleanhtml(hiddentext, k2)
        newy2 = removeDuplicate(y2)
        for g in newy2:
            print("{}\n".format(g))
    #msg = "Professor List: {pli} and the url is {link}".format(pli = (newy + newy2), link = url)
    msg = createTemplate(newy+newy2, url)
    print(msg)
    mailserver(msg)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("please input the url you want to scrap as argument")
    else:
        main(sys.argv[1])
    







#print(page.text[index:indexend])

#print(page.text)