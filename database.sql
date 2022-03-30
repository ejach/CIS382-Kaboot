create table questions
(
    question_id int default 0 not null
        primary key,
    prompt      varchar(255)  null,
    constraint questions_question_id_uindex
        unique (question_id)
);

create table question_answers
(
    question_id int           null,
    answer_id   int default 0 not null
        primary key,
    correct     tinyint(1)    null,
    constraint question_answers_answer_id_uindex
        unique (answer_id),
    constraint question_answers_questions_question_id_fk
        foreign key (question_id) references questions (question_id)
);

create table answers
(
    answer_id     int default 0 not null
        primary key,
    answer_prompt varchar(255)  null,
    constraint answers_answer_id_uindex
        unique (answer_id),
    constraint answers_question_answers_answer_id_fk
        foreign key (answer_id) references question_answers (answer_id)
);

create table room
(
    room_code         int auto_increment
        primary key,
    question_duration int null
);

create table user_room
(
    user_id int auto_increment
        primary key,
    room_id int null,
    constraint user_room_room_room_code_fk
        foreign key (room_id) references room (room_code)
);
