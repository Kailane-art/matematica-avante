// =====================================================
// MATEMÁTICA AVANTE
// SISTEMA DE NÍVEIS E FASES
// =====================================================


// =====================================================
// CONFIGURAÇÃO GERAL
// =====================================================

const TOTAL_FASES = 10;
const TOTAL_QUESTOES = 10;

const CHAVE_PROGRESSO = "progressoNiveis";


// =====================================================
// CONFIGURAÇÃO DAS FASES — NÍVEL 2
// =====================================================
//
// Fases 1 a 5:
// Questões de dificuldade média.
//
// Fases 6 a 10:
// Questões de dificuldade difícil.
// =====================================================

const fasesNivel2 = {
    1: { nome: "Frações e números racionais", descricao: "Operações com frações, decimais e números racionais.", dificuldade: "Médio" },
    2: { nome: "Razão, proporção e porcentagem", descricao: "Problemas de proporcionalidade e variação percentual.", dificuldade: "Médio" },
    3: { nome: "Equações do 1º grau", descricao: "Equações com incógnitas e propriedades algébricas.", dificuldade: "Médio" },
    4: { nome: "Geometria plana", descricao: "Áreas, perímetros e propriedades de figuras planas.", dificuldade: "Médio" },
    5: { nome: "Funções e estatística", descricao: "Funções, médias e interpretação de dados.", dificuldade: "Médio" },
    6: { nome: "Sistemas e equações quadráticas", descricao: "Sistemas lineares e equações do 2º grau.", dificuldade: "Difícil" },
    7: { nome: "Geometria espacial e Pitágoras", descricao: "Volumes, áreas e relações métricas.", dificuldade: "Difícil" },
    8: { nome: "Potenciação e radiciação", descricao: "Propriedades de potências, raízes e notação científica.", dificuldade: "Difícil" },
    9: { nome: "Probabilidade e estatística", descricao: "Análise de dados e situações probabilísticas.", dificuldade: "Difícil" },
    10: { nome: "Desafio integrado", descricao: "Questões avançadas reunindo diferentes conteúdos.", dificuldade: "Difícil" }
};


// =====================================================
// BANCO DE QUESTÕES — NÍVEL 2
// =====================================================
//
// Cada fase terá exatamente 10 questões.
//
// Estrutura:
//
// {
//     pergunta: "Quanto é 2 + 3?",
//
//     alternativas: [
//         { texto: "4" },
//         { texto: "5" },
//         { texto: "6" },
//         { texto: "7" }
//     ],
//
//     explicacao: "Somamos 2 + 3 e obtemos 5."
// }
//
// As alternativas serão embaralhadas
// automaticamente pelo sistema.
// =====================================================

