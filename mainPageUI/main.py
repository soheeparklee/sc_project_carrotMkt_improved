from fastapi import FastAPI, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

app= FastAPI()

#sqlite 연결하기
con= sqlite3.connect("db.db", check_same_thread=False)
cur= con.cursor()

items = []

@app.post("/items")
async def create_item(image: UploadFile,
                title: Annotated[str, Form(),],
                price: Annotated[int, Form()],
                description: Annotated[str, Form(),],
                location: Annotated[str, Form(),],
                insertat: Annotated[int, Form()]
                ):
    #이미지는 읽어오는데 시간 많이 걸리니까 
    image_bytes= await image.read()
    #sql lite 문법
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, loacation, insetat)
                VALUES("{title}", "{image_bytes.hex()}", {price}, "{description}", "{location}", {insertat})
                """)
    con.commit()
    print(title, image, price, description, location, insertat)
    return "200"


    app.mount("/", StaticFiles(directory="static", html=True), name="static")