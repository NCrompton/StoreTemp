from glob import escape
from flask import Flask, render_template, request, make_response
import json
import scrap

app = Flask(__name__)

@app.route("/<paperId>", methods=['POST'])
def hello_world(paperId):
    res = '<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n<soap:Body>\n<SendEngSMSResponse xmlns="http://tempuri.org/">\n<SendEngSMSResult>string</SendEngSMSResult>\n</SendEngSMSResponse>\n</soap:Body>\n</soap:Envelope>'
    print(f"<p>{request.headers}</p><p>{request.get_data(as_text=True)}</p>")
    resp = make_response(res, 200)
    resp.headers['Content-Type'] = 'text/xml; charset=utf-8'
    resp.headers['Content-Length'] = res.__len__
    return resp
    """ if(request.form['user']):
        return f"<p>{request.form['user']}</p><p>{paperId}</p>"
    elif request.args.get('key', ''):
        return f"<p>{request.arg.get('key', '')}</p><p>{paperId}</p>"
    else:
        return f"<p>form doesnt exist in {paperId}</p>" """

@app.route("/<word>", methods=['GET'])
def hello_earth(word):
    return render_template("test.html", paperId=word)

@app.route("/api/<para>", methods=['POST'])
def api_test(para):
    res = json.loads('{"status": 200}')
    if para == 'hello':
        res["hello"] = True
    elif para == 'world':
        res["world"] = True
    else:
        res["None"] = True
    res["code"] = para
    res = scrap.createJsonTemplate([], "")
    return res

@app.route("/api/scholar/v1/<paperId>", methods=['GET'])
def api_scholar(paperId):
    url = f"https://scholars.cityu.edu.hk/en/publications/{paperId}.html"
    output = scrap.get_scholar_list(url)
    resp = make_response(output, output["status"])
    resp.content_type = "application/json"
    return resp