from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/login")
def login(user: dict):

    if user["username"] == "admin" and user["password"] == "1234":

        return {"token": "abc123"}

    raise HTTPException(status_code=401, detail="Invalid login")