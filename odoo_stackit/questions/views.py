from rest_framework.views import APIView 
from rest_framework.response import Response


class QuestionsView(APIView):
    def get(self,request):
        data=request.params.get('data', None)
        return 