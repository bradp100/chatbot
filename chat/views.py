from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MessageSerializer

def index(request):
    return render(request, 'index.html')

@api_view(['POST'])
def api_messages(request):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        message = serializer.validated_data.get('message')
        response_message = f"Echo: {message}"
        return Response({'message': response_message})
    return Response(serializer.errors, status=400)

