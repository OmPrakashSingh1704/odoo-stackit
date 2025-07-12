from rest_framework.views import APIView 
from basicLogicBlocks.profile import create_user_profile
from .serializer import UserProfileSerializer
from rest_framework.response import Response
from .TokenModel import Token

class signup(APIView):
    def post(self, request):
        userdata = request.data
        serializer = UserProfileSerializer(data=userdata)

        if serializer.is_valid():
            # Create user but keep verified=False
            user = create_user_profile(**serializer.validated_data)
            token,_= Token.objects.get_or_create(user=user)
            return Response({"message": "User registered successfully","token":token.key}, status=201)
        
        return Response(serializer.errors, status=400)