from rest_framework.views import APIView 
from basicLogicBlocks.profile import create_user_profile, get_all_usernames, username_trie
from .serializer import UserProfileSerializer
from rest_framework.response import Response
from .TokenModel import Token
from .authenticate import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

class signup(APIView):
    permission_classes = [AllowAny]  # 👈 This is the fix

    def post(self, request):
        userdata = request.data
        serializer = UserProfileSerializer(data=userdata)

        if serializer.is_valid():
            # Create user but keep verified=False
            user = create_user_profile(**serializer.validated_data)
            token,_= Token.objects.get_or_create(user=user)
            return Response({"message": "User registered successfully","token":token.key}, status=201)
        
        return Response(serializer.errors, status=400)

class trie(APIView):
    def get(self, request):
        allusers=get_all_usernames()
        trie=username_trie(allusers)
        return Response(trie)

class Login(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid credentials"}, status=401)

class Logout(APIView):
    def get(self, request):
        
        token = request.auth
        if token:
            Token.objects.filter(key=token).delete()
            return Response({"message": "Logged out successfully"}, status=200)
        return Response({"error": "Invalid token"}, status=400)

class profile(APIView):
    

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            serializer = UserProfileSerializer(user)
            return Response({"data":serializer.data})
        return Response({"error": "User not authenticated"}, status=401)


