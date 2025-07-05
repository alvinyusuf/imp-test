from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from authentication.serializers import RegisterSerializer

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response(
                    {
                        "message": "User registered successfully",
                        "user": {
                            "username": user.username,
                            "email": user.email,
                        }
                    },
                    status=201
                )
            except Exception as e:
                return Response(
                    {
                        "message": "Internal error occurred during registration",
                        "error": str(e)
                    },
                    status=500
                )
            
        return Response(
            {
                "message": "User registration failed",
                "errors": serializer.errors
            },
            status=400
        )
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {
                    "message": "Logout successful"
                },
                status=200
            )
        except Exception as e:
            return Response(
                {
                    "message": "Invalid refresh token"
                },
                status=400
            )