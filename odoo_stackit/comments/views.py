from rest_framework.views import APIView
from rest_framework.response import Response
from basicLogicBlocks.Comments import filter_comments

class CommentsView(APIView):
    def get(self, request):
        data=request.query_params.get('data', None)
        all_comments = filter_comments(**data) if data else filter_comments()
        return Response({"data": all_comments}, status=200)