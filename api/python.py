from fastapi import FastAPI, Request
import subprocess
import secrets

app = FastAPI()


@app.post("/")
async def exec_code(request: Request):
    req = await request.json()
    filename = f"{secrets.token_urlsafe(9)}.py"
    with open(filename, "w") as pycode:
        pycode.write(req["codes"])
    result = subprocess.check_output(f"python {filename}")
    return {"result": result}
