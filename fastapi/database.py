from databases import Database

# Environment variables or configurations for your PostgreSQL database
POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "advcompro3"
POSTGRES_HOST = "db"

DATABASE_URL = f'postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'

# Initialize database connection
database = Database(DATABASE_URL)

# Connect to the database
async def connect_db():
    await database.connect()
    print("Database connected")

# Disconnect from the database
async def disconnect_db():
    await database.disconnect()
    print("Database disconnected")


# ===================================
# Image Table Operations
# ===================================

# Insert a new image into the images table
async def insert_image(image_data: bytes, image_name: str):
    query = """
    INSERT INTO images (image_data, image_name)
    VALUES (:image_data, :image_name)
    RETURNING image_id, image_name, uploaded_at
    """
    values = {"image_data": image_data, "image_name": image_name}
    return await database.fetch_one(query=query, values=values)


# ===================================
# Country Table Operations
# ===================================

# Insert a new country into the countries table
async def insert_country(country_code: str, country_name: str, flag_image_id: int):
    query = """
    INSERT INTO countries (country_code, country_name, flag_image_id)
    VALUES (:country_code, :country_name, :flag_image_id)
    RETURNING country_code, country_name
    """
    values = {
        "country_code": country_code,
        "country_name": country_name,
        "flag_image_id": flag_image_id
    }
    return await database.fetch_one(query=query, values=values)


# Update a country in the countries table
async def update_country(country_code: str, country_name: str, flag_image_id: int):
    query = """
    UPDATE countries
    SET country_name = :country_name, flag_image_id = :flag_image_id
    WHERE country_code = :country_code
    RETURNING country_code, country_name
    """
    values = {
        "country_code": country_code,
        "country_name": country_name,
        "flag_image_id": flag_image_id
    }
    return await database.fetch_one(query=query, values=values)


# Delete a country from the countries table
async def delete_country(country_code: str):
    query = "DELETE FROM countries WHERE country_code = :country_code RETURNING *"
    return await database.fetch_one(query=query, values={"country_code": country_code})


# Fetch all countries along with their flag images
async def get_countries():
    query = """
    SELECT c.country_code, c.country_name, i.image_name, i.image_data
    FROM countries c
    LEFT JOIN images i ON c.flag_image_id = i.image_id
    ORDER BY c.country_name
    """
    return await database.fetch_all(query=query)


# ===================================
# User Table Operations
# ===================================

# Insert a new user into the users table, including age, country, and profile image
async def insert_user(username: str, password_hash: str, email: str, age: int, country_code: str, profile_image_id: int):
    query = """
    INSERT INTO users (username, password_hash, email, age, country_code, profile_image_id)
    VALUES (:username, :password_hash, :email, :age, :country_code, :profile_image_id)
    RETURNING user_id, username, password_hash, email, age, country_code, profile_image_id, created_at
    """
    values = {
        "username": username,
        "password_hash": password_hash,
        "email": email,
        "age": age,
        "country_code": country_code,
        "profile_image_id": profile_image_id
    }
    return await database.fetch_one(query=query, values=values)


# Update an existing user
async def update_user(user_id: int, username: str, password_hash: str, email: str, age: int, country_code: str, profile_image_id: int):
    query = """
    UPDATE users
    SET username = :username, password_hash = :password_hash, email = :email, age = :age, country_code = :country_code, profile_image_id = :profile_image_id
    WHERE user_id = :user_id
    RETURNING user_id, username, password_hash, email, created_at
    """
    values = {
        "user_id": user_id,
        "username": username,
        "password_hash": password_hash,
        "email": email,
        "age": age,
        "country_code": country_code,
        "profile_image_id": profile_image_id
    }
    return await database.fetch_one(query=query, values=values)


# Select a user by username
async def get_user(username: str):
    query = "SELECT * FROM users WHERE username = :username"
    return await database.fetch_one(query=query, values={"username": username})


# Select a user by email and password hash
async def get_user_by_email(email: str, password_hash: str):
    query = "SELECT * FROM users WHERE email = :email AND password_hash = :password_hash"
    return await database.fetch_one(query=query, values={"email": email, "password_hash": password_hash})


# Delete a user from the users table
async def delete_user(user_id: int):
    query = "DELETE FROM users WHERE user_id = :user_id RETURNING *"
    return await database.fetch_one(query=query, values={"user_id": user_id})
