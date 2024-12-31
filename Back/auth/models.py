from back.database import Base
from sqlalchemy import BigInteger, Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class AuthUser(Base):
    __tablename__ = "auth_users"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique = True)
    password = Column(String)

    def __repr__(self):
        return f"User: {self.username}"