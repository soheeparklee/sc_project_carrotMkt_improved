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

# 배포했을 떄도 dbeaver에 의존하는 것이 아니라 바로 이 파일에서 테이블 만들 수 있도록 sql문 삽입
#배포할 떄마다 테이블이 생성된다면 테이블이 중복되므로, 테이블이 없을 떄만 만들어지도록 조건문 삽입 IF NOT EXIST
# cur.execute(f"""
#             CREATE TABLE IF NOT EXIST items (
# 	            id INTEGER PRIMARY KEY,
# 	            title TEXT NOT NULL,
# 	            image BLOB,
# 	            price INTEGER NOT NULL,
# 	            description TEXT NOT NULL,
# 	            place TEXT NOT NULL,
# 	            insertAt INTEGER NOT NULL
#             )
#             """)


items = []

#POST item
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


#GET item
@app.get("/items")
#access token 추가, 인증되어야지만 아래 명령 보내줄거야
async def get_items():

    #bring column name(각 값들이 무엇을 의미하는지 알기 위해)
    con.row_factory= sqlite3.Row
    cur=con.cursor();
    rows= cur.execute(f"""
                    SELECT * from items;
                    """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

#GET image
@app.get("/images/{item_id}")
async def get_img(item_id):
    cur=con.cursor();
    image_bytes= cur.execute(f"""
                            SELECT image from items WHERE id= {item_id}
                            """).fetchone()[0]
    return Response(content= bytes.fromhex(image_bytes), media_type="image/*")

### SIGNUP ###
# POST user (SignUp)
@app.post("/signup")
def signup(id: Annotated[str, Form()],
           password: Annotated[str, Form()],
           name: Annotated[str, Form()],
           email: Annotated[str, Form()]
           ):
    cur.execute(f"""
                INSERT INTO users(id, password, name, email)
                VALUES("{id}", "{password}", "{name}", "{email}")
                """)
    con.commit()
    print(id, password)
    return "200"

### LOGIN ###
# 같은 ID, pawword를 가진 사용자가 DB에 있는지 확인하는 함수
@manager.user_loader()
def query_user(id):
        user= (f"""
            Select * from users WHERE id= "{id}"
            """).fetchone()
        return user

# POST user (Login)
@app.post("/login")
def login(id: Annotated[str, Form()],
          password: Annotated[str, Form()]
          ):
     user= query_user(id)
     print(user)
     return "200"





app.mount("/", StaticFiles(directory="static", html=True), name="static")