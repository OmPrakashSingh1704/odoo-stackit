from questions.models import Question, Tag
from django.core.paginator import Paginator
import uuid
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
    questions_list = list(page_obj.object_list.values())
    return questions_list, paginator.count

def create_question(**kwargs):
    """
    Creates a new question with the provided data.
    :param kwargs: Data for the new question.
    :return: The created question instance.
    """
    tags = kwargs.pop('tags', [])
    uuid_tags=[]
    for tag in tags:
        tag_obj,_= Tag.objects.get_or_create(name=tag,defaults={'id': uuid.uuid4()})
        uuid_tags.append(tag_obj)
    question = Question.objects.create(id=uuid.uuid4(),**kwargs)
    question.tags.set(uuid_tags)
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