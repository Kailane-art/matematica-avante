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
// CONFIGURAÇÃO DAS FASES — NÍVEL 3
// =====================================================
//
// Todas as fases seguem a mesma progressão:
// questões 1 a 5: dificuldade média;
// questões 6 a 10: dificuldade difícil.
// =====================================================

const fasesNivel3 = {
    "1": {
        "nome": "Radicais, frações e números reais",
        "descricao": "Expressões com radicais, expoentes racionais e operações avançadas.",
        "dificuldade": "Médio a Difícil"
    },
    "2": {
        "nome": "Funções e modelagem",
        "descricao": "Funções, crescimento exponencial, escalas e análise de relações.",
        "dificuldade": "Médio a Difícil"
    },
    "3": {
        "nome": "Sistemas e equações",
        "descricao": "Sistemas algébricos, equações quadráticas e relações entre raízes.",
        "dificuldade": "Médio a Difícil"
    },
    "4": {
        "nome": "Geometria plana avançada",
        "descricao": "Polígonos, setores circulares, áreas e relações métricas.",
        "dificuldade": "Médio a Difícil"
    },
    "5": {
        "nome": "Funções quadráticas e sequências",
        "descricao": "Parábolas, logaritmos, progressões e composição de funções.",
        "dificuldade": "Médio a Difícil"
    },
    "6": {
        "nome": "Álgebra avançada",
        "descricao": "Equações, inequações, sistemas e problemas algébricos integrados.",
        "dificuldade": "Médio a Difícil"
    },
    "7": {
        "nome": "Geometria espacial",
        "descricao": "Volumes, áreas, diagonais e relações em sólidos geométricos.",
        "dificuldade": "Médio a Difícil"
    },
    "8": {
        "nome": "Potências e radicais avançados",
        "descricao": "Expoentes racionais, notação científica e racionalização.",
        "dificuldade": "Médio a Difícil"
    },
    "9": {
        "nome": "Probabilidade e análise combinatória",
        "descricao": "Eventos, contagem, permutações e análise estatística.",
        "dificuldade": "Médio a Difícil"
    },
    "10": {
        "nome": "Desafio integrado",
        "descricao": "Problemas complexos reunindo diferentes áreas da matemática.",
        "dificuldade": "Médio a Difícil"
    }
};


// =====================================================
// BANCO DE QUESTÕES — NÍVEL 3
// =====================================================
//
// Cada fase terá exatamente 10 questões: 5 médias seguidas de 5 difíceis.
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

