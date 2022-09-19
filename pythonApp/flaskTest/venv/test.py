from glob import escape
from flask import Flask, render_template, request, make_response
import json

app = Flask(__name__)

@app.route("/<name>", methods=['POST'])
def hello_world(name):
    res = '<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n<soap:Body>\n<SendEngSMSResponse xmlns="http://tempuri.org/">\n<SendEngSMSResult>string</SendEngSMSResult>\n</SendEngSMSResponse>\n</soap:Body>\n</soap:Envelope>'
    print(f"<p>{request.headers}</p><p>{request.get_data(as_text=True)}</p>")
    resp = make_response(res, 200)
    resp.headers['Content-Type'] = 'text/xml; charset=utf-8'
    resp.headers['Content-Length'] = res.__len__
    return resp
    """ if(request.form['user']):
        return f"<p>{request.form['user']}</p><p>{name}</p>"
    elif request.args.get('key', ''):
        return f"<p>{request.arg.get('key', '')}</p><p>{name}</p>"
    else:
        return f"<p>form doesnt exist in {name}</p>" """

@app.route("/<word>", methods=['GET'])
def hello_earth(word):
    return render_template("test.html", name=word)

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
    return res