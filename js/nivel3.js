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

const fasesNivel3 = {
    "1": {
        "nome": "Radicais, frações e números reais",
        "descricao": "Expressões com radicais, expoentes racionais e operações avançadas.",
        "dificuldade": "Difícil"
    },
    "2": {
        "nome": "Funções e modelagem",
        "descricao": "Funções, crescimento exponencial, escalas e análise de relações.",
        "dificuldade": "Difícil"
    },
    "3": {
        "nome": "Sistemas e equações",
        "descricao": "Sistemas algébricos, equações quadráticas e relações entre raízes.",
        "dificuldade": "Difícil"
    },
    "4": {
        "nome": "Geometria plana avançada",
        "descricao": "Polígonos, setores circulares, áreas e relações métricas.",
        "dificuldade": "Difícil"
    },
    "5": {
        "nome": "Funções quadráticas e sequências",
        "descricao": "Parábolas, logaritmos, progressões e composição de funções.",
        "dificuldade": "Difícil"
    },
    "6": {
        "nome": "Álgebra avançada",
        "descricao": "Equações, inequações, sistemas e problemas algébricos integrados.",
        "dificuldade": "Difícil"
    },
    "7": {
        "nome": "Geometria espacial",
        "descricao": "Volumes, áreas, diagonais e relações em sólidos geométricos.",
        "dificuldade": "Difícil"
    },
    "8": {
        "nome": "Potências e radicais avançados",
        "descricao": "Expoentes racionais, notação científica e racionalização.",
        "dificuldade": "Difícil"
    },
    "9": {
        "nome": "Probabilidade e análise combinatória",
        "descricao": "Eventos, contagem, permutações e análise estatística.",
        "dificuldade": "Difícil"
    },
    "10": {
        "nome": "Desafio integrado",
        "descricao": "Problemas complexos reunindo diferentes áreas da matemática.",
        "dificuldade": "Difícil"
    }
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

const questoesNivel3 = {
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
            "explicacao": "Dividir por 9/10 equivale a multiplicar por 10/9: 3/4 × 10/9 × 2/5 = 1/3."
        },
        {
            "pergunta": "Simplifique a expressão: 2√50 − √8 + √18.",
            "alternativas": [
                {
                    "texto": "10√2"
                },
                {
                    "texto": "9√2"
                },
                {
                    "texto": "11√2"
                },
                {
                    "texto": "8√2"
                }
            ],
            "explicacao": "√50=5√2, √8=2√2 e √18=3√2. Então 10√2−2√2+3√2=11√2."
        },
        {
            "pergunta": "Qual é o valor de (0,00036 × 5 × 10⁶) em notação decimal?",
            "alternativas": [
                {
                    "texto": "11√2"
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
            "explicacao": "0,00036 × 5.000.000 = 1.800."
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
            "explicacao": "3x−1=1; então 1²+4/3=7/3."
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
            "explicacao": "100 × 1,2 × 0,8 = 96. O valor final é 4% menor."
        },
        {
            "pergunta": "Resolva: (5/6 − 1/4) ÷ (7/9).",
            "alternativas": [
                {
                    "texto": "21/28"
                },
                {
                    "texto": "7/12"
                },
                {
                    "texto": "3/4"
                },
                {
                    "texto": "9/14"
                }
            ],
            "explicacao": "5/6−1/4=7/12; (7/12)÷(7/9)=3/4."
        },
        {
            "pergunta": "Qual é o resultado de 2⁻³ + 4⁻¹?",
            "alternativas": [
                {
                    "texto": "3/8"
                },
                {
                    "texto": "1/8"
                },
                {
                    "texto": "5/8"
                },
                {
                    "texto": "3/4"
                }
            ],
            "explicacao": "2⁻³=1/8 e 4⁻¹=1/4; soma=3/8."
        },
        {
            "pergunta": "A razão entre a e b é 5:8 e a+b=78. Qual é b−a?",
            "alternativas": [
                {
                    "texto": "18"
                },
                {
                    "texto": "12"
                },
                {
                    "texto": "24"
                },
                {
                    "texto": "26"
                }
            ],
            "explicacao": "Cada parte vale 78/13=6. Logo a=30, b=48 e b−a=18."
        },
        {
            "pergunta": "Se 3/5 de um número é 42, qual é o número?",
            "alternativas": [
                {
                    "texto": "70"
                },
                {
                    "texto": "63"
                },
                {
                    "texto": "75"
                },
                {
                    "texto": "84"
                }
            ],
            "explicacao": "N×3/5=42, então N=42×5/3=70."
        },
        {
            "pergunta": "Calcule: (√3 + √12)².",
            "alternativas": [
                {
                    "texto": "27"
                },
                {
                    "texto": "21"
                },
                {
                    "texto": "18"
                },
                {
                    "texto": "36"
                }
            ],
            "explicacao": "√12=2√3. Assim (3√3)²=27."
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
            "explicacao": "O coeficiente angular é (−5−7)/(4+2)=−2. Usando (−2,7), o termo independente é 3."
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
            "explicacao": "São 4 períodos de duplicação: 800×2⁴=12.800."
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
            "explicacao": "8x−16=5x+20; 3x=36; x=12."
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
            "explicacao": "250×0,9×0,88=198."
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
            "explicacao": "r=4, a₁=3 e S₁₂=12(3+47)/2=300."
        },
        {
            "pergunta": "Uma máquina produz 180 peças em 4 horas. Mantendo o ritmo, quanto tempo leva para produzir 585 peças?",
            "alternativas": [
                {
                    "texto": "13 horas"
                },
                {
                    "texto": "11 horas"
                },
                {
                    "texto": "12 horas"
                },
                {
                    "texto": "14 horas"
                }
            ],
            "explicacao": "A taxa é 45 peças/hora; 585/45=13."
        },
        {
            "pergunta": "Se f(x)=3x²−2x+1, quanto vale f(−2)?",
            "alternativas": [
                {
                    "texto": "17"
                },
                {
                    "texto": "13"
                },
                {
                    "texto": "15"
                },
                {
                    "texto": "19"
                }
            ],
            "explicacao": "3×4+4+1=17."
        },
        {
            "pergunta": "A média de cinco números é 18. Quatro deles somam 67. Qual é o quinto?",
            "alternativas": [
                {
                    "texto": "23"
                },
                {
                    "texto": "21"
                },
                {
                    "texto": "25"
                },
                {
                    "texto": "27"
                }
            ],
            "explicacao": "A soma total é 5×18=90; 90−67=23."
        },
        {
            "pergunta": "Uma escala 1:250.000 representa uma distância de 7,2 cm. Qual a distância real?",
            "alternativas": [
                {
                    "texto": "18 km"
                },
                {
                    "texto": "1,8 km"
                },
                {
                    "texto": "180 km"
                },
                {
                    "texto": "28,8 km"
                }
            ],
            "explicacao": "7,2×250.000 cm=1.800.000 cm=18 km."
        },
        {
            "pergunta": "Se 40% de A equivale a 60% de B e B=80, determine A.",
            "alternativas": [
                {
                    "texto": "120"
                },
                {
                    "texto": "100"
                },
                {
                    "texto": "110"
                },
                {
                    "texto": "140"
                }
            ],
            "explicacao": "0,4A=48; A=120."
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
            "explicacao": "Da segunda, y=4x−5. Substituindo: 14x=28, x=2 e y=3."
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
            "explicacao": "(x−2)(x−5)=0."
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
            "explicacao": "2x(x−4)=0."
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
            "explicacao": "(x+y)²−2xy=81−28=53."
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
            "explicacao": "Os números são 9 e 4; produto 36."
        },
        {
            "pergunta": "Resolva: (x−1)/3 + (x+2)/2 = 5.",
            "alternativas": [
                {
                    "texto": "x=7"
                },
                {
                    "texto": "x=5"
                },
                {
                    "texto": "x=6"
                },
                {
                    "texto": "x=8"
                }
            ],
            "explicacao": "Multiplicando por 6: 2x−2+3x+6=30; 5x=26; x=26/5."
        },
        {
            "pergunta": "Para quais valores de k a equação x²−6x+k=0 tem raízes reais iguais?",
            "alternativas": [
                {
                    "texto": "k=9"
                },
                {
                    "texto": "k=6"
                },
                {
                    "texto": "k=12"
                },
                {
                    "texto": "k=18"
                }
            ],
            "explicacao": "Discriminante nulo: 36−4k=0; k=9."
        },
        {
            "pergunta": "Se 3x−2y=4 e x+y=6, determine x−y.",
            "alternativas": [
                {
                    "texto": "2/5"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "−4"
                },
                {
                    "texto": "4"
                }
            ],
            "explicacao": "y=6−x; 5x=16, x=16/5, y=14/5; diferença 2/5."
        },
        {
            "pergunta": "A equação x²+px+16=0 possui raízes reais iguais. Qual é um possível p?",
            "alternativas": [
                {
                    "texto": "8 ou −8"
                },
                {
                    "texto": "4 ou −4"
                },
                {
                    "texto": "16 ou −16"
                },
                {
                    "texto": "6 ou −6"
                }
            ],
            "explicacao": "Discriminante p²−64=0, então p=±8."
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
            "explicacao": "(x+y)²=x²+y²+2xy; 49=25+2xy, xy=12. As raízes são 3 e 4."
        }
    ],
    "4": [
        {
            "pergunta": "Um triângulo tem lados 13, 14 e 15. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "84"
                },
                {
                    "texto": "90"
                },
                {
                    "texto": "78"
                },
                {
                    "texto": "96"
                }
            ],
            "explicacao": "Pelo semiperímetro 21, Heron: √(21×8×7×6)=84."
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
            "explicacao": "(120/360)×π×6²=12π."
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
            "explicacao": "Ângulo externo=30°; 360/30=12."
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
            "explicacao": "Pelo teorema de Pitágoras: √(25²−7²)=24."
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
            "explicacao": "A=(18+10)×7/2=98."
        },
        {
            "pergunta": "A área de um losango é 120 cm² e uma diagonal mede 10 cm. A outra diagonal mede:",
            "alternativas": [
                {
                    "texto": "24 cm"
                },
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "20 cm"
                },
                {
                    "texto": "30 cm"
                }
            ],
            "explicacao": "A=Dd/2; 120=10d/2, d=24."
        },
        {
            "pergunta": "Um círculo tem comprimento 10π cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "25π cm²"
                },
                {
                    "texto": "10π cm²"
                },
                {
                    "texto": "20π cm²"
                },
                {
                    "texto": "100π cm²"
                }
            ],
            "explicacao": "2πr=10π, r=5; área=25π."
        },
        {
            "pergunta": "A soma dos ângulos internos de um polígono convexo é 1.260°. Quantos lados ele tem?",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "10"
                },
                {
                    "texto": "11"
                }
            ],
            "explicacao": "(n−2)180=1260; n−2=7; n=9."
        },
        {
            "pergunta": "Um triângulo retângulo tem catetos 9 e 12. Qual é o raio da circunferência inscrita?",
            "alternativas": [
                {
                    "texto": "3"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "Hipotenusa=15; raio=(9+12−15)/2=3."
        },
        {
            "pergunta": "Um hexágono regular tem lado 4 cm. Qual é sua área?",
            "alternativas": [
                {
                    "texto": "24√3 cm²"
                },
                {
                    "texto": "12√3 cm²"
                },
                {
                    "texto": "16√3 cm²"
                },
                {
                    "texto": "32√3 cm²"
                }
            ],
            "explicacao": "São 6 triângulos equiláteros: 6×(4²√3/4)=24√3."
        }
    ],
    "5": [
        {
            "pergunta": "Uma função quadrática tem raízes 2 e 6 e passa pelo ponto (0,−24). Qual é f(x)?",
            "alternativas": [
                {
                    "texto": "f(x)=−2x²+16x−24"
                },
                {
                    "texto": "f(x)=x²−8x+12"
                },
                {
                    "texto": "f(x)=−x²+8x−12"
                },
                {
                    "texto": "f(x)=2x²−8x+24"
                }
            ],
            "explicacao": "f(x)=a(x−2)(x−6); f(0)=12a=−24, logo a=−2."
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
            "explicacao": "xv=−b/2a=3 e f(3)=−4."
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
            "explicacao": "S₈=3(2⁸−1)/(2−1)=765."
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
            "explicacao": "x−1=2³=8, então x=9."
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
            "explicacao": "125=5³; x−1=3."
        },
        {
            "pergunta": "A média ponderada de 6 (peso 2), 8 (peso 3) e 10 (peso 5) é:",
            "alternativas": [
                {
                    "texto": "8,6"
                },
                {
                    "texto": "8,0"
                },
                {
                    "texto": "8,4"
                },
                {
                    "texto": "9,0"
                }
            ],
            "explicacao": "(6×2+8×3+10×5)/10=8,6."
        },
        {
            "pergunta": "Uma função é definida por f(x)=|2x−6|. Para quais x ela vale 10?",
            "alternativas": [
                {
                    "texto": "x=−2 ou x=8"
                },
                {
                    "texto": "x=−5 ou x=5"
                },
                {
                    "texto": "x=−2 ou x=6"
                },
                {
                    "texto": "x=2 ou x=8"
                }
            ],
            "explicacao": "|2x−6|=10; 2x−6=±10; x=8 ou −2."
        },
        {
            "pergunta": "Se f(x)=x²+1 e g(x)=2x−3, quanto vale (f∘g)(2)?",
            "alternativas": [
                {
                    "texto": "2"
                },
                {
                    "texto": "1"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "g(2)=1 e f(1)=2."
        },
        {
            "pergunta": "Uma PA tem a₄=17 e a₁₀=41. Qual é a razão?",
            "alternativas": [
                {
                    "texto": "4"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "6r=41−17=24; r=4."
        },
        {
            "pergunta": "O gráfico de y=−3x+12 intercepta o eixo x em:",
            "alternativas": [
                {
                    "texto": "x=4"
                },
                {
                    "texto": "x=3"
                },
                {
                    "texto": "x=−4"
                },
                {
                    "texto": "x=12"
                }
            ],
            "explicacao": "0=−3x+12; x=4."
        }
    ],
    "6": [
        {
            "pergunta": "Resolva o sistema: 3x+2y=16 e 5x−y=7.",
            "alternativas": [
                {
                    "texto": "x=2 e y=5"
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
            "explicacao": "Da segunda y=5x−7; substituindo: 13x=30, x=30/13, y=59/13."
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
            "explicacao": "(x−6)(x+2)=0."
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
            "explicacao": "O vértice ocorre em t=−20/(2×−5)=2."
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
            "explicacao": "Pelas relações de Girard, soma=−b/a=5/2."
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
            "explicacao": "(x+y)²=34+30=64, logo |x+y|=8."
        },
        {
            "pergunta": "A equação x²−(m+1)x+m=0 possui uma raiz igual a 3. Qual é m?",
            "alternativas": [
                {
                    "texto": "m=3 ou m=−2"
                },
                {
                    "texto": "m=2 ou m=−3"
                },
                {
                    "texto": "m=1 ou m=−4"
                },
                {
                    "texto": "m=4 ou m=−1"
                }
            ],
            "explicacao": "Substituindo 3: 9−3m−3+m=0; 6−2m=0; m=3."
        },
        {
            "pergunta": "Resolva: 2/(x−1)=3/(x+2).",
            "alternativas": [
                {
                    "texto": "x=7"
                },
                {
                    "texto": "x=5"
                },
                {
                    "texto": "x=−7"
                },
                {
                    "texto": "x=4"
                }
            ],
            "explicacao": "2x+4=3x−3; x=7."
        },
        {
            "pergunta": "Se α e β são raízes de x²−8x+12=0, quanto vale α²+β²?",
            "alternativas": [
                {
                    "texto": "40"
                },
                {
                    "texto": "52"
                },
                {
                    "texto": "36"
                },
                {
                    "texto": "28"
                }
            ],
            "explicacao": "(α+β)²−2αβ=64−24=40."
        },
        {
            "pergunta": "Qual é o conjunto solução de |x−4|=3?",
            "alternativas": [
                {
                    "texto": "{1, 7}"
                },
                {
                    "texto": "{−1, 7}"
                },
                {
                    "texto": "{1, 4}"
                },
                {
                    "texto": "{3, 7}"
                }
            ],
            "explicacao": "x−4=3 ou x−4=−3."
        },
        {
            "pergunta": "Um retângulo tem perímetro 34 cm e área 60 cm². Quais são suas dimensões?",
            "alternativas": [
                {
                    "texto": "5 cm e 12 cm"
                },
                {
                    "texto": "6 cm e 10 cm"
                },
                {
                    "texto": "4 cm e 13 cm"
                },
                {
                    "texto": "3 cm e 14 cm"
                }
            ],
            "explicacao": "Lados somam 17 e multiplicam 60: 5 e 12."
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
            "explicacao": "V=πr²h/3=π×9×4/3=12π."
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
            "explicacao": "At=2πr²+2πrh=8π+20π=28π."
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
            "explicacao": "V=4πr³/3=4π×27/3=36π."
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
            "explicacao": "V=área da base×altura=15×8=120."
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
            "explicacao": "Diagonal espacial=a√3."
        },
        {
            "pergunta": "Uma pirâmide tem base quadrada de lado 10 cm e altura 9 cm. Qual é o volume?",
            "alternativas": [
                {
                    "texto": "300 cm³"
                },
                {
                    "texto": "900 cm³"
                },
                {
                    "texto": "270 cm³"
                },
                {
                    "texto": "150 cm³"
                }
            ],
            "explicacao": "V=100×9/3=300."
        },
        {
            "pergunta": "Um cilindro tem volume 200π cm³ e raio 5 cm. Qual é sua altura?",
            "alternativas": [
                {
                    "texto": "8 cm"
                },
                {
                    "texto": "5 cm"
                },
                {
                    "texto": "10 cm"
                },
                {
                    "texto": "12 cm"
                }
            ],
            "explicacao": "200π=25πh, h=8."
        },
        {
            "pergunta": "Uma caixa mede 3 cm × 4 cm × 12 cm. Qual é a diagonal espacial?",
            "alternativas": [
                {
                    "texto": "13 cm"
                },
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "14 cm"
                },
                {
                    "texto": "15 cm"
                }
            ],
            "explicacao": "d=√(9+16+144)=√169=13."
        },
        {
            "pergunta": "Um tronco de cone tem raios 2 cm e 5 cm e altura 4 cm. Qual é o volume?",
            "alternativas": [
                {
                    "texto": "28π cm³"
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
            "explicacao": "V=πh(R²+Rr+r²)/3=4π(25+10+4)/3=52π."
        },
        {
            "pergunta": "Um prisma tem 12 vértices e 8 faces. Quantas arestas possui?",
            "alternativas": [
                {
                    "texto": "18"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "20"
                },
                {
                    "texto": "22"
                }
            ],
            "explicacao": "Pela relação de Euler V−A+F=2: 12−A+8=2, A=18."
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
            "explicacao": "Somando expoentes: 2^(3−5+4)=2²=4."
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
            "explicacao": "As raízes são √3+√2 e √3−√2; a soma é 2√3."
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
            "explicacao": "27=3³; 2x−1=3; x=2."
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
            "explicacao": "A vírgula desloca 7 casas para a direita: expoente −7."
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
            "explicacao": "x=3⁴=81."
        },
        {
            "pergunta": "Calcule: (√5−√2)(√5+√2).",
            "alternativas": [
                {
                    "texto": "3"
                },
                {
                    "texto": "7"
                },
                {
                    "texto": "√3"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "Produto da soma pela diferença: 5−2=3."
        },
        {
            "pergunta": "Qual é o valor de 16^(3/4)?",
            "alternativas": [
                {
                    "texto": "8"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "6"
                },
                {
                    "texto": "12"
                }
            ],
            "explicacao": "⁴√16=2; 2³=8."
        },
        {
            "pergunta": "Racionalize 6/√3.",
            "alternativas": [
                {
                    "texto": "2√3"
                },
                {
                    "texto": "3√3"
                },
                {
                    "texto": "√3"
                },
                {
                    "texto": "6√3"
                }
            ],
            "explicacao": "6/√3 × √3/√3=6√3/3=2√3."
        },
        {
            "pergunta": "Se 2^x=√32, determine x.",
            "alternativas": [
                {
                    "texto": "5/2"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "√32=2^(5/2), portanto x=5/2."
        },
        {
            "pergunta": "Calcule: (27^(1/3) × 16^(1/2)) / 2.",
            "alternativas": [
                {
                    "texto": "6"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "12"
                }
            ],
            "explicacao": "∛27=3 e √16=4; (3×4)/2=6."
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
            "explicacao": "União=24+18−10=32; 32/40=80%."
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
            "explicacao": "Há 4 casos favoráveis em 36: (3,6),(4,5),(5,4),(6,3)."
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
            "explicacao": "(5/10)×(4/9)=2/9."
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
            "explicacao": "A mediana é o terceiro valor (6); média=35/5=7."
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
            "explicacao": "Para eventos independentes, 0,4×0,5=0,2."
        },
        {
            "pergunta": "Uma senha tem 3 algarismos distintos escolhidos entre 0 e 9. Quantas senhas podem ser formadas, considerando que o primeiro pode ser zero?",
            "alternativas": [
                {
                    "texto": "720"
                },
                {
                    "texto": "504"
                },
                {
                    "texto": "900"
                },
                {
                    "texto": "1.000"
                }
            ],
            "explicacao": "10×9×8=720."
        },
        {
            "pergunta": "De quantas maneiras 5 pessoas podem ocupar 5 cadeiras em fila?",
            "alternativas": [
                {
                    "texto": "120"
                },
                {
                    "texto": "25"
                },
                {
                    "texto": "60"
                },
                {
                    "texto": "625"
                }
            ],
            "explicacao": "Permutação: 5!=120."
        },
        {
            "pergunta": "Em uma turma, 60% são meninas. Se 25% das meninas usam óculos, qual porcentagem da turma são meninas que usam óculos?",
            "alternativas": [
                {
                    "texto": "15%"
                },
                {
                    "texto": "25%"
                },
                {
                    "texto": "35%"
                },
                {
                    "texto": "40%"
                }
            ],
            "explicacao": "0,60×0,25=0,15=15%."
        },
        {
            "pergunta": "Uma variável tem valores 2, 4 e 6 com frequências 1, 3 e 2. Qual é a média?",
            "alternativas": [
                {
                    "texto": "14/3"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "16/3"
                }
            ],
            "explicacao": "(2×1+4×3+6×2)/6=26/6=13/3."
        },
        {
            "pergunta": "Uma moeda é lançada 4 vezes. Qual a probabilidade de sair exatamente 3 caras?",
            "alternativas": [
                {
                    "texto": "1/4"
                },
                {
                    "texto": "1/8"
                },
                {
                    "texto": "3/8"
                },
                {
                    "texto": "1/2"
                }
            ],
            "explicacao": "C(4,3)/2⁴=4/16=1/4."
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
            "explicacao": "f(1)=5 e f(2)=13."
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
            "explicacao": "Para x≠3, a expressão é x+3; x+3=8, x=5."
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
            "explicacao": "1,1³=1,331."
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
            "explicacao": "Pela identidade fundamental, cosθ=√(1−9/25)=4/5."
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
            "explicacao": "11=3m+2; m=3."
        },
        {
            "pergunta": "Resolva a inequação −2(3x−1) > 10.",
            "alternativas": [
                {
                    "texto": "x<−4/3"
                },
                {
                    "texto": "x>−4/3"
                },
                {
                    "texto": "x<4/3"
                },
                {
                    "texto": "x>4/3"
                }
            ],
            "explicacao": "−6x+2>10; −6x>8; ao dividir por negativo, x<−4/3."
        },
        {
            "pergunta": "Uma progressão geométrica tem a₂=12 e a₅=324, com razão positiva. Qual é a razão?",
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
                    "texto": "6"
                }
            ],
            "explicacao": "a₅/a₂=r³=324/12=27; r=3."
        },
        {
            "pergunta": "Se log₃(x)+log₃(x−2)=1, com x>2, qual é x?",
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
            "explicacao": "log₃[x(x−2)]=1; x²−2x=3; x=3 (a outra raiz é −1)."
        },
        {
            "pergunta": "Uma circunferência tem equação (x−2)²+(y+1)²=25. Qual é seu centro e raio?",
            "alternativas": [
                {
                    "texto": "Centro (2,−1), raio 5"
                },
                {
                    "texto": "Centro (−2,1), raio 5"
                },
                {
                    "texto": "Centro (2,1), raio 25"
                },
                {
                    "texto": "Centro (−2,−1), raio 25"
                }
            ],
            "explicacao": "Forma padrão: centro (2,−1) e raio √25=5."
        },
        {
            "pergunta": "Se a área de um quadrado aumenta 44%, em quanto aumenta seu lado?",
            "alternativas": [
                {
                    "texto": "20%"
                },
                {
                    "texto": "22%"
                },
                {
                    "texto": "40%"
                },
                {
                    "texto": "44%"
                }
            ],
            "explicacao": "A área multiplica por 1,44; o lado multiplica por √1,44=1,2."
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

let tentativasBancoNivel3 = {};

let inicioFase = null;

let faseFinalizada = false;

let respostaEmEnvio = false;

let modoRevisao = false;

let idSessaoRevisao = null;


// =====================================================
// CARREGAR PROGRESSO DO NÍVEL 1 NO SUPABASE
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
// INICIALIZAÇÃO DO NÍVEL 1
// =====================================================

async function inicializarNivel3() {

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