const questoesNivel3 ={
    "1": [
        {
            "pergunta": "Resolva: (3/4 ÷ 9/10) × 2/5.",
            "alternativas": [
                {
                    "texto": "1/3"
                },
                {
                    "texto": "2/3"
                },
                {
                    "texto": "3/5"
                },
                {
                    "texto": "5/6"
                }
            ],
            "explicacao": "Dividir por 9/10 equivale a multiplicar por 10/9: 3/4 × 10/9 × 2/5 = 1/3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Simplifique a expressão: 2√50 − √8 + √18.",
            "alternativas": [
                {
                    "texto": "11√2"
                },
                {
                    "texto": "9√2"
                },
                {
                    "texto": "10√2"
                },
                {
                    "texto": "8√2"
                }
            ],
            "explicacao": "√50=5√2, √8=2√2 e √18=3√2. Então 10√2−2√2+3√2=11√2.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Qual é o valor de (0,00036 × 5 × 10⁶) em notação decimal?",
            "alternativas": [
                {
                    "texto": "1.800"
                },
                {
                    "texto": "180"
                },
                {
                    "texto": "18.000"
                },
                {
                    "texto": "0,18"
                }
            ],
            "explicacao": "0,00036 × 5.000.000 = 1.800.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Se x = 2/3, calcule (3x − 1)² + 2x.",
            "alternativas": [
                {
                    "texto": "7/3"
                },
                {
                    "texto": "13/3"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "19/3"
                }
            ],
            "explicacao": "3x−1=1; então 1²+4/3=7/3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um valor aumenta 20% e depois diminui 20%. Qual é a variação total?",
            "alternativas": [
                {
                    "texto": "Redução de 4%"
                },
                {
                    "texto": "Nenhuma variação"
                },
                {
                    "texto": "Aumento de 4%"
                },
                {
                    "texto": "Redução de 2%"
                }
            ],
            "explicacao": "100 × 1,2 × 0,8 = 96. O valor final é 4% menor.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva: (7/8 − 1/3) ÷ (5/6 − 1/4).",
            "alternativas": [
                {
                    "texto": "3/4"
                },
                {
                    "texto": "7/12"
                },
                {
                    "texto": "13/14"
                },
                {
                    "texto": "9/14"
                }
            ],
            "explicacao": "No numerador: 7/8−1/3=13/24. No denominador: 5/6−1/4=7/12. Então (13/24)÷(7/12)=13/14.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Calcule: 2⁻² + 3⁻² − 1/6.",
            "alternativas": [
                {
                    "texto": "7/36"
                },
                {
                    "texto": "5/36"
                },
                {
                    "texto": "1/3"
                },
                {
                    "texto": "1/4"
                }
            ],
            "explicacao": "2⁻²=1/4 e 3⁻²=1/9. Com denominador 36: 9/36+4/36−6/36=7/36.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A razão entre a e b é 3:5. Sabendo que 2a+b=88, determine b−a.",
            "alternativas": [
                {
                    "texto": "16"
                },
                {
                    "texto": "12"
                },
                {
                    "texto": "20"
                },
                {
                    "texto": "24"
                }
            ],
            "explicacao": "Se a=3k e b=5k, então 2a+b=6k+5k=88. Logo k=8, a=24 e b=40; portanto b−a=16.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se 3/5 de um número é igual a 2/3 de 45, quanto vale 4/7 desse número?",
            "alternativas": [
                {
                    "texto": "200/7"
                },
                {
                    "texto": "20"
                },
                {
                    "texto": "40/7"
                },
                {
                    "texto": "100/7"
                }
            ],
            "explicacao": "2/3 de 45 é 30. Então 3N/5=30, de onde N=50. Por fim, 4/7 de 50 é 200/7.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Calcule: (√5 + √2)² − (√5 − √2)².",
            "alternativas": [
                {
                    "texto": "4√10"
                },
                {
                    "texto": "2√10"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "14"
                }
            ],
            "explicacao": "Usando (a+b)²−(a−b)²=4ab, com a=√5 e b=√2, o resultado é 4√10.",
            "dificuldade": "Difícil"
        }
    ],
    "2": [
        {
            "pergunta": "Uma função afim passa por (−2, 7) e (4, −5). Qual é sua lei?",
            "alternativas": [
                {
                    "texto": "f(x)=−2x+3"
                },
                {
                    "texto": "f(x)=2x+3"
                },
                {
                    "texto": "f(x)=−3x+1"
                },
                {
                    "texto": "f(x)=−2x−3"
                }
            ],
            "explicacao": "O coeficiente angular é (−5−7)/(4+2)=−2. Usando (−2,7), o termo independente é 3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Uma população de 800 bactérias dobra a cada 3 horas. Quantas haverá após 12 horas?",
            "alternativas": [
                {
                    "texto": "12.800"
                },
                {
                    "texto": "6.400"
                },
                {
                    "texto": "9.600"
                },
                {
                    "texto": "25.600"
                }
            ],
            "explicacao": "São 4 períodos de duplicação: 800×2⁴=12.800.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva a proporção (x−2)/5 = (x+4)/8.",
            "alternativas": [
                {
                    "texto": "12"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "18"
                }
            ],
            "explicacao": "8x−16=5x+20; 3x=36; x=12.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um produto de R$ 250 recebe descontos sucessivos de 10% e 12%. Qual o preço final?",
            "alternativas": [
                {
                    "texto": "R$ 198,00"
                },
                {
                    "texto": "R$ 195,00"
                },
                {
                    "texto": "R$ 200,00"
                },
                {
                    "texto": "R$ 202,50"
                }
            ],
            "explicacao": "250×0,9×0,88=198.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Em uma PA, a₃=11 e a₈=31. Qual é a soma dos 12 primeiros termos?",
            "alternativas": [
                {
                    "texto": "300"
                },
                {
                    "texto": "276"
                },
                {
                    "texto": "288"
                },
                {
                    "texto": "312"
                }
            ],
            "explicacao": "r=4, a₁=3 e S₁₂=12(3+47)/2=300.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Duas máquinas iguais produzem 180 peças em 4 horas. Mantendo o ritmo, quantas peças 5 máquinas produzirão em 6 horas?",
            "alternativas": [
                {
                    "texto": "675 peças"
                },
                {
                    "texto": "540 peças"
                },
                {
                    "texto": "720 peças"
                },
                {
                    "texto": "900 peças"
                }
            ],
            "explicacao": "Cada máquina produz 180÷(2×4)=22,5 peças por hora. Em 5 máquinas durante 6 horas: 22,5×5×6=675 peças.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se f(x)=2x²−3x+4, calcule f(−3)+f(2).",
            "alternativas": [
                {
                    "texto": "37"
                },
                {
                    "texto": "31"
                },
                {
                    "texto": "35"
                },
                {
                    "texto": "39"
                }
            ],
            "explicacao": "f(−3)=31 e f(2)=6. A soma é 31+6=37.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A média de seis números é 17. Quatro deles somam 54. Os dois números restantes diferem em 5. Qual é o maior?",
            "alternativas": [
                {
                    "texto": "26,5"
                },
                {
                    "texto": "24,5"
                },
                {
                    "texto": "25"
                },
                {
                    "texto": "27,5"
                }
            ],
            "explicacao": "A soma total é 6×17=102. Os dois restantes somam 48. Se o maior é M, M+(M−5)=48; portanto M=26,5.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Em um mapa de escala 1:250.000, a distância em linha reta entre duas cidades é 6,4 cm. Se o trajeto rodoviário é 20% maior, qual é sua extensão?",
            "alternativas": [
                {
                    "texto": "19,2 km"
                },
                {
                    "texto": "16 km"
                },
                {
                    "texto": "18 km"
                },
                {
                    "texto": "20 km"
                }
            ],
            "explicacao": "A distância em linha reta é 6,4×250.000=1.600.000 cm=16 km. O trajeto é 20% maior: 16×1,2=19,2 km.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "35% de A equivale a 50% de B. Se B=84, quanto vale A+B?",
            "alternativas": [
                {
                    "texto": "204"
                },
                {
                    "texto": "184"
                },
                {
                    "texto": "194"
                },
                {
                    "texto": "214"
                }
            ],
            "explicacao": "50% de 84 é 42. Assim, 0,35A=42, logo A=120. Portanto A+B=204.",
            "dificuldade": "Difícil"
        }
    ],
    "3": [
        {
            "pergunta": "Resolva o sistema: 2x+3y=13 e 4x−y=5.",
            "alternativas": [
                {
                    "texto": "x=2 e y=3"
                },
                {
                    "texto": "x=1 e y=4"
                },
                {
                    "texto": "x=3 e y=2"
                },
                {
                    "texto": "x=2 e y=4"
                }
            ],
            "explicacao": "Da segunda, y=4x−5. Substituindo: 14x=28, x=2 e y=3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Quais são as raízes de x²−7x+10=0?",
            "alternativas": [
                {
                    "texto": "2 e 5"
                },
                {
                    "texto": "−2 e −5"
                },
                {
                    "texto": "1 e 10"
                },
                {
                    "texto": "−2 e 5"
                }
            ],
            "explicacao": "(x−2)(x−5)=0.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva 2x²−8x=0.",
            "alternativas": [
                {
                    "texto": "x=0 ou x=4"
                },
                {
                    "texto": "x=−4 ou x=0"
                },
                {
                    "texto": "x=2 ou x=4"
                },
                {
                    "texto": "x=−2 ou x=4"
                }
            ],
            "explicacao": "2x(x−4)=0.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Se x+y=9 e xy=14, quanto vale x²+y²?",
            "alternativas": [
                {
                    "texto": "53"
                },
                {
                    "texto": "67"
                },
                {
                    "texto": "49"
                },
                {
                    "texto": "39"
                }
            ],
            "explicacao": "(x+y)²−2xy=81−28=53.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A soma de dois números é 13 e a diferença entre eles é 5. Qual é o produto?",
            "alternativas": [
                {
                    "texto": "36"
                },
                {
                    "texto": "40"
                },
                {
                    "texto": "42"
                },
                {
                    "texto": "48"
                }
            ],
            "explicacao": "Os números são 9 e 4; produto 36.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva: (2x−1)/3 + (x+4)/2 = 7.",
            "alternativas": [
                {
                    "texto": "x=32/7"
                },
                {
                    "texto": "x=26/5"
                },
                {
                    "texto": "x=5"
                },
                {
                    "texto": "x=6"
                }
            ],
            "explicacao": "Multiplicando por 6: 4x−2+3x+12=42. Então 7x=32 e x=32/7.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Para que valor de k a equação 2x²−12x+k=0 possui raízes reais iguais?",
            "alternativas": [
                {
                    "texto": "k=18"
                },
                {
                    "texto": "k=12"
                },
                {
                    "texto": "k=9"
                },
                {
                    "texto": "k=24"
                }
            ],
            "explicacao": "Raízes iguais exigem Δ=0: (−12)²−4×2×k=0. Logo 144−8k=0 e k=18.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva o sistema 2x+3y=19 e 5x−y=8. Depois, determine 2x−y.",
            "alternativas": [
                {
                    "texto": "7/17"
                },
                {
                    "texto": "2/5"
                },
                {
                    "texto": "1"
                },
                {
                    "texto": "7"
                }
            ],
            "explicacao": "Da segunda equação, y=5x−8. Substituindo: 17x=43, então x=43/17 e y=79/17. Assim, 2x−y=7/17.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A equação x²+px+25=0 possui raízes reais iguais e sua raiz dupla é negativa. Determine p e a raiz.",
            "alternativas": [
                {
                    "texto": "p=10 e x=−5"
                },
                {
                    "texto": "p=−10 e x=5"
                },
                {
                    "texto": "p=5 e x=−10"
                },
                {
                    "texto": "p=−5 e x=10"
                }
            ],
            "explicacao": "Δ=0 implica p²−100=0, então p=±10. A raiz dupla é −p/2; para ser negativa, p=10 e a raiz é −5.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva o sistema x²+y²=25 e x+y=7, considerando x e y positivos.",
            "alternativas": [
                {
                    "texto": "x=3 e y=4 (ou vice-versa)"
                },
                {
                    "texto": "x=2 e y=5"
                },
                {
                    "texto": "x=1 e y=6"
                },
                {
                    "texto": "x=5 e y=5"
                }
            ],
            "explicacao": "(x+y)²=x²+y²+2xy; 49=25+2xy, xy=12. As raízes são 3 e 4.",
            "dificuldade": "Difícil"
        }
    ],
    "4": [
        {
            "pergunta": "Um triângulo tem base de 14 cm e altura relativa a essa base de 12 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "84 cm²"
                },
                {
                    "texto": "72 cm²"
                },
                {
                    "texto": "96 cm²"
                },
                {
                    "texto": "168 cm²"
                }
            ],
            "explicacao": "A área é base×altura÷2: 14×12÷2=84 cm².",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A área de um setor circular de raio 6 cm e ângulo central 120° é:",
            "alternativas": [
                {
                    "texto": "12π cm²"
                },
                {
                    "texto": "18π cm²"
                },
                {
                    "texto": "6π cm²"
                },
                {
                    "texto": "24π cm²"
                }
            ],
            "explicacao": "(120/360)×π×6²=12π.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um polígono regular tem ângulo interno de 150°. Quantos lados possui?",
            "alternativas": [
                {
                    "texto": "12"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "15"
                },
                {
                    "texto": "18"
                }
            ],
            "explicacao": "Ângulo externo=30°; 360/30=12.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A diagonal de um retângulo mede 25 cm e um lado mede 7 cm. Qual é o outro lado?",
            "alternativas": [
                {
                    "texto": "24 cm"
                },
                {
                    "texto": "18 cm"
                },
                {
                    "texto": "20 cm"
                },
                {
                    "texto": "26 cm"
                }
            ],
            "explicacao": "Pelo teorema de Pitágoras: √(25²−7²)=24.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um trapézio tem bases 18 cm e 10 cm e altura 7 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "98 cm²"
                },
                {
                    "texto": "84 cm²"
                },
                {
                    "texto": "112 cm²"
                },
                {
                    "texto": "196 cm²"
                }
            ],
            "explicacao": "A=(18+10)×7/2=98.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um losango tem área de 120 cm². Suas diagonais diferem em 8 cm. Quanto mede a diagonal maior?",
            "alternativas": [
                {
                    "texto": "20 cm"
                },
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "18 cm"
                },
                {
                    "texto": "24 cm"
                }
            ],
            "explicacao": "A área dá D×d=240. Como D=d+8, temos d(d+8)=240. O par positivo é 12 e 20; a diagonal maior mede 20 cm.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um setor circular tem ângulo central de 150°. O círculo completo tem comprimento 12π cm. Qual é a área do setor?",
            "alternativas": [
                {
                    "texto": "15π cm²"
                },
                {
                    "texto": "12π cm²"
                },
                {
                    "texto": "18π cm²"
                },
                {
                    "texto": "20π cm²"
                }
            ],
            "explicacao": "De 2πr=12π, temos r=6. A área do setor é 150/360×π×6²=15π cm².",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A soma dos ângulos internos de um polígono convexo é 1.440°. Quantas diagonais ele possui?",
            "alternativas": [
                {
                    "texto": "35"
                },
                {
                    "texto": "27"
                },
                {
                    "texto": "30"
                },
                {
                    "texto": "40"
                }
            ],
            "explicacao": "(n−2)×180=1.440 resulta em n=10 lados. O número de diagonais é n(n−3)/2=10×7/2=35.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um triângulo retângulo tem catetos de 9 cm e 12 cm. Determine o raio da circunferência inscrita e a área do triângulo.",
            "alternativas": [
                {
                    "texto": "3 cm e 54 cm²"
                },
                {
                    "texto": "3 cm e 48 cm²"
                },
                {
                    "texto": "4 cm e 54 cm²"
                },
                {
                    "texto": "4 cm e 60 cm²"
                }
            ],
            "explicacao": "A hipotenusa é 15 cm. O raio inscrito é (9+12−15)/2=3 cm. A área é 9×12/2=54 cm².",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um hexágono regular tem lado 4 cm. Determine seu apótema e sua área.",
            "alternativas": [
                {
                    "texto": "2√3 cm e 24√3 cm²"
                },
                {
                    "texto": "4√3 cm e 24√3 cm²"
                },
                {
                    "texto": "2√3 cm e 12√3 cm²"
                },
                {
                    "texto": "3√3 cm e 18√3 cm²"
                }
            ],
            "explicacao": "O apótema é √(4²−2²)=2√3 cm. A área é perímetro×apótema/2=(24×2√3)/2=24√3 cm².",
            "dificuldade": "Difícil"
        }
    ],
    "5": [
        {
            "pergunta": "Uma função quadrática tem raízes 2 e 6 e coeficiente líder igual a 1. Quanto vale f(0)?",
            "alternativas": [
                {
                    "texto": "12"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "16"
                }
            ],
            "explicacao": "Com raízes 2 e 6, f(x)=(x−2)(x−6). Assim, f(0)=(−2)(−6)=12.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Qual é o vértice da parábola f(x)=x²−6x+5?",
            "alternativas": [
                {
                    "texto": "(3, −4)"
                },
                {
                    "texto": "(−3, 4)"
                },
                {
                    "texto": "(3, 4)"
                },
                {
                    "texto": "(−3, −4)"
                }
            ],
            "explicacao": "xv=−b/2a=3 e f(3)=−4.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Uma sequência geométrica tem a₁=3 e razão 2. Qual é a soma dos 8 primeiros termos?",
            "alternativas": [
                {
                    "texto": "765"
                },
                {
                    "texto": "768"
                },
                {
                    "texto": "381"
                },
                {
                    "texto": "759"
                }
            ],
            "explicacao": "S₈=3(2⁸−1)/(2−1)=765.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Se log₂(x−1)=3, qual é x?",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "7"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "10"
                }
            ],
            "explicacao": "x−1=2³=8, então x=9.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva 5^(x−1)=125.",
            "alternativas": [
                {
                    "texto": "x=4"
                },
                {
                    "texto": "x=3"
                },
                {
                    "texto": "x=5"
                },
                {
                    "texto": "x=6"
                }
            ],
            "explicacao": "125=5³; x−1=3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A média ponderada das notas 6 (peso 2), 8 (peso 3) e x (peso 5) é 7,8. Qual é x?",
            "alternativas": [
                {
                    "texto": "8,4"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "7,8"
                }
            ],
            "explicacao": "(6×2+8×3+5x)/10=7,8. Então 36+5x=78, logo x=8,4.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma função é definida por f(x)=|3x−9|+2. Para quais valores de x temos f(x)=14?",
            "alternativas": [
                {
                    "texto": "x=−1 ou x=7"
                },
                {
                    "texto": "x=−2 ou x=6"
                },
                {
                    "texto": "x=1 ou x=7"
                },
                {
                    "texto": "x=−1 ou x=5"
                }
            ],
            "explicacao": "|3x−9|+2=14 implica |3x−9|=12. Então 3x−9=12 ou −12, resultando em x=7 ou x=−1.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se f(x)=x²−2x+1 e g(x)=3x−2, quanto vale f(g(−1))?",
            "alternativas": [
                {
                    "texto": "36"
                },
                {
                    "texto": "25"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "49"
                }
            ],
            "explicacao": "g(−1)=−5. Depois f(−5)=25+10+1=36.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma PA tem a₃=8 e a₉=26. Qual é a soma dos 15 primeiros termos?",
            "alternativas": [
                {
                    "texto": "345"
                },
                {
                    "texto": "315"
                },
                {
                    "texto": "330"
                },
                {
                    "texto": "360"
                }
            ],
            "explicacao": "r=(26−8)/6=3. Logo a₁=2 e a₁₅=44. A soma é 15(2+44)/2=345.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A reta y=−4x+20 intercepta os dois eixos coordenados. Qual é a distância entre os pontos de interseção?",
            "alternativas": [
                {
                    "texto": "5√17"
                },
                {
                    "texto": "5√13"
                },
                {
                    "texto": "4√17"
                },
                {
                    "texto": "20"
                }
            ],
            "explicacao": "Os interceptos são (0,20) e (5,0). A distância é √(5²+20²)=√425=5√17.",
            "dificuldade": "Difícil"
        }
    ],
    "6": [
        {
            "pergunta": "Resolva o sistema: 3x+2y=16 e 5x−y=7.",
            "alternativas": [
                {
                    "texto": "x=30/13 e y=59/13"
                },
                {
                    "texto": "x=3 e y=2"
                },
                {
                    "texto": "x=1 e y=6"
                },
                {
                    "texto": "x=4 e y=2"
                }
            ],
            "explicacao": "Da segunda y=5x−7; substituindo: 13x=30, x=30/13, y=59/13.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Quais são as soluções de x²−4x−12=0?",
            "alternativas": [
                {
                    "texto": "x=6 ou x=−2"
                },
                {
                    "texto": "x=4 ou x=−3"
                },
                {
                    "texto": "x=−6 ou x=2"
                },
                {
                    "texto": "x=3 ou x=−4"
                }
            ],
            "explicacao": "(x−6)(x+2)=0.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um objeto é lançado e sua altura é h(t)=−5t²+20t+1. Em que instante atinge a altura máxima?",
            "alternativas": [
                {
                    "texto": "2 s"
                },
                {
                    "texto": "1 s"
                },
                {
                    "texto": "3 s"
                },
                {
                    "texto": "4 s"
                }
            ],
            "explicacao": "O vértice ocorre em t=−20/(2×−5)=2.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A soma das raízes de 2x²−5x−3=0 é:",
            "alternativas": [
                {
                    "texto": "5/2"
                },
                {
                    "texto": "−5/2"
                },
                {
                    "texto": "3/2"
                },
                {
                    "texto": "−3/2"
                }
            ],
            "explicacao": "Pelas relações de Girard, soma=−b/a=5/2.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Se x²+y²=34 e xy=15, qual é |x+y|?",
            "alternativas": [
                {
                    "texto": "8"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "6"
                },
                {
                    "texto": "9"
                }
            ],
            "explicacao": "(x+y)²=34+30=64, logo |x+y|=8.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A equação x²−(m+1)x+2m−3=0 possui uma raiz igual a 3. Determine m e a outra raiz.",
            "alternativas": [
                {
                    "texto": "m=3 e a outra raiz é 1"
                },
                {
                    "texto": "m=2 e a outra raiz é 3"
                },
                {
                    "texto": "m=4 e a outra raiz é 2"
                },
                {
                    "texto": "m=5 e a outra raiz é −1"
                }
            ],
            "explicacao": "Substituindo x=3: 9−3(m+1)+2m−3=0, então m=3. A equação fica x²−4x+3=0, cujas raízes são 3 e 1.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva: 3/(x−2) − 2/(x+1) = 1, considerando x≠2 e x≠−1.",
            "alternativas": [
                {
                    "texto": "x=1−√10 ou x=1+√10"
                },
                {
                    "texto": "x=−1 ou x=2"
                },
                {
                    "texto": "x=−√10 ou x=√10"
                },
                {
                    "texto": "x=1 ou x=10"
                }
            ],
            "explicacao": "Multiplicando pelos denominadores: 3(x+1)−2(x−2)=(x−2)(x+1). Simplificando, x²−2x−9=0. As soluções são x=1±√10; ambas respeitam as restrições.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se α e β são raízes de x²−8x+12=0, quanto vale α³+β³?",
            "alternativas": [
                {
                    "texto": "224"
                },
                {
                    "texto": "208"
                },
                {
                    "texto": "192"
                },
                {
                    "texto": "256"
                }
            ],
            "explicacao": "α+β=8 e αβ=12. Então α³+β³=(α+β)³−3αβ(α+β)=512−288=224.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva a equação |2x−5|=x+1.",
            "alternativas": [
                {
                    "texto": "x=4/3 ou x=6"
                },
                {
                    "texto": "x=−1 ou x=6"
                },
                {
                    "texto": "x=4 ou x=6"
                },
                {
                    "texto": "x=1/3 ou x=5"
                }
            ],
            "explicacao": "Caso 1: 2x−5=x+1, então x=6. Caso 2: −2x+5=x+1, então 4=3x e x=4/3. As duas soluções são 4/3 e 6.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um retângulo tem perímetro 34 cm e área 60 cm². Qual é a medida de sua diagonal?",
            "alternativas": [
                {
                    "texto": "13 cm"
                },
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "10 cm"
                },
                {
                    "texto": "15 cm"
                }
            ],
            "explicacao": "Os lados somam 17 e multiplicam 60, portanto são 5 e 12. A diagonal é √(5²+12²)=13 cm.",
            "dificuldade": "Difícil"
        }
    ],
    "7": [
        {
            "pergunta": "Um cone tem raio 3 cm e altura 4 cm. Qual é seu volume?",
            "alternativas": [
                {
                    "texto": "12π cm³"
                },
                {
                    "texto": "9π cm³"
                },
                {
                    "texto": "16π cm³"
                },
                {
                    "texto": "36π cm³"
                }
            ],
            "explicacao": "V=πr²h/3=π×9×4/3=12π.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A área total de um cilindro de raio 2 cm e altura 5 cm é:",
            "alternativas": [
                {
                    "texto": "28π cm²"
                },
                {
                    "texto": "20π cm²"
                },
                {
                    "texto": "24π cm²"
                },
                {
                    "texto": "32π cm²"
                }
            ],
            "explicacao": "At=2πr²+2πrh=8π+20π=28π.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Uma esfera tem raio 3 cm. Seu volume é:",
            "alternativas": [
                {
                    "texto": "36π cm³"
                },
                {
                    "texto": "27π cm³"
                },
                {
                    "texto": "18π cm³"
                },
                {
                    "texto": "54π cm³"
                }
            ],
            "explicacao": "V=4πr³/3=4π×27/3=36π.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um prisma reto tem base triangular de área 15 cm² e altura 8 cm. Seu volume é:",
            "alternativas": [
                {
                    "texto": "120 cm³"
                },
                {
                    "texto": "90 cm³"
                },
                {
                    "texto": "100 cm³"
                },
                {
                    "texto": "150 cm³"
                }
            ],
            "explicacao": "V=área da base×altura=15×8=120.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A diagonal espacial de um cubo de aresta 6 cm mede:",
            "alternativas": [
                {
                    "texto": "6√3 cm"
                },
                {
                    "texto": "6√2 cm"
                },
                {
                    "texto": "12√2 cm"
                },
                {
                    "texto": "9√3 cm"
                }
            ],
            "explicacao": "Diagonal espacial=a√3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Uma pirâmide de base quadrada com lado 10 cm tem volume 400 cm³. Qual é a altura inclinada de uma face lateral, medida do ponto médio da base até o vértice?",
            "alternativas": [
                {
                    "texto": "13 cm"
                },
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "10 cm"
                },
                {
                    "texto": "15 cm"
                }
            ],
            "explicacao": "400=100h/3, então h=12 cm. A altura inclinada é √(12²+5²)=13 cm.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um cilindro tem volume 200π cm³ e raio 5 cm. Qual é sua área total?",
            "alternativas": [
                {
                    "texto": "130π cm²"
                },
                {
                    "texto": "100π cm²"
                },
                {
                    "texto": "120π cm²"
                },
                {
                    "texto": "150π cm²"
                }
            ],
            "explicacao": "200π=π×5²×h, então h=8 cm. A área total é 2π×5²+2π×5×8=130π cm².",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma caixa retangular tem dimensões 6 cm, 8 cm e x cm. Se sua diagonal espacial mede 26 cm, quanto mede x?",
            "alternativas": [
                {
                    "texto": "24 cm"
                },
                {
                    "texto": "20 cm"
                },
                {
                    "texto": "22 cm"
                },
                {
                    "texto": "18 cm"
                }
            ],
            "explicacao": "6²+8²+x²=26², então x²=576 e x=24 cm.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um tronco de cone tem raios 2 cm e 5 cm e altura 4 cm. Qual é o volume?",
            "alternativas": [
                {
                    "texto": "52π cm³"
                },
                {
                    "texto": "36π cm³"
                },
                {
                    "texto": "24π cm³"
                },
                {
                    "texto": "32π cm³"
                }
            ],
            "explicacao": "V=πh(R²+Rr+r²)/3=4π(25+10+4)/3=52π.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um poliedro convexo possui 4 faces triangulares e 8 faces quadrangulares. Quantos vértices ele possui?",
            "alternativas": [
                {
                    "texto": "12"
                },
                {
                    "texto": "14"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "18"
                }
            ],
            "explicacao": "A contagem pelas faces dá 4×3+8×4=44 incidências de arestas. Cada aresta pertence a duas faces, então E=22. Pela relação de Euler, V−22+12=2; V=12.",
            "dificuldade": "Difícil"
        }
    ],
    "8": [
        {
            "pergunta": "Simplifique: (2³ × 2⁻⁵) ÷ 2⁻⁴.",
            "alternativas": [
                {
                    "texto": "4"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "16"
                }
            ],
            "explicacao": "Somando expoentes: 2^(3−5+4)=2²=4.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Qual é o valor de √(5+2√6) + √(5−2√6)?",
            "alternativas": [
                {
                    "texto": "2√3"
                },
                {
                    "texto": "√6"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "2√2"
                }
            ],
            "explicacao": "As raízes são √3+√2 e √3−√2; a soma é 2√3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva: 3^(2x−1)=27.",
            "alternativas": [
                {
                    "texto": "x=2"
                },
                {
                    "texto": "x=1"
                },
                {
                    "texto": "x=3"
                },
                {
                    "texto": "x=4"
                }
            ],
            "explicacao": "27=3³; 2x−1=3; x=2.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Escreva 0,00000072 em notação científica.",
            "alternativas": [
                {
                    "texto": "7,2×10⁻⁷"
                },
                {
                    "texto": "7,2×10⁻⁶"
                },
                {
                    "texto": "72×10⁻⁷"
                },
                {
                    "texto": "0,72×10⁻⁷"
                }
            ],
            "explicacao": "A vírgula desloca 7 casas para a direita: expoente −7.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Se ⁴√x=3, qual é x?",
            "alternativas": [
                {
                    "texto": "81"
                },
                {
                    "texto": "27"
                },
                {
                    "texto": "64"
                },
                {
                    "texto": "12"
                }
            ],
            "explicacao": "x=3⁴=81.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Calcule: (√7+√3)² − (√7−√3)².",
            "alternativas": [
                {
                    "texto": "4√21"
                },
                {
                    "texto": "2√21"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "20"
                }
            ],
            "explicacao": "Usando (a+b)²−(a−b)²=4ab, obtemos 4×√7×√3=4√21.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Qual é o valor de 81^(3/4)?",
            "alternativas": [
                {
                    "texto": "27"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "18"
                },
                {
                    "texto": "36"
                }
            ],
            "explicacao": "A raiz quarta de 81 é 3. Elevando ao cubo: 3³=27.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Racionalize a expressão 5/(√7−√2).",
            "alternativas": [
                {
                    "texto": "√7+√2"
                },
                {
                    "texto": "√7−√2"
                },
                {
                    "texto": "5√7+5√2"
                },
                {
                    "texto": "(√7+√2)/5"
                }
            ],
            "explicacao": "Multiplicando pelo conjugado: 5(√7+√2)/(7−2)=√7+√2.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva a equação 4^(x−1)=8^(x/2).",
            "alternativas": [
                {
                    "texto": "x=4"
                },
                {
                    "texto": "x=2"
                },
                {
                    "texto": "x=3"
                },
                {
                    "texto": "x=6"
                }
            ],
            "explicacao": "Na base 2: 2^(2x−2)=2^(3x/2). Igualando expoentes, x=4.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Calcule: [81^(3/4) × 32^(2/5)] ÷ √4.",
            "alternativas": [
                {
                    "texto": "54"
                },
                {
                    "texto": "27"
                },
                {
                    "texto": "36"
                },
                {
                    "texto": "64"
                }
            ],
            "explicacao": "81^(3/4)=27, 32^(2/5)=4 e √4=2. Portanto (27×4)/2=54.",
            "dificuldade": "Difícil"
        }
    ],
    "9": [
        {
            "pergunta": "Em um grupo de 40 pessoas, 24 gostam de A, 18 de B e 10 gostam de ambos. Qual a probabilidade de alguém gostar de A ou B?",
            "alternativas": [
                {
                    "texto": "80%"
                },
                {
                    "texto": "60%"
                },
                {
                    "texto": "70%"
                },
                {
                    "texto": "85%"
                }
            ],
            "explicacao": "União=24+18−10=32; 32/40=80%.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Dois dados honestos são lançados. Qual a probabilidade de a soma ser 9?",
            "alternativas": [
                {
                    "texto": "1/9"
                },
                {
                    "texto": "1/6"
                },
                {
                    "texto": "1/12"
                },
                {
                    "texto": "1/18"
                }
            ],
            "explicacao": "Há 4 casos favoráveis em 36: (3,6),(4,5),(5,4),(6,3).",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Uma urna tem 5 bolas vermelhas, 3 azuis e 2 verdes. Retiram-se duas sem reposição. Probabilidade de ambas serem vermelhas:",
            "alternativas": [
                {
                    "texto": "2/9"
                },
                {
                    "texto": "1/5"
                },
                {
                    "texto": "1/4"
                },
                {
                    "texto": "5/18"
                }
            ],
            "explicacao": "(5/10)×(4/9)=2/9.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "As notas 4, 6, 6, 8 e 11 têm qual mediana e qual média?",
            "alternativas": [
                {
                    "texto": "Mediana 6 e média 7"
                },
                {
                    "texto": "Mediana 7 e média 6"
                },
                {
                    "texto": "Mediana 6 e média 6"
                },
                {
                    "texto": "Mediana 8 e média 7"
                }
            ],
            "explicacao": "A mediana é o terceiro valor (6); média=35/5=7.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Se P(A)=0,4, P(B)=0,5 e A e B são independentes, P(A∩B) é:",
            "alternativas": [
                {
                    "texto": "0,2"
                },
                {
                    "texto": "0,9"
                },
                {
                    "texto": "0,45"
                },
                {
                    "texto": "0,1"
                }
            ],
            "explicacao": "Para eventos independentes, 0,4×0,5=0,2.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Uma senha tem 4 algarismos distintos. O primeiro não pode ser zero e o último deve ser par. Quantas senhas podem ser formadas?",
            "alternativas": [
                {
                    "texto": "2.296"
                },
                {
                    "texto": "2.016"
                },
                {
                    "texto": "2.520"
                },
                {
                    "texto": "1.792"
                }
            ],
            "explicacao": "Se o último for zero, há 9×8×7=504 senhas. Se for 2, 4, 6 ou 8, há 4×8×8×7=1.792. Total: 2.296.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Seis pessoas vão ocupar seis cadeiras em fila. De quantas maneiras isso pode ocorrer se duas pessoas específicas devem ficar lado a lado?",
            "alternativas": [
                {
                    "texto": "240"
                },
                {
                    "texto": "120"
                },
                {
                    "texto": "360"
                },
                {
                    "texto": "480"
                }
            ],
            "explicacao": "Considere as duas pessoas como um bloco: há 5! maneiras de organizar o bloco com as outras quatro pessoas e 2 ordens internas. Total: 5!×2=240.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Em uma turma, 60% são meninas e 40% são meninos. Se 25% das meninas e 10% dos meninos usam óculos, qual porcentagem da turma usa óculos?",
            "alternativas": [
                {
                    "texto": "19%"
                },
                {
                    "texto": "15%"
                },
                {
                    "texto": "20%"
                },
                {
                    "texto": "25%"
                }
            ],
            "explicacao": "Meninas com óculos: 60%×25%=15%. Meninos com óculos: 40%×10%=4%. Total: 19%.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma variável assume os valores 2, 4 e 6 com frequências 2, x e 3. Se a média é 4,2, qual é x?",
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
                    "texto": "3"
                }
            ],
            "explicacao": "(2×2+4x+6×3)/(2+x+3)=4,2. Então 22+4x=21+4,2x e x=5.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma moeda honesta é lançada 5 vezes. Qual é a probabilidade de sair exatamente 3 caras?",
            "alternativas": [
                {
                    "texto": "5/16"
                },
                {
                    "texto": "3/16"
                },
                {
                    "texto": "1/4"
                },
                {
                    "texto": "3/8"
                }
            ],
            "explicacao": "Há C(5,3)=10 sequências com exatamente 3 caras entre 2⁵=32 resultados. A probabilidade é 10/32=5/16.",
            "dificuldade": "Difícil"
        }
    ],
    "10": [
        {
            "pergunta": "Uma função f satisfaz f(x+1)=2f(x)+3 e f(0)=1. Qual é f(2)?",
            "alternativas": [
                {
                    "texto": "13"
                },
                {
                    "texto": "11"
                },
                {
                    "texto": "15"
                },
                {
                    "texto": "17"
                }
            ],
            "explicacao": "f(1)=5 e f(2)=13.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva: (x²−9)/(x−3)=8, com x≠3.",
            "alternativas": [
                {
                    "texto": "x=5"
                },
                {
                    "texto": "x=−5"
                },
                {
                    "texto": "x=8"
                },
                {
                    "texto": "x=11"
                }
            ],
            "explicacao": "Para x≠3, a expressão é x+3; x+3=8, x=5.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Um investimento cresce 10% ao mês, em juros compostos. Qual fator multiplica o capital após 3 meses?",
            "alternativas": [
                {
                    "texto": "1,331"
                },
                {
                    "texto": "1,300"
                },
                {
                    "texto": "1,333"
                },
                {
                    "texto": "1,210"
                }
            ],
            "explicacao": "1,1³=1,331.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Se sen(θ)=3/5 e θ está no 1º quadrante, quanto vale cos(θ)?",
            "alternativas": [
                {
                    "texto": "4/5"
                },
                {
                    "texto": "3/4"
                },
                {
                    "texto": "5/4"
                },
                {
                    "texto": "2/5"
                }
            ],
            "explicacao": "Pela identidade fundamental, cosθ=√(1−9/25)=4/5.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "A reta y=mx+2 passa por (3,11). Qual é m?",
            "alternativas": [
                {
                    "texto": "3"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "11=3m+2; m=3.",
            "dificuldade": "Médio"
        },
        {
            "pergunta": "Resolva a inequação −3(2x−1)+4 ≤ 2(x+5)−5.",
            "alternativas": [
                {
                    "texto": "x≥1/4"
                },
                {
                    "texto": "x≤1/4"
                },
                {
                    "texto": "x≥−1/4"
                },
                {
                    "texto": "x≤−1/4"
                }
            ],
            "explicacao": "−6x+7≤2x+5. Então 2≤8x e x≥1/4.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma PG tem a₂=12 e a₅=324, com razão positiva. Qual é a soma dos 6 primeiros termos?",
            "alternativas": [
                {
                    "texto": "1.456"
                },
                {
                    "texto": "1.092"
                },
                {
                    "texto": "1.212"
                },
                {
                    "texto": "1.620"
                }
            ],
            "explicacao": "r³=324/12=27, então r=3 e a₁=4. S₆=4(3⁶−1)/(3−1)=1.456.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva: log₃(x)+log₃(x−2)=2, sabendo que x>2.",
            "alternativas": [
                {
                    "texto": "1+√10"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "1−√10"
                },
                {
                    "texto": "2+√3"
                }
            ],
            "explicacao": "log₃[x(x−2)]=2, então x²−2x=9. As soluções são 1±√10; como x>2, x=1+√10.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A circunferência tem equação x²+y²−4x+2y−20=0. Determine seu centro, raio e área.",
            "alternativas": [
                {
                    "texto": "Centro (2,−1), raio 5 e área 25π"
                },
                {
                    "texto": "Centro (−2,1), raio 5 e área 25π"
                },
                {
                    "texto": "Centro (2,−1), raio 25 e área 5π"
                },
                {
                    "texto": "Centro (−2,−1), raio 5 e área 10π"
                }
            ],
            "explicacao": "Completando quadrados: (x−2)²+(y+1)²=25. O centro é (2,−1), o raio é 5 e a área é 25π.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A área de um quadrado aumenta 44%. Em seguida, seu lado diminui 10%. Em relação à área inicial, qual é a variação percentual final?",
            "alternativas": [
                {
                    "texto": "Aumento de 16,64%"
                },
                {
                    "texto": "Aumento de 8%"
                },
                {
                    "texto": "Aumento de 20%"
                },
                {
                    "texto": "Redução de 16,64%"
                }
            ],
            "explicacao": "O aumento de 44% na área multiplica o lado por √1,44=1,2. Depois, o lado é multiplicado por 0,9. O fator final do lado é 1,08; para a área, 1,08²=1,1664, ou aumento de 16,64%.",
            "dificuldade": "Difícil"
        }
    ]
};


// =====================================================
// ESTADO ATUAL
// =====================================================

let nivelAtual = 3;

let faseAtual = 1;

let questaoAtual = 1;

let respostas = {};

let alternativasSelecionadas = {};

let progressoBancoNiveis = {};

let tentativasBancoNivel3 = {};

let inicioFase = null;

let faseFinalizada = false;

let respostaEmEnvio = false;

let modoRevisao = false;

let idSessaoRevisao = null;


// =====================================================
// CARREGAR PROGRESSO DO NÍVEL 3 NO SUPABASE
// =====================================================

async function carregarProgressoBancoNivel3() {

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
                .eq("level_number", 3),

            supabaseClient
                .from("user_question_attempts")
                .select("question_id, selected_option_id, is_correct")
                .eq("activity_type", "nivel")
                .like("question_id", "nivel:3:fase:%"),

            supabaseClient
                .from("user_progress")
                .select("total_xp")
                .maybeSingle()

        ]);

    if (resultadoFases.error) throw resultadoFases.error;
    if (resultadoTentativas.error) throw resultadoTentativas.error;
    if (resultadoXP.error) throw resultadoXP.error;

    progressoBancoNiveis = {};
    tentativasBancoNivel3 = {};

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
            /^nivel:3:fase:(\d+):questao:(\d+)$/
        );

        if (!identificacao) return;

        const numeroFase = Number(identificacao[1]);
        const numeroQuestao = Number(identificacao[2]);

        if (!tentativasBancoNivel3[numeroFase]) {
            tentativasBancoNivel3[numeroFase] = {};
        }

        tentativasBancoNivel3[numeroFase][numeroQuestao] = {
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
        questoesNivel3[numeroFase] || []
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
        fasesNivel3[faseAtual];


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
                    "nivel:3:fase:" + faseAtual + ":questao:" + questaoAtual;

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



function registrarAcessoFaseNivel3(numeroFase) {

    if (typeof registrarUltimaAtividade !== "function") return;

    const dadosFase = fasesNivel3[numeroFase];

    const nomeFase = dadosFase
        ? dadosFase.nome
        : "Praticando";

    registrarUltimaAtividade(
        "nivel3_fase_" + numeroFase,
        "Nível 3 • Fase " + numeroFase + ": " + nomeFase,
        "nivel3.html"
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

    registrarAcessoFaseNivel3(numeroFase);

    const dadosFase = obterDadosFase(nivelAtual, faseAtual);
    const dadosBanco = progressoBancoNiveis[faseAtual] || {};

    questaoAtual = Math.min(
        Math.max(Number(dadosBanco.questaoAtual) || 1, 1),
        TOTAL_QUESTOES
    );

    respostas = { ...(dadosBanco.respostas || {}) };
    alternativasSelecionadas = {};

    const tentativas = tentativasBancoNivel3[faseAtual] || {};

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
            fasesNivel3[numero];


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

function configurarEventosNivel3() {

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

async function restaurarRevisaoAtivaNivel3() {

    const { data: revisao, error: erroRevisao } = await supabaseClient
        .from("user_phase_review_sessions")
        .select("id, phase_number, review_number, completed")
        .eq("level_number", 3)
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
    registrarAcessoFaseNivel3(faseAtual);
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
// INICIALIZAÇÃO DO NÍVEL 3
// =====================================================

async function inicializarNivel3() {

    const acessoNivel = await verificarAcessoNivelProgressivo(3);

    if (!acessoNivel.permitido) {
        mostrarNotificacaoNivelBloqueado(3, acessoNivel.motivo);
        return;
    }

    configurarEventosNivel3();

    try {
        await carregarProgressoBancoNivel3();
    } catch (erro) {

        console.error(
            "Não foi possível carregar o progresso do Nível 3:",
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
        revisaoRestaurada = await restaurarRevisaoAtivaNivel3();
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
        inicializarNivel3
    );

} else {

    inicializarNivel3();

}   
