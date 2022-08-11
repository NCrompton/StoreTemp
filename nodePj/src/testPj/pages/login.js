import axios from "axios"

const oauthlogin = function (request, response, next){
    const url = "https://login.microsoftonline.com/common/oauth2/v2.0/";
    const client_id = process.env.CLIENT_ID;
    const redirect_url = 'http://localhost:3000/myapp'
    const param = {
        'client_id': client_id,
        'redirect_uri': redirect_url
    }
    const uri = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=6731de76-14a6-49ae-97bc-6eba6914391e&response_type=code&redirect_uri=http://localhost:3000/myapp/&response_mode=query&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=12345';
    return response.redirect(uri);
}

const oauthtoken = function (request, response) {
    console.log(`The result of the oauth is ${request.query}`);
    console.dir(request.query);
    //console.dir(request.session)
    const param = {
        'tenant': 'common',
        'client_id': process.env.CLIENT_ID,
        'code': request.query.code,
        'redirect_uri': 'localhost:3001/myapp/',
        'grant_type': 'authorization_code',
        'client_secret': 'JqQX2PNo9bpM0uEihUPzyrh'
    }
    const page = axios.get('https://login.microsoftonline.com/organizations/oauth2/v2.0/token', param).then((result => {console.dir(result)})).catch((err) => {console.log(`we have encouter an error${err}`);console.dir(err)});
    return response.send(page);
}

export {
    oauthlogin,
    oauthtoken
}