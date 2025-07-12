from questions.models import Question
from django.core.paginator import Paginator

def filter_questions(page=1, page_size=10, **kwargs):
    """
    Filters questions based on provided criteria and paginates the results.
    :param page: Page number to retrieve.
    :param page_size: Number of items per page.
    :param kwargs: Filtering criteria such as 'solved', 'author', 'tags', etc.
    :return: A tuple (page_obj, total_count) where page_obj is the paginated page and total_count is total items.
    """
    filters = {k: v for k, v in kwargs.items() if v is not None}
    queryset = Question.objects.filter(**filters)
    paginator = Paginator(queryset, page_size)
    page_obj = paginator.get_page(page)
    return page_obj, paginator.count

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