const questoesNivel2 = {
    "1": [
        {
            "pergunta": "Quanto é 3/4 + 2/3?",
            "alternativas": [
                {
                    "texto": "17/12"
                },
                {
                    "texto": "5/7"
                },
                {
                    "texto": "13/12"
                },
                {
                    "texto": "7/12"
                }
            ],
            "explicacao": "Usamos o MMC de 4 e 3, que é 12: 9/12 + 8/12 = 17/12."
        },
        {
            "pergunta": "Quanto é 5/6 - 1/4?",
            "alternativas": [
                {
                    "texto": "4/10"
                },
                {
                    "texto": "1/2"
                },
                {
                    "texto": "3/12"
                },
                {
                    "texto": "7/12"
                }
            ],
            "explicacao": "O MMC é 12: 10/12 - 3/12 = 7/12."
        },
        {
            "pergunta": "Qual é o resultado de 2/3 × 9/10?",
            "alternativas": [
                {
                    "texto": "2/5"
                },
                {
                    "texto": "6/10"
                },
                {
                    "texto": "3/5"
                },
                {
                    "texto": "18/13"
                }
            ],
            "explicacao": "Multiplicamos numeradores e denominadores: 18/30. Simplificando por 6, obtemos 3/5."
        },
        {
            "pergunta": "Calcule 7/8 ÷ 14/3.",
            "alternativas": [
                {
                    "texto": "7/12"
                },
                {
                    "texto": "3/16"
                },
                {
                    "texto": "49/24"
                },
                {
                    "texto": "1/4"
                }
            ],
            "explicacao": "Dividir por uma fração é multiplicar pelo inverso: 7/8 × 3/14 = 21/112 = 3/16."
        },
        {
            "pergunta": "Qual fração representa o número decimal 0,375?",
            "alternativas": [
                {
                    "texto": "3/8"
                },
                {
                    "texto": "3/5"
                },
                {
                    "texto": "375/100"
                },
                {
                    "texto": "5/8"
                }
            ],
            "explicacao": "0,375 = 375/1000. Simplificando numerador e denominador por 125, obtemos 3/8."
        },
        {
            "pergunta": "Resolva: 1/2 + 3/4 × 2.",
            "alternativas": [
                {
                    "texto": "5/2"
                },
                {
                    "texto": "7/4"
                },
                {
                    "texto": "3/2"
                },
                {
                    "texto": "2"
                }
            ],
            "explicacao": "Primeiro fazemos a multiplicação: 3/4 × 2 = 3/2. Depois somamos 1/2 + 3/2 = 2."
        },
        {
            "pergunta": "Qual é o resultado de 2 1/3 + 1 5/6?",
            "alternativas": [
                {
                    "texto": "4 1/3"
                },
                {
                    "texto": "3 5/6"
                },
                {
                    "texto": "4 1/6"
                },
                {
                    "texto": "3 1/2"
                }
            ],
            "explicacao": "Transformando em sextos: 14/6 + 11/6 = 25/6, ou 4 1/6."
        },
        {
            "pergunta": "Quanto é 4/5 de 250?",
            "alternativas": [
                {
                    "texto": "225"
                },
                {
                    "texto": "200"
                },
                {
                    "texto": "180"
                },
                {
                    "texto": "210"
                }
            ],
            "explicacao": "Calculamos 250 ÷ 5 = 50 e depois 50 × 4 = 200."
        },
        {
            "pergunta": "Qual é o maior número?",
            "alternativas": [
                {
                    "texto": "7/9"
                },
                {
                    "texto": "5/6"
                },
                {
                    "texto": "3/4"
                },
                {
                    "texto": "4/5"
                }
            ],
            "explicacao": "Comparando em decimal: 7/9 ≈ 0,778; 5/6 ≈ 0,833; 3/4 = 0,75; 4/5 = 0,8. O maior é 5/6."
        },
        {
            "pergunta": "Quanto é 1,2 ÷ 0,3?",
            "alternativas": [
                {
                    "texto": "0,4"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "40"
                },
                {
                    "texto": "4"
                }
            ],
            "explicacao": "Multiplicando os dois números por 10, temos 12 ÷ 3 = 4."
        }
    ],
    "2": [
        {
            "pergunta": "Quanto é 15% de 240?",
            "alternativas": [
                {
                    "texto": "48"
                },
                {
                    "texto": "36"
                },
                {
                    "texto": "24"
                },
                {
                    "texto": "40"
                }
            ],
            "explicacao": "15% = 0,15. Então 0,15 × 240 = 36."
        },
        {
            "pergunta": "Um produto custa R$ 180 e recebe desconto de 20%. Qual é o preço final?",
            "alternativas": [
                {
                    "texto": "R$ 144"
                },
                {
                    "texto": "R$ 160"
                },
                {
                    "texto": "R$ 150"
                },
                {
                    "texto": "R$ 140"
                }
            ],
            "explicacao": "O desconto é 20% de 180 = 36. O preço final é 180 - 36 = R$ 144."
        },
        {
            "pergunta": "Um valor de 80 aumenta 25%. Qual é o novo valor?",
            "alternativas": [
                {
                    "texto": "95"
                },
                {
                    "texto": "105"
                },
                {
                    "texto": "120"
                },
                {
                    "texto": "100"
                }
            ],
            "explicacao": "25% de 80 é 20. Somando o aumento: 80 + 20 = 100."
        },
        {
            "pergunta": "Uma quantidade está na razão 3:5 e o total é 64. Qual é a menor parte?",
            "alternativas": [
                {
                    "texto": "40"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "24"
                },
                {
                    "texto": "32"
                }
            ],
            "explicacao": "A soma das partes da razão é 8. Cada parte vale 64 ÷ 8 = 8; a menor é 3 × 8 = 24."
        },
        {
            "pergunta": "Quatro trabalhadores concluem um serviço em 6 dias. No mesmo ritmo, quanto tempo 8 trabalhadores levariam?",
            "alternativas": [
                {
                    "texto": "12 dias"
                },
                {
                    "texto": "3 dias"
                },
                {
                    "texto": "4 dias"
                },
                {
                    "texto": "6 dias"
                }
            ],
            "explicacao": "O trabalho total é 4 × 6 = 24 trabalhador-dias. Com 8 trabalhadores: 24 ÷ 8 = 3 dias."
        },
        {
            "pergunta": "Em um mapa de escala 1:50.000, uma distância mede 3 cm. Qual é a distância real?",
            "alternativas": [
                {
                    "texto": "1,5 km"
                },
                {
                    "texto": "150 m"
                },
                {
                    "texto": "15 km"
                },
                {
                    "texto": "500 m"
                }
            ],
            "explicacao": "Cada centímetro representa 50.000 cm. Então 3 cm representam 150.000 cm = 1.500 m = 1,5 km."
        },
        {
            "pergunta": "30% de um número é igual a 54. Qual é esse número?",
            "alternativas": [
                {
                    "texto": "162"
                },
                {
                    "texto": "150"
                },
                {
                    "texto": "200"
                },
                {
                    "texto": "180"
                }
            ],
            "explicacao": "Se 0,30 × x = 54, então x = 54 ÷ 0,30 = 180."
        },
        {
            "pergunta": "Um produto de R$ 200 recebe descontos sucessivos de 10% e 20%. Qual é o preço final?",
            "alternativas": [
                {
                    "texto": "R$ 150"
                },
                {
                    "texto": "R$ 160"
                },
                {
                    "texto": "R$ 144"
                },
                {
                    "texto": "R$ 140"
                }
            ],
            "explicacao": "Após 10% de desconto: 200 × 0,9 = 180. Depois: 180 × 0,8 = R$ 144."
        },
        {
            "pergunta": "12 representa quantos por cento de 80?",
            "alternativas": [
                {
                    "texto": "20%"
                },
                {
                    "texto": "15%"
                },
                {
                    "texto": "12%"
                },
                {
                    "texto": "18%"
                }
            ],
            "explicacao": "Calculamos 12 ÷ 80 × 100 = 15%."
        },
        {
            "pergunta": "Duas quantidades estão na razão 2:3 e a diferença entre elas é 15. Qual é a maior?",
            "alternativas": [
                {
                    "texto": "45"
                },
                {
                    "texto": "30"
                },
                {
                    "texto": "35"
                },
                {
                    "texto": "50"
                }
            ],
            "explicacao": "A diferença corresponde a 1 parte, que vale 15. A maior quantidade tem 3 partes: 3 × 15 = 45."
        }
    ],
    "3": [
        {
            "pergunta": "Resolva a equação 3x - 7 = 20.",
            "alternativas": [
                {
                    "texto": "11"
                },
                {
                    "texto": "13"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "Somando 7 aos dois lados: 3x = 27. Dividindo por 3: x = 9."
        },
        {
            "pergunta": "Resolva 5(x - 2) = 3x + 8.",
            "alternativas": [
                {
                    "texto": "8"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "7"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "Distribuindo: 5x - 10 = 3x + 8. Então 2x = 18 e x = 9."
        },
        {
            "pergunta": "Se x/3 + 5 = 11, qual é o valor de x?",
            "alternativas": [
                {
                    "texto": "18"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "12"
                },
                {
                    "texto": "21"
                }
            ],
            "explicacao": "Subtraindo 5: x/3 = 6. Multiplicando por 3: x = 18."
        },
        {
            "pergunta": "Qual valor de x satisfaz 2x + 3 = 17?",
            "alternativas": [
                {
                    "texto": "8"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "6"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "Subtraindo 3, temos 2x = 14. Portanto, x = 7."
        },
        {
            "pergunta": "Resolva 4(2x + 1) = 3x + 24.",
            "alternativas": [
                {
                    "texto": "3"
                },
                {
                    "texto": "6"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "8x + 4 = 3x + 24. Logo, 5x = 20 e x = 4."
        },
        {
            "pergunta": "Resolva 7 - 2x = -9.",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "-8"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "Subtraindo 7: -2x = -16. Dividindo por -2: x = 8."
        },
        {
            "pergunta": "Se (x - 4)/5 = 3, quanto vale x?",
            "alternativas": [
                {
                    "texto": "19"
                },
                {
                    "texto": "15"
                },
                {
                    "texto": "11"
                },
                {
                    "texto": "20"
                }
            ],
            "explicacao": "Multiplicando por 5: x - 4 = 15. Portanto, x = 19."
        },
        {
            "pergunta": "Resolva 3x/4 = 18.",
            "alternativas": [
                {
                    "texto": "21"
                },
                {
                    "texto": "27"
                },
                {
                    "texto": "36"
                },
                {
                    "texto": "24"
                }
            ],
            "explicacao": "Multiplicando os dois lados por 4: 3x = 72. Assim, x = 24."
        },
        {
            "pergunta": "Resolva 2(x + 3) - 5 = 17.",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "Distribuindo e reduzindo: 2x + 6 - 5 = 17, então 2x = 16 e x = 8."
        },
        {
            "pergunta": "Qual é a solução de 6x - 2(2x + 1) = 14?",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "6"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "6x - 4x - 2 = 14. Então 2x = 16 e x = 8."
        }
    ],
    "4": [
        {
            "pergunta": "Um retângulo mede 12 cm por 7 cm. Qual é seu perímetro?",
            "alternativas": [
                {
                    "texto": "84 cm"
                },
                {
                    "texto": "19 cm"
                },
                {
                    "texto": "42 cm"
                },
                {
                    "texto": "38 cm"
                }
            ],
            "explicacao": "O perímetro é 2 × (12 + 7) = 38 cm."
        },
        {
            "pergunta": "Um triângulo tem base de 14 cm e altura de 9 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "46 cm²"
                },
                {
                    "texto": "56 cm²"
                },
                {
                    "texto": "63 cm²"
                },
                {
                    "texto": "126 cm²"
                }
            ],
            "explicacao": "Área do triângulo = base × altura ÷ 2 = 14 × 9 ÷ 2 = 63 cm²."
        },
        {
            "pergunta": "A diagonal de um quadrado mede 10 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "20 cm²"
                },
                {
                    "texto": "50 cm²"
                },
                {
                    "texto": "100 cm²"
                },
                {
                    "texto": "25 cm²"
                }
            ],
            "explicacao": "A área pode ser calculada por diagonal² ÷ 2: 10² ÷ 2 = 50 cm²."
        },
        {
            "pergunta": "Qual é a área de um círculo de raio 3 cm? Use π = 3,14.",
            "alternativas": [
                {
                    "texto": "28,26 cm²"
                },
                {
                    "texto": "18,84 cm²"
                },
                {
                    "texto": "9,42 cm²"
                },
                {
                    "texto": "56,52 cm²"
                }
            ],
            "explicacao": "A = πr² = 3,14 × 3² = 28,26 cm²."
        },
        {
            "pergunta": "Um trapézio tem bases de 8 cm e 14 cm e altura de 5 cm. Qual é a área?",
            "alternativas": [
                {
                    "texto": "110 cm²"
                },
                {
                    "texto": "44 cm²"
                },
                {
                    "texto": "70 cm²"
                },
                {
                    "texto": "55 cm²"
                }
            ],
            "explicacao": "A = (B + b) × h ÷ 2 = (14 + 8) × 5 ÷ 2 = 55 cm²."
        },
        {
            "pergunta": "Um paralelogramo tem base 12 cm e altura 7 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "96 cm²"
                },
                {
                    "texto": "42 cm²"
                },
                {
                    "texto": "84 cm²"
                },
                {
                    "texto": "38 cm²"
                }
            ],
            "explicacao": "A área do paralelogramo é base × altura: 12 × 7 = 84 cm²."
        },
        {
            "pergunta": "Um losango possui diagonais de 10 cm e 16 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "64 cm²"
                },
                {
                    "texto": "80 cm²"
                },
                {
                    "texto": "160 cm²"
                },
                {
                    "texto": "52 cm²"
                }
            ],
            "explicacao": "A = diagonal maior × diagonal menor ÷ 2 = 16 × 10 ÷ 2 = 80 cm²."
        },
        {
            "pergunta": "Dois ângulos de um triângulo medem 48° e 67°. Quanto mede o terceiro?",
            "alternativas": [
                {
                    "texto": "65°"
                },
                {
                    "texto": "75°"
                },
                {
                    "texto": "55°"
                },
                {
                    "texto": "85°"
                }
            ],
            "explicacao": "A soma dos ângulos internos é 180°. Então 180° - 48° - 67° = 65°."
        },
        {
            "pergunta": "Um retângulo tem área de 96 cm² e largura de 8 cm. Qual é seu perímetro?",
            "alternativas": [
                {
                    "texto": "24 cm"
                },
                {
                    "texto": "48 cm"
                },
                {
                    "texto": "32 cm"
                },
                {
                    "texto": "40 cm"
                }
            ],
            "explicacao": "O comprimento é 96 ÷ 8 = 12 cm. O perímetro é 2 × (12 + 8) = 40 cm."
        },
        {
            "pergunta": "Qual é o perímetro de um hexágono regular de lado 4 cm?",
            "alternativas": [
                {
                    "texto": "16 cm"
                },
                {
                    "texto": "28 cm"
                },
                {
                    "texto": "24 cm"
                },
                {
                    "texto": "20 cm"
                }
            ],
            "explicacao": "Um hexágono regular possui 6 lados iguais: 6 × 4 = 24 cm."
        }
    ],
    "5": [
        {
            "pergunta": "Se f(x) = 2x - 3, quanto vale f(5)?",
            "alternativas": [
                {
                    "texto": "7"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "13"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "Substituindo x por 5: f(5) = 2 × 5 - 3 = 7."
        },
        {
            "pergunta": "Se f(x) = x² - 4, quanto vale f(-3)?",
            "alternativas": [
                {
                    "texto": "-13"
                },
                {
                    "texto": "13"
                },
                {
                    "texto": "1"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "f(-3) = (-3)² - 4 = 9 - 4 = 5."
        },
        {
            "pergunta": "Uma função afim passa pelos pontos (2, 5) e (4, 9). Qual é seu coeficiente angular?",
            "alternativas": [
                {
                    "texto": "3"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "1"
                }
            ],
            "explicacao": "O coeficiente angular é (9 - 5) ÷ (4 - 2) = 4 ÷ 2 = 2."
        },
        {
            "pergunta": "Qual é a média aritmética dos números 6, 8, 10 e 12?",
            "alternativas": [
                {
                    "texto": "11"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "10"
                }
            ],
            "explicacao": "Somamos os valores: 36. Dividindo por 4, obtemos média 9."
        },
        {
            "pergunta": "Qual é a mediana do conjunto 3, 5, 8, 10, 14?",
            "alternativas": [
                {
                    "texto": "8"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "Os dados já estão ordenados. Como há cinco valores, a mediana é o termo central: 8."
        },
        {
            "pergunta": "Qual é a moda do conjunto 2, 3, 3, 4, 5?",
            "alternativas": [
                {
                    "texto": "2"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "3"
                }
            ],
            "explicacao": "A moda é o valor que mais se repete. O número 3 aparece duas vezes."
        },
        {
            "pergunta": "Qual é a amplitude dos valores 4, 9, 12 e 17?",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "21"
                },
                {
                    "texto": "13"
                },
                {
                    "texto": "12"
                }
            ],
            "explicacao": "Amplitude = maior valor - menor valor = 17 - 4 = 13."
        },
        {
            "pergunta": "Ao lançar um dado comum, qual é a probabilidade de sair um número par?",
            "alternativas": [
                {
                    "texto": "1/6"
                },
                {
                    "texto": "1/2"
                },
                {
                    "texto": "1/3"
                },
                {
                    "texto": "2/3"
                }
            ],
            "explicacao": "Os resultados pares são 2, 4 e 6: três resultados em seis possíveis. A probabilidade é 3/6 = 1/2."
        },
        {
            "pergunta": "Se f(x) = 3x + 1 e f(x) = 16, qual é o valor de x?",
            "alternativas": [
                {
                    "texto": "5"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "6"
                },
                {
                    "texto": "15"
                }
            ],
            "explicacao": "3x + 1 = 16, então 3x = 15 e x = 5."
        },
        {
            "pergunta": "Se f(x) = 2x², quanto vale f(3)?",
            "alternativas": [
                {
                    "texto": "12"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "36"
                },
                {
                    "texto": "18"
                }
            ],
            "explicacao": "f(3) = 2 × 3² = 2 × 9 = 18."
        }
    ],
    "6": [
        {
            "pergunta": "Resolva o sistema: x + y = 13 e x - y = 5.",
            "alternativas": [
                {
                    "texto": "x = 7 e y = 6"
                },
                {
                    "texto": "x = 9 e y = 4"
                },
                {
                    "texto": "x = 8 e y = 5"
                },
                {
                    "texto": "x = 10 e y = 3"
                }
            ],
            "explicacao": "Somando as equações: 2x = 18, então x = 9. Substituindo: y = 4."
        },
        {
            "pergunta": "Resolva o sistema: 2x + 3y = 16 e x - y = 2.",
            "alternativas": [
                {
                    "texto": "x = 22/5 e y = 12/5"
                },
                {
                    "texto": "x = 4 e y = 2"
                },
                {
                    "texto": "x = 5 e y = 2"
                },
                {
                    "texto": "x = 3 e y = 4"
                }
            ],
            "explicacao": "Da segunda equação, x = y + 2. Substituindo: 2(y + 2) + 3y = 16, então 5y = 12. Logo y = 12/5 e x = 22/5."
        },
        {
            "pergunta": "Quais são as raízes de x² - 5x + 6 = 0?",
            "alternativas": [
                {
                    "texto": "-2 e -3"
                },
                {
                    "texto": "1 e 6"
                },
                {
                    "texto": "-1 e -6"
                },
                {
                    "texto": "2 e 3"
                }
            ],
            "explicacao": "Fatorando: (x - 2)(x - 3) = 0. Portanto, x = 2 ou x = 3."
        },
        {
            "pergunta": "Quais são as soluções reais de 2x² - 8 = 0?",
            "alternativas": [
                {
                    "texto": "0 e 2"
                },
                {
                    "texto": "-2 e 4"
                },
                {
                    "texto": "-2 e 2"
                },
                {
                    "texto": "-4 e 4"
                }
            ],
            "explicacao": "2x² = 8, então x² = 4. As soluções são x = -2 e x = 2."
        },
        {
            "pergunta": "Resolva o sistema: 3x + 2y = 16 e x + 2y = 8.",
            "alternativas": [
                {
                    "texto": "x = 5 e y = 1"
                },
                {
                    "texto": "x = 4 e y = 2"
                },
                {
                    "texto": "x = 2 e y = 4"
                },
                {
                    "texto": "x = 3 e y = 3"
                }
            ],
            "explicacao": "Subtraindo a segunda equação da primeira: 2x = 8, então x = 4. Substituindo, y = 2."
        },
        {
            "pergunta": "Quais valores satisfazem (x + 1)(x - 4) = 0?",
            "alternativas": [
                {
                    "texto": "-1 e 4"
                },
                {
                    "texto": "1 e -4"
                },
                {
                    "texto": "-1 e -4"
                },
                {
                    "texto": "1 e 4"
                }
            ],
            "explicacao": "Um produto é zero quando pelo menos um fator é zero: x + 1 = 0 ou x - 4 = 0."
        },
        {
            "pergunta": "Quais são as raízes de x² + 2x - 15 = 0?",
            "alternativas": [
                {
                    "texto": "-3 e 5"
                },
                {
                    "texto": "1 e -15"
                },
                {
                    "texto": "-1 e 15"
                },
                {
                    "texto": "3 e -5"
                }
            ],
            "explicacao": "Fatorando: (x + 5)(x - 3) = 0. Assim, x = -5 ou x = 3."
        },
        {
            "pergunta": "Resolva o sistema: 2x + y = 11 e x - y = 1.",
            "alternativas": [
                {
                    "texto": "x = 5 e y = 1"
                },
                {
                    "texto": "x = 6 e y = -1"
                },
                {
                    "texto": "x = 4 e y = 3"
                },
                {
                    "texto": "x = 3 e y = 5"
                }
            ],
            "explicacao": "Somando as equações: 3x = 12, então x = 4. Substituindo, y = 3."
        },
        {
            "pergunta": "Simplifique (3x² - 12x) ÷ 3x, considerando x diferente de zero.",
            "alternativas": [
                {
                    "texto": "x² - 4"
                },
                {
                    "texto": "x - 4"
                },
                {
                    "texto": "x + 4"
                },
                {
                    "texto": "3x - 12"
                }
            ],
            "explicacao": "Dividindo cada termo por 3x: 3x²/3x - 12x/3x = x - 4."
        },
        {
            "pergunta": "Resolva 5/(x - 1) = 2.",
            "alternativas": [
                {
                    "texto": "3,5"
                },
                {
                    "texto": "2,5"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "Multiplicando por x - 1: 5 = 2(x - 1). Então 2x = 7 e x = 3,5."
        }
    ],
    "7": [
        {
            "pergunta": "Um triângulo retângulo tem catetos de 9 cm e 12 cm. Qual é a hipotenusa?",
            "alternativas": [
                {
                    "texto": "21 cm"
                },
                {
                    "texto": "13 cm"
                },
                {
                    "texto": "15 cm"
                },
                {
                    "texto": "18 cm"
                }
            ],
            "explicacao": "Pelo teorema de Pitágoras: h² = 9² + 12² = 81 + 144 = 225. Logo h = 15 cm."
        },
        {
            "pergunta": "Qual é o comprimento da circunferência de raio 7 cm?",
            "alternativas": [
                {
                    "texto": "21π cm"
                },
                {
                    "texto": "14π cm"
                },
                {
                    "texto": "7π cm"
                },
                {
                    "texto": "49π cm"
                }
            ],
            "explicacao": "C = 2πr = 2 × π × 7 = 14π cm."
        },
        {
            "pergunta": "Qual é a área de um setor circular de 90° e raio 8 cm?",
            "alternativas": [
                {
                    "texto": "16π cm²"
                },
                {
                    "texto": "32π cm²"
                },
                {
                    "texto": "64π cm²"
                },
                {
                    "texto": "8π cm²"
                }
            ],
            "explicacao": "O setor corresponde a 90/360 = 1/4 do círculo. A área é 1/4 × π × 8² = 16π cm²."
        },
        {
            "pergunta": "Um cilindro tem raio 3 cm e altura 10 cm. Qual é seu volume?",
            "alternativas": [
                {
                    "texto": "30π cm³"
                },
                {
                    "texto": "60π cm³"
                },
                {
                    "texto": "300π cm³"
                },
                {
                    "texto": "90π cm³"
                }
            ],
            "explicacao": "V = πr²h = π × 9 × 10 = 90π cm³."
        },
        {
            "pergunta": "Um prisma possui área da base de 24 cm² e altura de 7 cm. Qual é seu volume?",
            "alternativas": [
                {
                    "texto": "96 cm³"
                },
                {
                    "texto": "144 cm³"
                },
                {
                    "texto": "168 cm³"
                },
                {
                    "texto": "31 cm³"
                }
            ],
            "explicacao": "O volume do prisma é área da base × altura: 24 × 7 = 168 cm³."
        },
        {
            "pergunta": "Um cone tem raio 3 cm e altura 12 cm. Qual é seu volume?",
            "alternativas": [
                {
                    "texto": "27π cm³"
                },
                {
                    "texto": "36π cm³"
                },
                {
                    "texto": "108π cm³"
                },
                {
                    "texto": "12π cm³"
                }
            ],
            "explicacao": "V = πr²h/3 = π × 9 × 12 ÷ 3 = 36π cm³."
        },
        {
            "pergunta": "Qual é a área da superfície de uma esfera de raio 4 cm?",
            "alternativas": [
                {
                    "texto": "64π cm²"
                },
                {
                    "texto": "16π cm²"
                },
                {
                    "texto": "32π cm²"
                },
                {
                    "texto": "48π cm²"
                }
            ],
            "explicacao": "A = 4πr² = 4 × π × 16 = 64π cm²."
        },
        {
            "pergunta": "Um triângulo isósceles tem lados iguais de 13 cm e base de 10 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "65 cm²"
                },
                {
                    "texto": "50 cm²"
                },
                {
                    "texto": "120 cm²"
                },
                {
                    "texto": "60 cm²"
                }
            ],
            "explicacao": "A altura divide a base em dois segmentos de 5 cm. Pelo teorema de Pitágoras, h = 12 cm. A área é 10 × 12 ÷ 2 = 60 cm²."
        },
        {
            "pergunta": "Um triângulo retângulo tem hipotenusa 13 cm e um cateto 5 cm. Qual é o outro cateto?",
            "alternativas": [
                {
                    "texto": "8 cm"
                },
                {
                    "texto": "14 cm"
                },
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "10 cm"
                }
            ],
            "explicacao": "Pelo teorema de Pitágoras: outro cateto² = 13² - 5² = 169 - 25 = 144. Logo, 12 cm."
        },
        {
            "pergunta": "Qual é a distância entre os pontos (1, 2) e (7, 10) no plano cartesiano?",
            "alternativas": [
                {
                    "texto": "14"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "12"
                }
            ],
            "explicacao": "A distância é √[(7 - 1)² + (10 - 2)²] = √(36 + 64) = √100 = 10."
        }
    ],
    "8": [
        {
            "pergunta": "Simplifique 2⁵ × 2³.",
            "alternativas": [
                {
                    "texto": "64"
                },
                {
                    "texto": "128"
                },
                {
                    "texto": "512"
                },
                {
                    "texto": "256"
                }
            ],
            "explicacao": "Na multiplicação de potências de mesma base, somamos os expoentes: 2⁸ = 256."
        },
        {
            "pergunta": "Qual é o valor de (3²)³?",
            "alternativas": [
                {
                    "texto": "81"
                },
                {
                    "texto": "36"
                },
                {
                    "texto": "729"
                },
                {
                    "texto": "243"
                }
            ],
            "explicacao": "Na potência de potência, multiplicamos os expoentes: 3⁶ = 729."
        },
        {
            "pergunta": "Qual é a raiz quadrada de 196?",
            "alternativas": [
                {
                    "texto": "16"
                },
                {
                    "texto": "14"
                },
                {
                    "texto": "12"
                },
                {
                    "texto": "13"
                }
            ],
            "explicacao": "Como 14 × 14 = 196, a raiz quadrada é 14."
        },
        {
            "pergunta": "Simplifique √50.",
            "alternativas": [
                {
                    "texto": "5√2"
                },
                {
                    "texto": "25√2"
                },
                {
                    "texto": "10√5"
                },
                {
                    "texto": "2√5"
                }
            ],
            "explicacao": "√50 = √(25 × 2) = 5√2."
        },
        {
            "pergunta": "Qual é a raiz cúbica de 216?",
            "alternativas": [
                {
                    "texto": "8"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "12"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "6³ = 6 × 6 × 6 = 216."
        },
        {
            "pergunta": "Escreva 0,00045 em notação científica.",
            "alternativas": [
                {
                    "texto": "45 × 10⁻⁴"
                },
                {
                    "texto": "0,45 × 10⁻³"
                },
                {
                    "texto": "4,5 × 10⁻⁴"
                },
                {
                    "texto": "4,5 × 10⁴"
                }
            ],
            "explicacao": "Movemos a vírgula quatro casas para a direita, obtendo 4,5. Portanto, o expoente é -4."
        },
        {
            "pergunta": "Qual é o valor de 2⁻³?",
            "alternativas": [
                {
                    "texto": "8"
                },
                {
                    "texto": "1/8"
                },
                {
                    "texto": "-8"
                },
                {
                    "texto": "1/6"
                }
            ],
            "explicacao": "Expoente negativo indica o inverso: 2⁻³ = 1/2³ = 1/8."
        },
        {
            "pergunta": "Quanto é √(81/16)?",
            "alternativas": [
                {
                    "texto": "9/4"
                },
                {
                    "texto": "8/4"
                },
                {
                    "texto": "9/8"
                },
                {
                    "texto": "4/9"
                }
            ],
            "explicacao": "A raiz da fração é a fração das raízes: √81/√16 = 9/4."
        },
        {
            "pergunta": "Calcule 4³ ÷ 2⁴.",
            "alternativas": [
                {
                    "texto": "2"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "4"
                }
            ],
            "explicacao": "4³ = 64 e 2⁴ = 16. Então 64 ÷ 16 = 4."
        },
        {
            "pergunta": "Calcule 3² + 2√121.",
            "alternativas": [
                {
                    "texto": "33"
                },
                {
                    "texto": "29"
                },
                {
                    "texto": "31"
                },
                {
                    "texto": "25"
                }
            ],
            "explicacao": "3² = 9 e √121 = 11. Logo, 9 + 2 × 11 = 31."
        }
    ],
    "9": [
        {
            "pergunta": "Uma urna tem 3 bolas vermelhas, 2 azuis e 5 verdes. Qual é a probabilidade de retirar uma azul?",
            "alternativas": [
                {
                    "texto": "1/5"
                },
                {
                    "texto": "1/2"
                },
                {
                    "texto": "1/10"
                },
                {
                    "texto": "2/5"
                }
            ],
            "explicacao": "Há 10 bolas no total e 2 azuis. A probabilidade é 2/10 = 1/5."
        },
        {
            "pergunta": "Ao lançar dois dados comuns, qual é a probabilidade de a soma ser 7?",
            "alternativas": [
                {
                    "texto": "1/12"
                },
                {
                    "texto": "1/9"
                },
                {
                    "texto": "1/3"
                },
                {
                    "texto": "1/6"
                }
            ],
            "explicacao": "Há 6 pares que somam 7 entre 36 resultados possíveis. Assim, 6/36 = 1/6."
        },
        {
            "pergunta": "Qual é a média dos números 4, 6, 8, 10 e 12?",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "A soma é 40. Dividindo por 5 valores, a média é 8."
        },
        {
            "pergunta": "Se 6 alunos tiraram nota 7 e 4 alunos tiraram nota 9, qual é a média da turma?",
            "alternativas": [
                {
                    "texto": "8,2"
                },
                {
                    "texto": "7,8"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "7,5"
                }
            ],
            "explicacao": "A média ponderada é (6 × 7 + 4 × 9) ÷ 10 = 78 ÷ 10 = 7,8."
        },
        {
            "pergunta": "Qual é a mediana do conjunto 2, 4, 4, 7, 9, 12?",
            "alternativas": [
                {
                    "texto": "5,5"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "7"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "Há seis valores. A mediana é a média dos dois centrais: (4 + 7) ÷ 2 = 5,5."
        },
        {
            "pergunta": "Ao lançar um dado, qual é a probabilidade de sair um número que não seja primo?",
            "alternativas": [
                {
                    "texto": "1/3"
                },
                {
                    "texto": "2/3"
                },
                {
                    "texto": "1/6"
                },
                {
                    "texto": "1/2"
                }
            ],
            "explicacao": "Os resultados não primos são 1, 4 e 6. São 3 casos em 6: 3/6 = 1/2."
        },
        {
            "pergunta": "Os valores de um conjunto vão de 18 a 43. Qual é a amplitude?",
            "alternativas": [
                {
                    "texto": "26"
                },
                {
                    "texto": "61"
                },
                {
                    "texto": "25"
                },
                {
                    "texto": "24"
                }
            ],
            "explicacao": "A amplitude é o maior menos o menor: 43 - 18 = 25."
        },
        {
            "pergunta": "Em uma turma de 60 estudantes, 18 participam de um clube. Qual percentual isso representa?",
            "alternativas": [
                {
                    "texto": "36%"
                },
                {
                    "texto": "30%"
                },
                {
                    "texto": "18%"
                },
                {
                    "texto": "25%"
                }
            ],
            "explicacao": "18 ÷ 60 × 100 = 30%."
        },
        {
            "pergunta": "Uma caixa tem 12 bolas brancas e 8 pretas. Retirando duas bolas brancas sem reposição, qual é a probabilidade?",
            "alternativas": [
                {
                    "texto": "33/95"
                },
                {
                    "texto": "3/5"
                },
                {
                    "texto": "6/25"
                },
                {
                    "texto": "11/20"
                }
            ],
            "explicacao": "A probabilidade é 12/20 × 11/19 = 132/380 = 33/95."
        },
        {
            "pergunta": "Uma pesquisa registrou frequências 5, 8, 12 e 15. Qual é a frequência total?",
            "alternativas": [
                {
                    "texto": "35"
                },
                {
                    "texto": "30"
                },
                {
                    "texto": "45"
                },
                {
                    "texto": "40"
                }
            ],
            "explicacao": "Somamos as frequências: 5 + 8 + 12 + 15 = 40."
        }
    ],
    "10": [
        {
            "pergunta": "Um produto de R$ 240 recebe desconto de 10% e depois acréscimo de 15% sobre o novo preço. Qual é o valor final?",
            "alternativas": [
                {
                    "texto": "R$ 276,00"
                },
                {
                    "texto": "R$ 248,40"
                },
                {
                    "texto": "R$ 252,00"
                },
                {
                    "texto": "R$ 240,00"
                }
            ],
            "explicacao": "Após o desconto: 240 × 0,9 = 216. Com acréscimo: 216 × 1,15 = R$ 248,40."
        },
        {
            "pergunta": "A função f(x) = -2x² + 8x + 3 atinge seu valor máximo em qual x?",
            "alternativas": [
                {
                    "texto": "2"
                },
                {
                    "texto": "-2"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "8"
                }
            ],
            "explicacao": "A abscissa do vértice é -b/(2a) = -8/[2 × (-2)] = 2."
        },
        {
            "pergunta": "Resolva o sistema 3x + 2y = 18 e x + y = 7.",
            "alternativas": [
                {
                    "texto": "x = 3 e y = 4"
                },
                {
                    "texto": "x = 5 e y = 2"
                },
                {
                    "texto": "x = 2 e y = 5"
                },
                {
                    "texto": "x = 4 e y = 3"
                }
            ],
            "explicacao": "Da segunda equação, y = 7 - x. Substituindo: 3x + 14 - 2x = 18, então x = 4 e y = 3."
        },
        {
            "pergunta": "Resolva x/2 + 3/4 = 5/2.",
            "alternativas": [
                {
                    "texto": "3/2"
                },
                {
                    "texto": "7/4"
                },
                {
                    "texto": "7/2"
                },
                {
                    "texto": "5/2"
                }
            ],
            "explicacao": "Subtraindo 3/4: x/2 = 10/4 - 3/4 = 7/4. Multiplicando por 2: x = 7/2."
        },
        {
            "pergunta": "Um retângulo tem lados 9 cm e 12 cm. Qual é a diagonal?",
            "alternativas": [
                {
                    "texto": "13 cm"
                },
                {
                    "texto": "15 cm"
                },
                {
                    "texto": "18 cm"
                },
                {
                    "texto": "21 cm"
                }
            ],
            "explicacao": "Pelo teorema de Pitágoras: d² = 9² + 12² = 225. Logo d = 15 cm."
        },
        {
            "pergunta": "Uma aplicação de R$ 500 sofre aumento de 20% e depois redução de 20%. Qual é o valor final?",
            "alternativas": [
                {
                    "texto": "R$ 480"
                },
                {
                    "texto": "R$ 500"
                },
                {
                    "texto": "R$ 520"
                },
                {
                    "texto": "R$ 450"
                }
            ],
            "explicacao": "Após o aumento: 500 × 1,2 = 600. Depois da redução: 600 × 0,8 = R$ 480."
        },
        {
            "pergunta": "Dois triângulos semelhantes têm lados correspondentes na razão 3:5. Se um lado do menor mede 12 cm, quanto mede o correspondente no maior?",
            "alternativas": [
                {
                    "texto": "15 cm"
                },
                {
                    "texto": "18 cm"
                },
                {
                    "texto": "24 cm"
                },
                {
                    "texto": "20 cm"
                }
            ],
            "explicacao": "O fator de ampliação é 5/3. Então 12 × 5/3 = 20 cm."
        },
        {
            "pergunta": "Simplifique (x² - 9)/(x - 3), com x diferente de 3.",
            "alternativas": [
                {
                    "texto": "x² + 3"
                },
                {
                    "texto": "x + 9"
                },
                {
                    "texto": "x + 3"
                },
                {
                    "texto": "x - 3"
                }
            ],
            "explicacao": "Fatorando o numerador: (x - 3)(x + 3). Cancelando x - 3, resta x + 3."
        },
        {
            "pergunta": "Uma função linear passa pela origem e por (4, 18). Qual é sua expressão?",
            "alternativas": [
                {
                    "texto": "f(x) = x + 14"
                },
                {
                    "texto": "f(x) = 4,5x"
                },
                {
                    "texto": "f(x) = 18x"
                },
                {
                    "texto": "f(x) = 4x + 18"
                }
            ],
            "explicacao": "O coeficiente angular é 18/4 = 4,5. Como passa pela origem, f(x) = 4,5x."
        },
        {
            "pergunta": "Um terreno retangular tem perímetro 50 m e comprimento 15 m. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "150 m²"
                },
                {
                    "texto": "125 m²"
                },
                {
                    "texto": "175 m²"
                },
                {
                    "texto": "200 m²"
                }
            ],
            "explicacao": "2(c + l) = 50, então c + l = 25. A largura é 10 m e a área é 15 × 10 = 150 m²."
        }
    ]
};


// =====================================================
// ESTADO ATUAL
// =====================================================

let nivelAtual = 2;

let faseAtual = 1;

let questaoAtual = 1;

let respostas = {};

let alternativasSelecionadas = {};

let progressoBancoNiveis = {};

let tentativasBancoNivel2 = {};

let inicioFase = null;

let faseFinalizada = false;

let respostaEmEnvio = false;

let modoRevisao = false;

let idSessaoRevisao = null;


// =====================================================
// CARREGAR PROGRESSO DO NÍVEL 1 NO SUPABASE
// =====================================================

async function carregarProgressoBancoNivel2() {

    if (typeof supabaseClient === "undefined" || !supabaseClient) {
        throw new Error("A conexão com o Supabase não está disponível.");
    }

    const {
        data: { session },
        error: erroSessao
    } = await supabaseClient.auth.getSession();

    if (erroSessao || !session) {
        throw new Error("Sua sessão expirou. Entre novamente.");
    }

    const [resultadoFases, resultadoTentativas, resultadoXP] =
        await Promise.all([

            supabaseClient
                .from("user_level_progress")
                .select("phase_number, completed, best_result, current_question, answers")
                .eq("level_number", 2),

            supabaseClient
                .from("user_question_attempts")
                .select("question_id, selected_option_id, is_correct")
                .eq("activity_type", "nivel")
                .like("question_id", "nivel:2:fase:%"),

            supabaseClient
                .from("user_progress")
                .select("total_xp")
                .maybeSingle()

        ]);

    if (resultadoFases.error) throw resultadoFases.error;
    if (resultadoTentativas.error) throw resultadoTentativas.error;
    if (resultadoXP.error) throw resultadoXP.error;

    progressoBancoNiveis = {};
    tentativasBancoNivel2 = {};

    (resultadoFases.data || []).forEach(function(fase) {
        progressoBancoNiveis[fase.phase_number] = {
            concluida: fase.completed === true,
            melhorResultado: Number(fase.best_result) || 0,
            questaoAtual: Number(fase.current_question) || 1,
            respostas: fase.answers || {}
        };
    });

    (resultadoTentativas.data || []).forEach(function(tentativa) {
        const identificacao = tentativa.question_id.match(
            /^nivel:2:fase:(\d+):questao:(\d+)$/
        );

        if (!identificacao) return;

        const numeroFase = Number(identificacao[1]);
        const numeroQuestao = Number(identificacao[2]);

        if (!tentativasBancoNivel2[numeroFase]) {
            tentativasBancoNivel2[numeroFase] = {};
        }

        tentativasBancoNivel2[numeroFase][numeroQuestao] = {
            alternativa: tentativa.selected_option_id,
            correta: tentativa.is_correct === true
        };
    });

    if (
        resultadoXP.data &&
        Number.isFinite(Number(resultadoXP.data.total_xp)) &&
        typeof salvarXP === "function"
    ) {
        salvarXP(Number(resultadoXP.data.total_xp));
    }
}


// =====================================================
// CARREGAR PROGRESSO
// =====================================================

function carregarProgresso() {

    const salvo =
        localStorage.getItem(
            CHAVE_PROGRESSO
        );


    if (!salvo) {

        return {
            niveis: {}
        };

    }


    try {

        const dados =
            JSON.parse(salvo);


        if (
            !dados ||
            typeof dados !== "object"
        ) {

            return {
                niveis: {}
            };

        }


        if (
            !dados.niveis ||
            typeof dados.niveis !== "object"
        ) {

            dados.niveis = {};

        }


        return dados;

    } catch (erro) {

        console.error(
            "Não foi possível carregar o progresso:",
            erro
        );


        return {
            niveis: {}
        };

    }

}


// =====================================================
// SALVAR PROGRESSO
// =====================================================

function salvarProgresso(dados) {

    try {

        localStorage.setItem(
            CHAVE_PROGRESSO,
            JSON.stringify(dados)
        );

    } catch (erro) {

        console.error(
            "Não foi possível salvar o progresso:",
            erro
        );

    }

}


// =====================================================
// CRIAR E OBTER DADOS DO NÍVEL
// =====================================================

function obterDadosNivel(numeroNivel) {

    const progresso =
        carregarProgresso();


    if (
        !progresso.niveis[numeroNivel]
    ) {

        progresso.niveis[numeroNivel] = {
            fases: {}
        };


        salvarProgresso(
            progresso
        );

    }


    return progresso.niveis[numeroNivel];

}


// =====================================================
// CRIAR E OBTER DADOS DA FASE
// =====================================================

function obterDadosFase(
    numeroNivel,
    numeroFase
) {

    const progresso =
        carregarProgresso();


    if (
        !progresso.niveis[numeroNivel]
    ) {

        progresso.niveis[numeroNivel] = {
            fases: {}
        };

    }


    if (
        !progresso.niveis[numeroNivel]
            .fases
            .hasOwnProperty(numeroFase)
    ) {

        progresso.niveis[numeroNivel]
            .fases[numeroFase] = {

                concluida: false,

                melhorResultado: 0,

                questaoAtual: 1,

                respostas: {},

                xpRecebido: {},

                bonusXPRecebido: false,

                acertos: 0,

                erros: 0,

                tempo: 0

            };


        salvarProgresso(
            progresso
        );

    }

if (
    !progresso.niveis[numeroNivel]
        .fases[numeroFase]
        .xpRecebido
) {

    progresso.niveis[numeroNivel]
        .fases[numeroFase]
        .xpRecebido = {};

    salvarProgresso(
        progresso
    );

}

if (
    progresso.niveis[numeroNivel]
        .fases[numeroFase]
        .bonusXPRecebido === undefined
) {

    progresso.niveis[numeroNivel]
        .fases[numeroFase]
        .bonusXPRecebido =
            false;

    salvarProgresso(
        progresso
    );

}

    return progresso.niveis[numeroNivel]
        .fases[numeroFase];

}


// =====================================================
// VERIFICAR SE A FASE ESTÁ DESBLOQUEADA
// =====================================================

function faseEstaDesbloqueada(numeroFase) {

    if (numeroFase === 1) return true;

    const faseAnterior = progressoBancoNiveis[numeroFase - 1];

    return Boolean(faseAnterior && faseAnterior.concluida === true);

}


// =====================================================
// VERIFICAR SE A FASE FOI CONCLUÍDA

// =====================================================
// VERIFICAR SE A FASE FOI CONCLUÍDA
// =====================================================

function faseFoiConcluida(numeroFase) {

    const dados = progressoBancoNiveis[numeroFase];

    return Boolean(dados && dados.concluida === true);

}


// =====================================================
// OBTER QUESTÕES DA FASE
// =====================================================

function obterQuestoesDaFase(
    numeroFase
) {

    return (
        questoesNivel2[numeroFase] || []
    );

}


// =====================================================
// EMBARALHAR ARRAY
// =====================================================

function embaralhar(array) {

    const copia = [
        ...array
    ];


    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];

    }


    return copia;

}    // =====================================================
// ATUALIZAR INFORMAÇÕES DA FASE
// =====================================================

function atualizarInformacoesFase() {

    const dadosFase =
        fasesNivel2[faseAtual];


    if (!dadosFase) {

        return;

    }

    const rotulo =
    document.getElementById(
        "rotuloFase"
    );
    
    const nome =
        document.getElementById(
            "nomeFase"
        );


    const descricao =
        document.getElementById(
            "descricaoFase"
        );

if (rotulo) {

    rotulo.textContent =
        "Fase " + faseAtual;

}  
    if (nome) {

        nome.textContent =
            dadosFase.nome;

    }


    if (descricao) {

        descricao.textContent =
            dadosFase.descricao;

    }

}


// =====================================================
// ATUALIZAR PROGRESSO VISUAL
// =====================================================

function atualizarProgressoVisual() {

    const texto =
        document.getElementById(
            "progressoQuestao"
        );


    const barra =
        document.getElementById(
            "barraProgresso"
        );


    if (!texto || !barra) {

        return;

    }


    const quantidadeRespondida =
        Object.keys(
            respostas
        ).length;


    texto.textContent =
        quantidadeRespondida +
        "/" +
        TOTAL_QUESTOES;


    const porcentagem =
        (
            quantidadeRespondida /
            TOTAL_QUESTOES
        ) * 100;


    barra.style.width =
        porcentagem + "%";

}


// =====================================================
// ATUALIZAR NÚMERO DA QUESTÃO
// =====================================================

function atualizarNumeroQuestao() {

    const numero =
        document.getElementById(
            "numeroQuestao"
        );


    if (numero) {

        numero.textContent =
            questaoAtual;

    }

}


// =====================================================
// MOSTRAR QUESTÃO
// =====================================================

function mostrarQuestao() {

    const questoes = obterQuestoesDaFase(faseAtual);
    const textoQuestao = document.getElementById("textoQuestao");
    const alternativas = document.getElementById("alternativas");
    const explicacao = document.getElementById("explicacaoErro");

    if (!textoQuestao || !alternativas) return;

    atualizarNumeroQuestao();
    atualizarProgressoVisual();

    if (explicacao) {
        explicacao.hidden = true;
        explicacao.textContent = "";
    }

    const questao = questoes[questaoAtual - 1];

    if (!questao) {
        textoQuestao.textContent =
            "As questões desta fase serão adicionadas em breve.";
        alternativas.innerHTML = "";
        atualizarBotoesNavegacao();
        return;
    }

    textoQuestao.textContent = questao.pergunta;
    alternativas.innerHTML = "";

    // O ID é definido pela ordem original antes do embaralhamento.
    const alternativasComIds = questao.alternativas.map(
        function(alternativa, indice) {
            return {
                ...alternativa,
                id: String.fromCharCode(97 + indice)
            };
        }
    );

    embaralhar(alternativasComIds).forEach(function(alternativa) {

        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = alternativa.texto;
        botao.dataset.optionId = alternativa.id;

        if (respostas[questaoAtual] === undefined) {
            botao.addEventListener("click", function() {
                responderAlternativa(alternativa, botao);
            });
        } else {
            botao.disabled = true;

            if (alternativasSelecionadas[questaoAtual] === alternativa.id) {
                botao.classList.add(
                    respostas[questaoAtual]
                        ? "resposta-correta"
                        : "resposta-errada"
                );
            }
        }

        alternativas.appendChild(botao);
    });

    if (respostas[questaoAtual] === false) {
        mostrarExplicacao();
    }

    atualizarBotoesNavegacao();
}


// =====================================================
// RESPONDER ALTERNATIVA
// =====================================================

async function responderAlternativa(alternativa, botao) {

    if (
        respostas[questaoAtual] !== undefined ||
        respostaEmEnvio
    ) return;

    if (!alternativa || !["a", "b", "c", "d"].includes(alternativa.id)) {
        console.error("ID de alternativa inválido.");
        return;
    }

    if (modoRevisao && !idSessaoRevisao) {
        console.error("A sessão de revisão não está disponível.");
        return;
    }

    respostaEmEnvio = true;

    const botoes = document.querySelectorAll("#alternativas button");
    botoes.forEach(function(item) {
        item.disabled = true;
    });

    try {

        const nomeRPC = modoRevisao
            ? "submit_level_phase_review_answer"
            : "submit_level_answer";

        const argumentosRPC = modoRevisao
            ? {
                p_review_session_id: idSessaoRevisao,
                p_question_number: questaoAtual,
                p_option_id: alternativa.id
            }
            : {
                p_level_number: nivelAtual,
                p_phase_number: faseAtual,
                p_question_number: questaoAtual,
                p_option_id: alternativa.id
            };

        const { data, error } = await supabaseClient.rpc(
            nomeRPC,
            argumentosRPC
        );

        if (error) throw error;
        if (!data || typeof data !== "object") {
            throw new Error("O Supabase retornou uma resposta inválida.");
        }

        if (data.already_answered === true) {

            if (modoRevisao) {
                respostas[questaoAtual] = data.correct === true;
                alternativasSelecionadas[questaoAtual] =
                    data.selected_option_id;
            } else {
                const questionId =
                    "nivel:2:fase:" + faseAtual + ":questao:" + questaoAtual;

                const { data: tentativa, error: erroTentativa } =
                    await supabaseClient
                        .from("user_question_attempts")
                        .select("selected_option_id, is_correct")
                        .eq("activity_type", "nivel")
                        .eq("question_id", questionId)
                        .maybeSingle();

                if (erroTentativa || !tentativa) {
                    throw erroTentativa ||
                        new Error("Não foi possível recuperar a resposta já registrada.");
                }

                respostas[questaoAtual] = tentativa.is_correct === true;
                alternativasSelecionadas[questaoAtual] =
                    tentativa.selected_option_id;
            }

        } else {

            if (typeof data.correct !== "boolean") {
                throw new Error("O banco não retornou o resultado da correção.");
            }

            respostas[questaoAtual] = data.correct;
            alternativasSelecionadas[questaoAtual] = alternativa.id;

        }

        if (
            !modoRevisao &&
            Number.isFinite(Number(data.total_xp)) &&
            typeof salvarXP === "function"
        ) {
            salvarXP(Number(data.total_xp));
        }

        respostaEmEnvio = false;

        const idSelecionado = alternativasSelecionadas[questaoAtual];
        const botaoSelecionado = document.querySelector(
            '#alternativas button[data-option-id="' + idSelecionado + '"]'
        );

        if (botaoSelecionado) {
            botaoSelecionado.classList.add(
                respostas[questaoAtual]
                    ? "resposta-correta"
                    : "resposta-errada"
            );
        }

        if (respostas[questaoAtual] === false) {
            mostrarExplicacao();
        }

        salvarEstadoAtual();
        atualizarProgressoVisual();
        atualizarBotoesNavegacao();

    } catch (erro) {

        respostaEmEnvio = false;

        botoes.forEach(function(item) {
            item.disabled = false;
        });

        const areaErro = document.getElementById("explicacaoErro");

        if (areaErro) {
            areaErro.textContent =
                "Não foi possível salvar sua resposta. Verifique sua conexão e tente novamente.";
            areaErro.hidden = false;
        }

        console.error("Erro ao registrar resposta no Supabase:", erro);
    }
}


// =====================================================
// MOSTRAR EXPLICAÇÃO APÓS ERRO
// =====================================================

function mostrarExplicacao() {

    const area =
        document.getElementById(
            "explicacaoErro"
        );


    if (!area) {

        return;

    }


    const questoes =
        obterQuestoesDaFase(
            faseAtual
        );


    const questao =
        questoes[
            questaoAtual - 1
        ];


    if (
        questao &&
        questao.explicacao
    ) {

        area.textContent =
            questao.explicacao;


        area.hidden = false;

    }

}


// =====================================================
// ATUALIZAR BOTÕES DE NAVEGAÇÃO
// =====================================================

function atualizarBotoesNavegacao() {

    const anterior =
        document.getElementById(
            "questaoAnterior"
        );


    const proxima =
        document.getElementById(
            "proximaQuestao"
        );


    if (
        !anterior ||
        !proxima
    ) {

        return;

    }


    // =================================================
    // BOTÃO QUESTÃO ANTERIOR
    // =================================================

    anterior.hidden =
        questaoAtual === 1;


    // =================================================
    // BOTÃO PRÓXIMA QUESTÃO
    // =================================================
    //
    // Só pode avançar depois de responder.
    //

    proxima.disabled =
        respostas[questaoAtual] === undefined;


    // =================================================
    // TEXTO DO BOTÃO
    // =================================================

    const texto =
        proxima.querySelector(
            "span"
        );


    if (
        questaoAtual === TOTAL_QUESTOES
    ) {

        if (texto) {

            texto.textContent =
                "Finalizar";

        }

    } else {

        if (texto) {

            texto.textContent =
                "Próxima questão";

        }

    }


    // Atualiza os ícones Lucide.

    if (
        typeof atualizarIcones === "function"
    ) {

        atualizarIcones();

    }

}


// =====================================================
// QUESTÃO ANTERIOR
// =====================================================

function voltarQuestao() {

    if (
        questaoAtual <= 1
    ) {

        return;

    }


    questaoAtual--;


    salvarEstadoAtual();


    mostrarQuestao();

}


// =====================================================
// PRÓXIMA QUESTÃO
// =====================================================

function avancarQuestao() {

    // Não permite avançar sem responder.

    if (
        respostas[questaoAtual] === undefined
    ) {

        return;

    }


    // Se for a última questão,
    // finaliza a fase.

    if (
        questaoAtual === TOTAL_QUESTOES
    ) {

        finalizarFase();

        return;

    }


    questaoAtual++;


    salvarEstadoAtual();


    mostrarQuestao();

}


// =====================================================
// SALVAR ESTADO ATUAL
// =====================================================

function salvarEstadoAtual() {

    if (modoRevisao) return;

    const progresso = carregarProgresso();

    if (!progresso.niveis[nivelAtual]) {
        progresso.niveis[nivelAtual] = { fases: {} };
    }

    if (!progresso.niveis[nivelAtual].fases[faseAtual]) {
        progresso.niveis[nivelAtual].fases[faseAtual] = {
            concluida: false,
            melhorResultado: 0,
            questaoAtual: 1,
            respostas: {},
            xpRecebido: {},
            bonusXPRecebido: false,
            acertos: 0,
            erros: 0,
            tempo: 0
        };
    }

    const dadosFase =
        progresso.niveis[nivelAtual].fases[faseAtual];

    if (inicioFase) {
        const tempoDecorrido =
            Math.floor((Date.now() - inicioFase) / 1000);

        dadosFase.tempo =
            (Number(dadosFase.tempo) || 0) +
            Math.max(0, tempoDecorrido);

        inicioFase = Date.now();
    }

    dadosFase.questaoAtual = questaoAtual;
    salvarProgresso(progresso);
}



function registrarAcessoFaseNivel2(numeroFase) {

    if (typeof registrarUltimaAtividade !== "function") return;

    const dadosFase = fasesNivel2[numeroFase];

    const nomeFase = dadosFase
        ? dadosFase.nome
        : "Praticando";

    registrarUltimaAtividade(
        "nivel2_fase_" + numeroFase,
        "Nível 2 • Fase " + numeroFase + ": " + nomeFase,
        "nivel2.html"
    );

}


// =====================================================
// INICIAR FASE
// =====================================================

function iniciarFase(numeroFase) {

    if (
        numeroFase < 1 ||
        numeroFase > TOTAL_FASES ||
        !faseEstaDesbloqueada(numeroFase)
    ) return;

    if (inicioFase) {
        salvarEstadoAtual();
    }

    faseAtual = numeroFase;

    registrarAcessoFaseNivel2(numeroFase);

    const dadosFase = obterDadosFase(nivelAtual, faseAtual);
    const dadosBanco = progressoBancoNiveis[faseAtual] || {};

    questaoAtual = Math.min(
        Math.max(Number(dadosBanco.questaoAtual) || 1, 1),
        TOTAL_QUESTOES
    );

    respostas = { ...(dadosBanco.respostas || {}) };
    alternativasSelecionadas = {};

    const tentativas = tentativasBancoNivel2[faseAtual] || {};

    Object.keys(tentativas).forEach(function(numero) {
        alternativasSelecionadas[numero] =
            tentativas[numero].alternativa;
    });

    inicioFase = Date.now();
    faseFinalizada = false;
    respostaEmEnvio = false;
    modoRevisao = false;
    idSessaoRevisao = null;

    const areaQuestao = document.getElementById("areaQuestao");
    const resultado = document.getElementById("resultadoFase");

    if (areaQuestao) areaQuestao.hidden = false;
    if (resultado) resultado.hidden = true;

    atualizarInformacoesFase();
    mostrarQuestao();
}


// =====================================================
// FINALIZAR FASE
// =====================================================

async function finalizarFase() {

    if (faseFinalizada || respostaEmEnvio) return;

    if (Object.keys(respostas).length !== TOTAL_QUESTOES) return;

    if (modoRevisao && !idSessaoRevisao) return;

    respostaEmEnvio = true;
    salvarEstadoAtual();

    const revisaoAtual = modoRevisao;

    const acertos = Object.values(respostas).filter(
        function(resposta) { return resposta === true; }
    ).length;

    const erros = Object.values(respostas).filter(
        function(resposta) { return resposta === false; }
    ).length;

    const porcentagem = (acertos / TOTAL_QUESTOES) * 100;
    const dadosFase = obterDadosFase(nivelAtual, faseAtual);
    const tempo = revisaoAtual
        ? Math.max(0, Math.floor((Date.now() - inicioFase) / 1000))
        : Number(dadosFase.tempo) || 0;

    const botaoProxima = document.getElementById("proximaQuestao");
    if (botaoProxima) botaoProxima.disabled = true;

    try {

        const nomeRPC = revisaoAtual
            ? "complete_level_phase_review"
            : "complete_level_phase";

        const argumentosRPC = revisaoAtual
            ? { p_review_session_id: idSessaoRevisao }
            : {
                p_level_number: nivelAtual,
                p_phase_number: faseAtual
            };

        const { data, error } = await supabaseClient.rpc(
            nomeRPC,
            argumentosRPC
        );

        if (error) throw error;

        if (!data || data.completed !== true) {
            throw new Error(
                data && data.reason === "questions_incomplete"
                    ? "O banco ainda não identificou todas as respostas da fase."
                    : "O banco não confirmou a conclusão."
            );
        }

        if (
            !revisaoAtual &&
            Number.isFinite(Number(data.total_xp)) &&
            typeof salvarXP === "function"
        ) {
            salvarXP(Number(data.total_xp));
        }

        faseFinalizada = true;
        respostaEmEnvio = false;

        const melhorResultado = Math.max(
            Number(dadosFase.melhorResultado) || 0,
            Number(
                (progressoBancoNiveis[faseAtual] || {}).melhorResultado
            ) || 0,
            Number(data.best_result) || 0,
            acertos
        );

        if (revisaoAtual) {

            if (!progressoBancoNiveis[faseAtual]) {
                progressoBancoNiveis[faseAtual] = {};
            }

            progressoBancoNiveis[faseAtual].melhorResultado =
                melhorResultado;

        } else {

            dadosFase.concluida = true;
            dadosFase.questaoAtual = TOTAL_QUESTOES;
            dadosFase.melhorResultado = melhorResultado;
            dadosFase.tempo = tempo;

            const progresso = carregarProgresso();
            progresso.niveis[nivelAtual] =
                progresso.niveis[nivelAtual] || { fases: {} };
            progresso.niveis[nivelAtual].fases[faseAtual] = dadosFase;
            salvarProgresso(progresso);

            progressoBancoNiveis[faseAtual] = {
                concluida: true,
                melhorResultado: melhorResultado,
                questaoAtual: TOTAL_QUESTOES,
                respostas: { ...respostas }
            };
        }

        mostrarResultado(
            acertos,
            erros,
            porcentagem,
            tempo,
            melhorResultado
        );

        atualizarListaFases();

    } catch (erro) {

        respostaEmEnvio = false;
        if (botaoProxima) botaoProxima.disabled = false;

        const areaErro = document.getElementById("explicacaoErro");
        if (areaErro) {
            areaErro.textContent =
                revisaoAtual
                    ? "Não foi possível concluir a revisão no servidor. Suas respostas continuam salvas. Tente novamente."
                    : "Não foi possível concluir a fase no servidor. Suas respostas continuam salvas. Tente novamente.";
            areaErro.hidden = false;
        }

        console.error("Erro ao concluir fase no Supabase:", erro);
    }
}


// =====================================================
// MOSTRAR RESULTADO DA FASE
// =====================================================

function mostrarResultado(
    acertos,
    erros,
    porcentagem,
    tempo,
    melhorResultado
) {

    const areaQuestao =
        document.getElementById(
            "areaQuestao"
        );


    const resultado =
        document.getElementById(
            "resultadoFase"
        );


    if (!resultado) {

        return;

    }

    const tituloResultado = resultado.querySelector(".resultado-titulo");
    if (tituloResultado) {
        tituloResultado.textContent = modoRevisao
            ? "Revisão concluída!"
            : "Fase concluída!";
    }


    // =================================================
    // ESCONDER QUESTÕES
    // =================================================

    if (areaQuestao) {

        areaQuestao.hidden =
            true;

    }


    // =================================================
    // MOSTRAR RESULTADO
    // =================================================

    resultado.hidden =
        false;


    // =================================================
    // ELEMENTOS DO RESULTADO
    // =================================================

    const elementoAcertos =
        document.getElementById(
            "resultadoAcertos"
        );


    const elementoErros =
        document.getElementById(
            "resultadoErros"
        );


    const elementoPorcentagem =
        document.getElementById(
            "resultadoPorcentagem"
        );


    const elementoTempo =
        document.getElementById(
            "resultadoTempo"
        );


    const elementoMelhor =
        document.getElementById(
            "melhorResultado"
        );


    // =================================================
    // PREENCHER RESULTADO
    // =================================================

    if (
        elementoAcertos
    ) {

        elementoAcertos.textContent =
            acertos;

    }


    if (
        elementoErros
    ) {

        elementoErros.textContent =
            erros;

    }


    if (
        elementoPorcentagem
    ) {

        elementoPorcentagem.textContent =
            Math.round(
                porcentagem
            ) + "%";

    }


    if (
        elementoTempo
    ) {

        elementoTempo.textContent =
            formatarTempo(
                tempo
            );

    }


    if (
        elementoMelhor
    ) {

        elementoMelhor.textContent =
            melhorResultado +
            "/" +
            TOTAL_QUESTOES;

    }


    // =================================================
    // MENSAGEM DE DESEMPENHO
    // =================================================

    const mensagem =
        document.getElementById(
            "resultadoMensagem"
        );


    if (mensagem) {

        if (
            acertos === TOTAL_QUESTOES
        ) {

            mensagem.textContent =
                "Perfeito! Você acertou tudo!";

        } else if (
            acertos >= 8
        ) {

            mensagem.textContent =
                "Excelente resultado!";

        } else if (
            acertos >= 6
        ) {

            mensagem.textContent =
                "Muito bem! Continue praticando.";

        } else {

            mensagem.textContent =
                "Continue estudando e tente novamente.";

        }

    }


    // =================================================
    // BOTÃO PRÓXIMA FASE
    // =================================================

    const proximaFase =
        document.getElementById(
            "proximaFase"
        );


    if (proximaFase) {

        if (
            faseAtual < TOTAL_FASES
        ) {

            proximaFase.style.display =
                "flex";

        } else {

            proximaFase.style.display =
                "none";

        }

    }


    // Atualizar ícones.

    if (
        typeof atualizarIcones === "function"
    ) {

        atualizarIcones();

    }

}


// =====================================================
// FORMATAR TEMPO
// =====================================================

function formatarTempo(
    segundos
) {

    const minutos =
        Math.floor(
            segundos / 60
        );


    const segundosRestantes =
        segundos % 60;


    return (
        String(minutos)
            .padStart(2, "0") +
        ":" +
        String(segundosRestantes)
            .padStart(2, "0")
    );

}


// =====================================================
// REFAZER FASE
// =====================================================

async function refazerFase() {

    if (respostaEmEnvio) return;

    const botaoRevisar = document.getElementById("refazerFase");
    if (botaoRevisar) botaoRevisar.disabled = true;

    try {

        const { data, error } = await supabaseClient.rpc(
            "start_level_phase_review",
            {
                p_level_number: nivelAtual,
                p_phase_number: faseAtual
            }
        );

        if (error) throw error;

        if (!data || !data.session_id) {
            throw new Error("O banco não retornou uma sessão de revisão válida.");
        }

        idSessaoRevisao = data.session_id;
        modoRevisao = true;
        faseFinalizada = false;
        respostaEmEnvio = false;

        respostas = {};
        alternativasSelecionadas = {};

        Object.entries(data.answers || {}).forEach(function([numero, resposta]) {
            respostas[Number(numero)] = resposta.is_correct === true;
            alternativasSelecionadas[Number(numero)] =
                resposta.selected_option_id;
        });

        questaoAtual = 1;
        inicioFase = Date.now();

        const areaQuestao = document.getElementById("areaQuestao");
        const resultado = document.getElementById("resultadoFase");
        const areaErro = document.getElementById("explicacaoErro");

        if (areaQuestao) areaQuestao.hidden = false;
        if (resultado) resultado.hidden = true;
        if (areaErro) {
            areaErro.hidden = true;
            areaErro.textContent = "";
        }

        atualizarInformacoesFase();
        mostrarQuestao();

    } catch (erro) {

        const areaErro = document.getElementById("explicacaoErro");
        if (areaErro) {
            areaErro.textContent =
                "Não foi possível iniciar a revisão. Tente novamente.";
            areaErro.hidden = false;
        }

        console.error("Erro ao iniciar revisão da fase:", erro);

    } finally {

        if (botaoRevisar) botaoRevisar.disabled = false;

    }
}


// =====================================================
// PRÓXIMA FASE
// =====================================================

function irParaProximaFase() {

    if (
        faseAtual >= TOTAL_FASES
    ) {

        return;

    }


    const proximaFase =
        faseAtual + 1;


    // A próxima fase só pode ser acessada
    // se a fase atual estiver concluída.

    if (
        !faseEstaDesbloqueada(
            proximaFase
        )
    ) {

        return;

    }


    iniciarFase(
        proximaFase
    );

}


// =====================================================
// MENU LATERAL DE FASES
// =====================================================

function abrirMenuFases() {

    const menu =
        document.getElementById(
            "menuFases"
        );


    const fundo =
        document.getElementById(
            "fundoMenuFases"
        );


    if (menu) {

        menu.classList.add(
            "aberto"
        );

    }


    if (fundo) {

        fundo.classList.add(
            "ativo"
        );

    }

}


// =====================================================
// FECHAR MENU DE FASES
// =====================================================

function fecharMenuFases() {

    const menu =
        document.getElementById(
            "menuFases"
        );


    const fundo =
        document.getElementById(
            "fundoMenuFases"
        );


    if (menu) {

        menu.classList.remove(
            "aberto"
        );

    }


    if (fundo) {

        fundo.classList.remove(
            "ativo"
        );

    }

}


// =====================================================
// CRIAR LISTA DE FASES
// =====================================================

function atualizarListaFases() {

    const lista =
        document.getElementById(
            "listaFases"
        );


    if (!lista) {

        return;

    }


    lista.innerHTML =
        "";


    for (
        let numero = 1;
        numero <= TOTAL_FASES;
        numero++
    ) {

        const dadosFase =
            fasesNivel2[numero];


        if (!dadosFase) {

            continue;

        }


        const desbloqueada =
            faseEstaDesbloqueada(
                numero
            );


        const concluida =
            faseFoiConcluida(
                numero
            );


        const item =
            document.createElement(
                "button"
            );


        item.type =
            "button";


        item.className =
            "fase-menu-item";


        // =================================================
        // ESTADO DA FASE
        // =================================================

        if (concluida) {

            item.classList.add(
                "concluida"
            );

        }


        if (
            numero === faseAtual
        ) {

            item.classList.add(
                "atual"
            );

        }


        if (!desbloqueada) {

            item.classList.add(
                "bloqueada"
            );

        }


        // =================================================
        // ÍCONE
        // =================================================

        let icone =
            "lock";


        if (concluida) {

            icone =
                "circle-check";

        } else if (
            desbloqueada
        ) {

            icone =
                "play";

        }


        // =================================================
        // TEXTO DA FASE
        // =================================================

        item.innerHTML = `

            <span class="icone-fase">

                <i data-lucide="${icone}"></i>

            </span>


            <span class="informacao-fase-menu">

                <strong>
                    Fase ${numero}
                </strong>

                <span>
                    ${dadosFase.nome}
                    • ${dadosFase.dificuldade}
                </span>

            </span>


            <span class="estado-fase">

                <i data-lucide="${
                    concluida
                        ? "check"
                        : desbloqueada
                            ? "chevron-right"
                            : "lock"
                }"></i>

            </span>

        `;


        // =================================================
        // CLIQUE NA FASE
        // =================================================

        if (desbloqueada) {

            item.addEventListener(
                "click",
                function() {

                    iniciarFase(
                        numero
                    );


                    fecharMenuFases();


                    atualizarListaFases();

                }
            );

        } else {

            item.disabled =
                true;

        }


        lista.appendChild(
            item
        );

    }


    // =================================================
    // ATUALIZAR LUCIDE
    // =================================================

    if (
        typeof atualizarIcones === "function"
    ) {

        atualizarIcones();

    }

}


// =====================================================
// CONFIGURAR EVENTOS DA PÁGINA
// =====================================================

function configurarEventosNivel2() {

    // =================================================
    // BOTÃO QUESTÃO ANTERIOR
    // =================================================

    const botaoAnterior =
        document.getElementById(
            "questaoAnterior"
        );


    if (botaoAnterior) {

        botaoAnterior.addEventListener(
            "click",
            voltarQuestao
        );

    }


    // =================================================
    // BOTÃO PRÓXIMA QUESTÃO
    // =================================================

    const botaoProxima =
        document.getElementById(
            "proximaQuestao"
        );


    if (botaoProxima) {

        botaoProxima.addEventListener(
            "click",
            avancarQuestao
        );

    }


    // =================================================
    // BOTÃO REFAZER FASE
    // =================================================

    const botaoRefazer =
        document.getElementById(
            "refazerFase"
        );


    if (botaoRefazer) {

        botaoRefazer.addEventListener(
            "click",
            refazerFase
        );

    }


    // =================================================
    // BOTÃO PRÓXIMA FASE
    // =================================================

    const botaoProximaFase =
        document.getElementById(
            "proximaFase"
        );


    if (botaoProximaFase) {

        botaoProximaFase.addEventListener(
            "click",
            irParaProximaFase
        );

    }


    // =================================================
    // BOTÃO MENU DE FASES
    // =================================================

    const botaoMenu =
        document.getElementById(
            "botaoMenuFases"
        );


    if (botaoMenu) {

        botaoMenu.addEventListener(
            "click",
            function() {

                abrirMenuFases();

                atualizarListaFases();

            }
        );

    }


    // =================================================
    // BOTÃO FECHAR MENU
    // =================================================

    const botaoFechar =
        document.getElementById(
            "fecharMenuFases"
        );


    if (botaoFechar) {

        botaoFechar.addEventListener(
            "click",
            fecharMenuFases
        );

    }


    // =================================================
    // FUNDO DO MENU
    // =================================================

    const fundo =
        document.getElementById(
            "fundoMenuFases"
        );


    if (fundo) {

        fundo.addEventListener(
            "click",
            fecharMenuFases
        );

    }

}


// =====================================================
// RETOMAR REVISÃO NÃO CONCLUÍDA
// =====================================================

async function restaurarRevisaoAtivaNivel2() {

    const { data: revisao, error: erroRevisao } = await supabaseClient
        .from("user_phase_review_sessions")
        .select("id, phase_number, review_number, completed")
        .eq("level_number", 2)
        .eq("completed", false)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (erroRevisao) throw erroRevisao;
    if (!revisao) return false;

    const { data: respostasRevisao, error: erroRespostas } =
        await supabaseClient
            .from("user_phase_review_answers")
            .select("question_number, selected_option_id, is_correct")
            .eq("session_id", revisao.id)
            .order("question_number", { ascending: true });

    if (erroRespostas) throw erroRespostas;

    faseAtual = Number(revisao.phase_number);
    registrarAcessoFaseNivel2(faseAtual);
    idSessaoRevisao = revisao.id;
    modoRevisao = true;
    faseFinalizada = false;
    respostaEmEnvio = false;

    respostas = {};
    alternativasSelecionadas = {};

    (respostasRevisao || []).forEach(function(resposta) {
        const numero = Number(resposta.question_number);
        respostas[numero] = resposta.is_correct === true;
        alternativasSelecionadas[numero] = resposta.selected_option_id;
    });

    const primeiraNaoRespondida = Array.from(
        { length: TOTAL_QUESTOES },
        function(_, indice) { return indice + 1; }
    ).find(function(numero) {
        return respostas[numero] === undefined;
    });

    questaoAtual = primeiraNaoRespondida || TOTAL_QUESTOES;
    inicioFase = Date.now();

    const areaQuestao = document.getElementById("areaQuestao");
    const resultado = document.getElementById("resultadoFase");
    const areaErro = document.getElementById("explicacaoErro");

    if (areaQuestao) areaQuestao.hidden = false;
    if (resultado) resultado.hidden = true;
    if (areaErro) {
        areaErro.hidden = true;
        areaErro.textContent = "";
    }

    atualizarInformacoesFase();
    mostrarQuestao();

    return true;
}


// =====================================================
// INICIALIZAÇÃO DO NÍVEL 1
// =====================================================

async function inicializarNivel2() {

    configurarEventosNivel2();

    try {
        await carregarProgressoBancoNivel2();
    } catch (erro) {

        console.error(
            "Não foi possível carregar o progresso do Nível 2:",
            erro
        );

        const textoQuestao = document.getElementById("textoQuestao");
        const alternativas = document.getElementById("alternativas");

        if (textoQuestao) {
            textoQuestao.textContent =
                "Não foi possível carregar seu progresso. Atualize a página ou entre novamente.";
        }

        if (alternativas) alternativas.innerHTML = "";
        return;
    }

    atualizarListaFases();

    let revisaoRestaurada = false;

    try {
        revisaoRestaurada = await restaurarRevisaoAtivaNivel2();
    } catch (erro) {
        console.error("Não foi possível retomar a revisão em andamento:", erro);
    }

    if (!revisaoRestaurada) {
        iniciarFase(faseAtual);
    }

    if (typeof atualizarIcones === "function") {
        atualizarIcones();
    }
}


// =====================================================
// INICIAR QUANDO O HTML ESTIVER PRONTO
// =====================================================

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarNivel2
    );

} else {

    inicializarNivel2();

}   
