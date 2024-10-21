from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class UserSignup(BaseModel):
    username: str
    password: str
    email: str
    age: int
    country_code: str

@app.post("/api/signup")
async def signup(user: UserSignup):
    # Check if country exists in the database
    country = await database.fetch_one("SELECT * FROM countries WHERE country_code = :country_code", {"country_code": user.country_code})
    if not country:
        raise HTTPException(status_code=400, detail="Invalid country code")

    # Hash password (you should use a real password hashing function)
    password_hash = hash_password(user.password)

    # Insert user into the users table
    query = """
    INSERT INTO users (username, password_hash, email, age, country_code)
    VALUES (:username, :password_hash, :email, :age, :country_code)
    RETURNING user_id, username, email, age, country_code
    """
    values = {
        "username": user.username,
        "password_hash": password_hash,
        "email": user.email,
        "age": user.age,
        "country_code": user.country_code,
    }
    new_user = await database.fetch_one(query=query, values=values)

    return {"message": "User registered successfully", "user": new_user}

def hash_password(password: str) -> str:
    # Implement real password hashing here (e.g., bcrypt)
    return password
