# coding: utf-8
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Question(Base):
    __tablename__ = 'questions'

    question_id = Column(Integer, primary_key=True, server_default=text("0"))
    prompt = Column(String(255))


class Room(Base):
    __tablename__ = 'room'

    room_code = Column(Integer, primary_key=True, server_default=text("nextval('room_room_code_seq'::regclass)"))
    question_duration = Column(Integer)


class TestQuestion(Base):
    __tablename__ = 'test_question'

    test_id = Column(Integer)
    question_id = Column(Integer, primary_key=True, server_default=text("0"))


class UserRoom(Base):
    __tablename__ = 'user_room'

    user_id = Column(Integer, primary_key=True, server_default=text("nextval('user_room_user_id_seq'::regclass)"))
    room_id = Column(Integer)


class QuestionAnswer(Base):
    __tablename__ = 'question_answers'

    question_id = Column(ForeignKey('questions.question_id'))
    answer_id = Column(Integer, primary_key=True, server_default=text('0'))
    correct = Column(Boolean)

    question = relationship('Question')


class Answer(QuestionAnswer):
    __tablename__ = 'answers'

    answer_id = Column(ForeignKey('question_answers.answer_id'), primary_key=True, server_default=text('0'))
    answer_prompt = Column(String(255))
