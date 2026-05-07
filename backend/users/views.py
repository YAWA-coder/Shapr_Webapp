from django.contrib.auth import authenticate, get_user_model
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token

from .serializers import RegisterSerializer

User = get_user_model()


# -------------------------
# REGISTER (PUBLIC)
# -------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # 🔥 important

    def create(self, request, *args, **kwargs):
        # 1. Validate and save the new user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # 2. Generate their token immediately
        token, _ = Token.objects.get_or_create(user=user)

        # 3. Return the exact same dictionary format as your login_view
        return Response({
            "token": token.key,
            "username": user.username
        }, status=status.HTTP_201_CREATED)


# -------------------------
# LOGIN (PUBLIC)
# -------------------------
@api_view(["POST"])
@permission_classes([AllowAny])  # 🔥 important
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"detail": "Username and password required"},
            status=400
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"detail": "Invalid credentials"},
            status=400
        )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "token": token.key,
        "username": user.username
    })


# -------------------------
# PROFILE (PROTECTED)
# -------------------------
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user

    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")

    if first_name is not None:
        user.first_name = first_name

    if last_name is not None:
        user.last_name = last_name

    user.save()

    return Response({
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })