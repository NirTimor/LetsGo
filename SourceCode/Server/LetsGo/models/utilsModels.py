class PagingParams:
    def __init__(self, skip: int = 0, limit: int = 25, asc: bool = False):
        self.skip = skip
        self.limit = limit
        self.asc = asc

