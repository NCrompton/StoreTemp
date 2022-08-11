import mssql from 'mssql';

/**const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SITE,
    options: {
        trustServerCertificate: true,
    },
}**/

export async function startsql(){
    const sqlConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        server: process.env.DB_SITE,
        options: {
            trustServerCertificate: true,
        },
    }
    console.log(`the environment variable is ${process.env.DB_SITE}`);
    const sql = await mssql.connect(sqlConfig);
    //const result = await sql.query("select * from Course");
    return new Promise(resolve => {
        resolve(sql);
        console.log("DATA WITHDREW");
    })
}

export async function retrieveData(sql){
    const result = startsql().then(con => con.query(sql));
    return new Promise(resolve =>
        resolve(result)
    )
}

export function buildSqlCondition(query, meta){
    const parameters = meta["col"];
    console.log(query);
    var retrieveCol = query.hasOwnProperty("col")? getColSql(query["col"], meta): " * ";
    var sql = "select " + retrieveCol + " from " + meta["table"]; 
    var conditionList = [];
    if(Object.keys(query).length > 0){
        for(var key in parameters){
            if(query.hasOwnProperty(key)){
                let prefix = "";
                let operation = " = ";
                let data = "";
                if(conditionList.length > 0){prefix += " and "}
                if(parameters[key] != ("str")){
                    data = query[key];
                }else{
                    data = ("\'" + query[key] + "\'");
                }
                conditionList.push(prefix + key + operation + data);
            }    
        }
        if(conditionList.length > 0){
            sql += " where ";
            conditionList.forEach((c) => sql += c);
        }
        
    }
    console.log(sql);
    return sql;
}

export function sortSql(sort, meta){

}

function getColSql(col, meta){
    var selectList = [];
    var select = "";
    console.log(col);
    col.forEach(c => {
        console.log(c);
        if(meta.col.hasOwnProperty(c)){
            selectList.push(c);
        }});
       
    if(selectList.length > 0){
        selectList.forEach(s => select += (", " + s));
        return select.slice(2, select.length);
    }else{
        return " * ";
    }
}

export function buildSqlCreate(query, meta){

}