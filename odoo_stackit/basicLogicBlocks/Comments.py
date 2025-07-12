from comments.models import Comments, Votes

def filter_comments(**kwargs):
    from questions.models import Question

    """
    Filters comments based on provided criteria.
    :param kwargs: Filtering criteria such as 'author', 'previous_comment', etc.
    :return: Filtered queryset of comments.
    """
    filters = {k: v for k, v in kwargs.items() if v is not None}
    all_questions=Question.objects.filter(**filters)
    all_comments=[]
    for question in all_questions:
        if not question.initial_comments:
            continue
        # Get initial comments for the question
        all_comments_for_question = Comments.objects.filter(id__in=question.initial_comments.all()).order_by('created_at')
        # Collect all related comments recursively and store in a structured dict
        comment_dict = {}
        queue = list(all_comments_for_question)
        for comment in all_comments_for_question:
            comment_dict[comment.id] = {
            'comment': comment,
            'children': []
            }
        while queue:
            parent_comment = queue.pop(0)
            child_comments = Comments.objects.filter(parent_comment=parent_comment)
            for child in child_comments:
                if child.id not in comment_dict:
                    comment_dict[child.id] = {
                        'comment': child,
                        'children': []
                    }
                comment_dict[parent_comment.id]['children'].append(comment_dict[child.id])
                queue.append(child)
        all_comments.append({
            'question': question,
            'comments': [comment_dict[c.id] for c in all_comments_for_question]
        })
    return all_comments


def create_comment(**kwargs):
    """
    Creates a new comment with the provided data.
    :param kwargs: Data for the new comment.
    :return: The created comment instance.
    """
    comment = Comments.objects.create(**kwargs)
    return 

def filter_votes(**kwargs):
    """
    Filters votes based on provided criteria.
    :param kwargs: Filtering criteria such as 'comment_id'.
    :return: Filtered queryset of votes.
    """
    filters = {k: v for k, v in kwargs.items() if v is not None}
    return Votes.objects.filter(**filters)

def create_vote(**kwargs):
    """
    Creates a new vote with the provided data.
    :param kwargs: Data for the new vote.
    :return: The created vote instance.
    """
    vote = Votes.objects.create(**kwargs)
    return vote