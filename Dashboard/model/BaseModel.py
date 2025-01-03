from pydantic import BaseModel
# 2. Class which describes Bank Notes measurements


class Sales(BaseModel):
    periods: int
