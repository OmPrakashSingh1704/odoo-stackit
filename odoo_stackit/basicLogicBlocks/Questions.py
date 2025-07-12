from questions.models import Question

def filter_questions(**kwargs):
    """
    Filters questions based on provided criteria.
    :param kwargs: Filtering criteria such as 'solved', 'author', 'tags', etc.
    :return: Filtered queryset of questions.
    """
    filters = {k: v for k, v in kwargs.items() if v is not None}
    return Question.objects.filter(**filters)