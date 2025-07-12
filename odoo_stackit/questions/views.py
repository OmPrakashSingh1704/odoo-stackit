from rest_framework.views import APIView 
from rest_framework.response import Response
from basicLogicBlocks.Questions import filter_questions,create_question, delete_question
from .serializer import QuestionSerializer
from rest_framework.permissions import IsAuthenticated


class QuestionsView(APIView):
    def get(self,request):
        data=request.GET.get('data', None)
        all_questions = filter_questions(**data) if data else filter_questions()
        return Response({"data": all_questions}, status=200)

    def post(self, request):
        permission_classes = [IsAuthenticated]
        data = request.data
        serializer = QuestionSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        user=request.user
        create_questions= create_question(**data, author=user)
        return Response({"data": create_questions}, status=200)
    
    def delete(self, request):
        question_id = request.data.get('id')
        permission_classes = [IsAuthenticated]
        if not question_id:
            return Response({"error": "Question ID is required"}, status=400)
        
        try:
            delete_question(id=question_id)
            return Response({"message": "Question deleted successfully"}, status=200)
        except ValueError as e:
            return Response({"error": str(e)}, status=404)
    
    def put(self, request):
        permission_classes = [IsAuthenticated]
        question_id = request.data.get('id')
        if not question_id:
            return Response({"error": "Question ID is required"}, status=400)
        
        data = request.data
        try:
            question = filter_questions(id=question_id).first()
            if not question:
                return Response({"error": "Question not found"}, status=404)
            
            for attr, value in data.items():
                setattr(question, attr, value)
            question.save()
            serializer = QuestionSerializer(question)
            return Response({"data": serializer.data}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)