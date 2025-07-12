from rest_framework.views import APIView
from rest_framework.response import Response
from basicLogicBlocks.Comments import filter_comments, create_comment
from .serializer import CommentSerializer
from rest_framework.permissions import IsAuthenticated

class CommentsView(APIView):
    def get(self, request):
        data=request.query_params.get('data', None)
        all_comments = filter_comments(**data) if data else filter_comments()
        return Response({"data": all_comments}, status=200)
    
    def post(self, request):
        from basicLogicBlocks.Comments import create_vote
        permission_classes = [IsAuthenticated]
        data = request.data
        serializer = CommentSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        comment = create_comment(data)
        create_vote(comment=comment,total_votes=0,your_vote=0)
        return Response({"data": comment}, status=200)

    def delete(self, request):
        permission_classes = [IsAuthenticated]
        comment_id = request.data.get('id')
        if not comment_id:
            return Response({"error": "Comment ID is required"}, status=400)
        
        try:
            filter_comments(id=comment_id).delete()
            return Response({"message": "Comment deleted successfully"}, status=200)
        except ValueError as e:
            return Response({"error": str(e)}, status=404)
    
    def put(self, request):
        permission_classes = [IsAuthenticated]
        comment_id = request.data.get('id')
        if not comment_id:
            return Response({"error": "Comment ID is required"}, status=400)
        
        data = request.data
        try:
            comment = filter_comments(id=comment_id).first()
            if not comment:
                return Response({"error": "Comment not found"}, status=404)
            
            for attr, value in data.items():
                setattr(comment, attr, value)
            comment.save()
            serializer = CommentSerializer(comment)
            return Response({"data": serializer.data}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
class VoteView(APIView):
    def get(self, request):
        from basicLogicBlocks.Comments import filter_votes
        data = request.query_params.get('data', None)
        all_votes = filter_votes(**data) if data else filter_votes()
        return Response({"data": all_votes}, status=200)
    
    def post(self, request):
        from basicLogicBlocks.Comments import create_vote
        permission_classes = [IsAuthenticated]
        data = request.data
        vote = create_vote(**data)
        return Response({"data": vote}, status=200)