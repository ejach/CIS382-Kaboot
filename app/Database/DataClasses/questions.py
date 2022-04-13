class Questions:
    def __init__(self, questions_id, prompt):
        self.questions_id = questions_id
        self.prompt = prompt

    def get_question_id(self):
        return self.questions_id

    def get_prompt(self):
        return self.prompt
