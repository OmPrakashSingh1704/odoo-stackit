from questions.models import Question

def filter_questions(**kwargs):
    """
    Filters questions based on provided criteria.
    :param kwargs: Filtering criteria such as 'solved', 'author', 'tags', etc.
    :return: Filtered queryset of questions.
    """
    filters = {k: v for k, v in kwargs.items() if v is not None}
    return Question.objects.filter(**filters)

def create_question(**kwargs):
    """
    Creates a new question with the provided data.
    :param kwargs: Data for the new question.
    :return: The created question instance.
    """
    question = Question.objects.create(**kwargs)
    return question

def delete_question(**kwargs):
    """
    Deletes a question based on provided criteria.
    :param kwargs: Criteria to identify the question to delete.
    :return: None
    """
    filters = {k: v for k, v in kwargs.items() if v is not None}
    try:
        question = Question.objects.get(**filters)
        question.delete()
    except Question.DoesNotExist:
        raise ValueError("Question not found")