from back.database import Base
from sqlalchemy import BigInteger, Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key = True, index = True)

    user_id = Column(BigInteger, ForeignKey("auth_users.id", ondelete = "CASCADE"))
    user = relationship("AuthUser")

    name = Column(String)

    def serialize(self):
        return {"id": self.id, "name": self.name}


    def __repr__(self):
        return f"Chat {self.user}: {self.id} {self.name}"


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key = True, index = True)

    chat_id = Column(BigInteger, ForeignKey("chats.id", ondelete = "CASCADE"))
    chat = relationship("Chat")

    user_message = Column(String)
    bot_message = Column(String)


    def serialize(self):
        return {"id": self.id, "user_message": self.user_message, "bot_message": self.bot_message}


    def __repr__(self):
        return f"Message: {self.id}"