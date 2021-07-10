from fastapi import FastAPI, Request
import subprocess
import secrets
import os

app = FastAPI()


@app.post("/")
async def exec_code(request: Request):
    req = await request.json()
    filename = f"/tmp/{secrets.token_urlsafe(9)}.py"
    with open(filename, "w") as pycode:
        pycode.write(req["codes"])
    result = subprocess.check_output(f"python {filename}")
    os.remove(filename)
    return {"result": result}
