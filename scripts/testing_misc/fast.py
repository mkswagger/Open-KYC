from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/image")
async def get_image():
    image_path = "path_to_image"  # Replace with the actual path to your image file
    return FileResponse(image_path, media_type="image/png")