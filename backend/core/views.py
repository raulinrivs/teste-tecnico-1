from core.serializers import PessoaSerializer
from core.models import Pessoa

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response


class PessoaViewSet(viewsets.ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['get'], url_path='peso-ideal', url_name='peso_ideal')
    def peso_ideal(self, request, pk=None):
        pessoa = Pessoa.objects.filter(pk=pk).first()

        if not pessoa:
            return Response({'error': 'Pessoa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        if pessoa.sexo == 'M':
            peso_ideal = (72.7 * float(pessoa.altura)) - 58
        elif pessoa.sexo == 'F':
            peso_ideal = (62.1 * float(pessoa.altura)) - 44.7

        return Response({'peso_ideal': peso_ideal}, status=status.HTTP_200_OK)