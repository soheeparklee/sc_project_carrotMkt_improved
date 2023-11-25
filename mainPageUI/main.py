from fastapi import FastAPI, UploadFile, Form, Response, Depends
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3
#for GET, need to import JSONresponse
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
#login
from fastapi_login import LoginManager
#error
from fastapi_login.exceptions import InvalidCredentialsException

app= FastAPI()

#login manager
SECRET= "carrotMtkImproved"
manager= LoginManager(SECRET, "/login")

#sqlite 연결하기
con= sqlite3.connect("db.db", check_same_thread=False)
cur= con.cursor()

items = []

#POST
@app.post("/items")
async def create_item(image: UploadFile,
                title: Annotated[str, Form()],
                price: Annotated[int, Form()],
                description: Annotated[str, Form()],
                place: Annotated[str, Form()],
                insertAt: Annotated[int, Form()]
                ):
    #이미지는 읽어오는데 시간 많이 걸리니까 
    image_bytes= await image.read()
    #sql lite 문법
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, place, insertAt)
                VALUES("{title}", "{image_bytes.hex()}", {price}, "{description}", "{place}", {insertAt})
                """)
    con.commit()
    print(title, image, price, description, place, insertAt)
    return "200"


#GET
@app.get("/items")
#access token 추가, 인증되어야지만 아래 명령 보내줄거야
async def get_items(user= Depends(manager)):

    #bring column name(각 값들이 무엇을 의미하는지 알기 위해)
    cur=con.cursor()
    rows= cur.execute(f"""
                    SELECT * from items;
                    """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

#GET image
@app.get("/itmes{item_id}")
def get_img(item_id):
    cur=con.cursor();
    image_bytes= cur.execute(f"""
                        SELECT image from items WHERE id= {item_id}
                        """).fetchone()[0]
    return JSONResponse(content= bytes.fromhex(image_bytes))



app.mount("/", StaticFiles(directory="static", html=True), name="static")