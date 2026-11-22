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
// CONFIGURAÇÃO DAS FASES — NÍVEL 4
// =====================================================
//
// Todas as fases e questões deste nível têm dificuldade difícil.
// =====================================================

const fasesNivel4 = {
    "1": {
        "nome": "Radicais, equações e logaritmos",
        "descricao": "Equações com radicais, propriedades de logaritmos, expoentes e módulos.",
        "dificuldade": "Difícil"
    },
    "2": {
        "nome": "Polinômios e sistemas algébricos",
        "descricao": "Teorema do resto, relações de Viète, sistemas e equações de grau superior.",
        "dificuldade": "Difícil"
    },
    "3": {
        "nome": "Trigonometria e resolução de triângulos",
        "descricao": "Equações trigonométricas, identidades, leis dos senos e cossenos e áreas.",
        "dificuldade": "Difícil"
    },
    "4": {
        "nome": "Geometria analítica",
        "descricao": "Retas, circunferências, parábolas, distâncias e interseções no plano cartesiano.",
        "dificuldade": "Difícil"
    },
    "5": {
        "nome": "Geometria plana avançada",
        "descricao": "Polígonos, quadriláteros cíclicos, potência de ponto, semelhança e áreas.",
        "dificuldade": "Difícil"
    },
    "6": {
        "nome": "Geometria espacial avançada",
        "descricao": "Volumes, áreas, sólidos compostos, diagonais e relações métricas espaciais.",
        "dificuldade": "Difícil"
    },
    "7": {
        "nome": "Progressões e matemática financeira",
        "descricao": "PA, PG, somas, recorrências e juros compostos.",
        "dificuldade": "Difícil"
    },
    "8": {
        "nome": "Análise combinatória e probabilidade",
        "descricao": "Permutações, combinações, distribuições, probabilidade condicional e inclusão-exclusão.",
        "dificuldade": "Difícil"
    },
    "9": {
        "nome": "Funções e inequações avançadas",
        "descricao": "Funções inversas, domínios, módulos, inequações e análise de parâmetros.",
        "dificuldade": "Difícil"
    },
    "10": {
        "nome": "Desafio matemático integrado",
        "descricao": "Problemas que combinam álgebra, geometria, funções, probabilidade e sequências.",
        "dificuldade": "Difícil"
    }
};


// =====================================================
// BANCO DE QUESTÕES — NÍVEL 4
// =====================================================
//
// Cada fase terá exatamente 10 questões, todas difíceis.
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

const questoesNivel4 ={
    "1": [
        {
            "pergunta": "Resolva √(3x+1)=x−1, considerando x≥1.",
            "alternativas": [
                {
                    "texto": "5"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA condição exige x≥1. Elevando ao quadrado: 3x+1=(x−1)², então x²−5x=0. As soluções são 0 e 5, mas somente 5 respeita o domínio.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Calcule √(7+4√3)+√(7−4√3).",
            "alternativas": [
                {
                    "texto": "4"
                },
                {
                    "texto": "2√3"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "2+√3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nObserve que 7+4√3=(2+√3)² e 7−4√3=(2−√3)². Como 2−√3 é positivo, as raízes são 2+√3 e 2−√3. Somando, os radicais se cancelam e o resultado é 4.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva 4^x−5·2^x+4=0.",
            "alternativas": [
                {
                    "texto": "x=0 ou x=2"
                },
                {
                    "texto": "x=1 ou x=2"
                },
                {
                    "texto": "x=−1 ou x=2"
                },
                {
                    "texto": "x=0 ou x=4"
                }
            ],
            "explicacao": "PASSO A PASSO:\nFaça t=2^x, com t>0. Como 4^x=(2^x)², temos t²−5t+4=0=(t−1)(t−4). Assim t=1 ou 4, isto é, 2^x=2⁰ ou 2². Logo x=0 ou x=2.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva log₂(x−1)+log₂(x+1)=3.",
            "alternativas": [
                {
                    "texto": "3"
                },
                {
                    "texto": "−3"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO domínio exige x>1. Juntando os logaritmos: log₂(x²−1)=3, então x²−1=8. As raízes são ±3, mas somente 3 pertence ao domínio.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Simplifique 1/(√5−√2)+1/(√5+√2).",
            "alternativas": [
                {
                    "texto": "2√5/3"
                },
                {
                    "texto": "√5/3"
                },
                {
                    "texto": "2√2/3"
                },
                {
                    "texto": "√5"
                }
            ],
            "explicacao": "PASSO A PASSO:\nUse o denominador comum conjugado: [(√5+√2)+(√5−√2)]/[(√5−√2)(√5+√2)]. O numerador fica 2√5 e o denominador 5−2=3. Resultado: 2√5/3.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva 27^(x−1)=9^(2x+1).",
            "alternativas": [
                {
                    "texto": "−5"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "−3"
                },
                {
                    "texto": "3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nEscreva 27=3³ e 9=3². Fica 3^(3x−3)=3^(4x+2). Igualando expoentes: 3x−3=4x+2, logo x=−5.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva √(x+6)+√(x−1)=5.",
            "alternativas": [
                {
                    "texto": "106/25"
                },
                {
                    "texto": "81/25"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "4"
                }
            ],
            "explicacao": "PASSO A PASSO:\nDefina a=√(x+6), b=√(x−1). Temos a+b=5 e a²−b²=7, então a−b=7/5. Logo b=9/5 e x−1=81/25; portanto x=106/25.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Calcule log₃81−log₃(1/9)+log₃√3.",
            "alternativas": [
                {
                    "texto": "13/2"
                },
                {
                    "texto": "9/2"
                },
                {
                    "texto": "11/2"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "PASSO A PASSO:\nOs logaritmos valem 4, −2 e 1/2. Portanto 4−(−2)+1/2=13/2. O logaritmo de 1/9 é negativo.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva |2x−3|=√(x+6).",
            "alternativas": [
                {
                    "texto": "x=3 ou x=1/4"
                },
                {
                    "texto": "x=3 ou x=−1/4"
                },
                {
                    "texto": "x=−3 ou x=1/4"
                },
                {
                    "texto": "x=3 ou x=4"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO domínio exige x≥−6. Elevando ao quadrado: (2x−3)²=x+6, então 4x²−13x+3=0. As raízes são 3 e 1/4, ambas válidas na equação original.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva 3^(2x)−10·3^x+9=0.",
            "alternativas": [
                {
                    "texto": "x=0 ou x=2"
                },
                {
                    "texto": "x=1 ou x=2"
                },
                {
                    "texto": "x=0 ou x=3"
                },
                {
                    "texto": "x=−1 ou x=2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nFaça t=3^x>0. A equação vira t²−10t+9=0=(t−1)(t−9). Assim 3^x=1 ou 9, logo x=0 ou 2.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "2": [
        {
            "pergunta": "P(x)=2x³−3x²+ax+5 tem raiz x=2. Determine a.",
            "alternativas": [
                {
                    "texto": "−9/2"
                },
                {
                    "texto": "9/2"
                },
                {
                    "texto": "−5"
                },
                {
                    "texto": "−7/2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nComo 2 é raiz, P(2)=0: 16−12+2a+5=0. Logo 9+2a=0 e a=−9/2.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "O sistema x+y+z=6, 2x−y+z=3 e x+2y−z=2 tem solução (x,y,z). Calcule x²+y²+z².",
            "alternativas": [
                {
                    "texto": "14"
                },
                {
                    "texto": "12"
                },
                {
                    "texto": "16"
                },
                {
                    "texto": "18"
                }
            ],
            "explicacao": "PASSO A PASSO:\nSubtraindo a primeira equação da segunda, x−2y=−3. Substituindo z=6−x−y na terceira, 2x+3y=8. Daí y=2, x=1 e z=3; a soma dos quadrados é 14.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "As raízes de 2x²−7x+3=0 são r e s. Determine 1/r+1/s.",
            "alternativas": [
                {
                    "texto": "7/3"
                },
                {
                    "texto": "3/7"
                },
                {
                    "texto": "7/6"
                },
                {
                    "texto": "5/3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPor Viète, r+s=7/2 e rs=3/2. Então 1/r+1/s=(r+s)/(rs)=(7/2)/(3/2)=7/3.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine o quociente da divisão de 2x³−3x²−11x+6 por x−3.",
            "alternativas": [
                {
                    "texto": "2x²+3x−2"
                },
                {
                    "texto": "2x²−3x+2"
                },
                {
                    "texto": "2x²+3x+2"
                },
                {
                    "texto": "2x²−6x−2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nBriot-Ruffini com 3 produz os coeficientes 2, 3, −2 e resto 0. O quociente é 2x²+3x−2.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva x⁴−13x²+36=0.",
            "alternativas": [
                {
                    "texto": "x=−3,−2,2,3"
                },
                {
                    "texto": "x=−6,−1,1,6"
                },
                {
                    "texto": "x=−3,−2"
                },
                {
                    "texto": "x=2,3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nFaça t=x²: t²−13t+36=0, então t=9 ou 4. Voltando, x=±3 ou x=±2. Não descarte as raízes negativas.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma raiz de x²−(m+2)x+2m=0 é 2. Sabendo que as raízes diferem em 3 e m>2, determine m.",
            "alternativas": [
                {
                    "texto": "5"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "4"
                },
                {
                    "texto": "6"
                }
            ],
            "explicacao": "PASSO A PASSO:\nSubstituir 2 produz uma identidade: 2 é raiz para qualquer m. Pela soma das raízes, a outra é m. Como m>2 e a diferença é 3, m−2=3, logo m=5.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva 1/(x−1)+1/(x+1)=3/4 e escolha a maior solução.",
            "alternativas": [
                {
                    "texto": "3"
                },
                {
                    "texto": "−1/3"
                },
                {
                    "texto": "1/3"
                },
                {
                    "texto": "−3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO domínio exclui ±1. Somando as frações: 2x/(x²−1)=3/4, então 3x²−8x−3=0. As raízes são 3 e −1/3; a maior é 3.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se r e s são raízes de 2x²−5x−3=0, calcule r²+s².",
            "alternativas": [
                {
                    "texto": "37/4"
                },
                {
                    "texto": "25/4"
                },
                {
                    "texto": "31/4"
                },
                {
                    "texto": "13/2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPor Viète, r+s=5/2 e rs=−3/2. Use r²+s²=(r+s)²−2rs=25/4+3=37/4.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se x+y=5 e xy=6, calcule x³+y³.",
            "alternativas": [
                {
                    "texto": "35"
                },
                {
                    "texto": "80"
                },
                {
                    "texto": "65"
                },
                {
                    "texto": "95"
                }
            ],
            "explicacao": "PASSO A PASSO:\nUse x³+y³=(x+y)³−3xy(x+y). Assim 5³−3×6×5=125−90=35.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "P(x)=x³+ax²+bx+6 satisfaz P(1)=0 e P(2)=0. Determine P(−1).",
            "alternativas": [
                {
                    "texto": "12"
                },
                {
                    "texto": "−12"
                },
                {
                    "texto": "8"
                },
                {
                    "texto": "−8"
                }
            ],
            "explicacao": "PASSO A PASSO:\nP(1)=0 dá a+b=−7. P(2)=0 dá 2a+b=−7; logo a=0 e b=−7. Então P(−1)=−1+7+6=12.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "3": [
        {
            "pergunta": "Resolva 2sen²θ−3senθ+1=0 em [0,2π). Quantos valores de θ existem?",
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
                    "texto": "1"
                }
            ],
            "explicacao": "PASSO A PASSO:\nFaça u=senθ: 2u²−3u+1=0, então u=1 ou 1/2. No intervalo, as soluções são π/2, π/6 e 5π/6. São três valores.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se tanθ=3/4 e θ está no terceiro quadrante, calcule senθ+cosθ.",
            "alternativas": [
                {
                    "texto": "−7/5"
                },
                {
                    "texto": "7/5"
                },
                {
                    "texto": "1/5"
                },
                {
                    "texto": "−1/5"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA razão 3/4 forma um triângulo 3-4-5. No terceiro quadrante, seno e cosseno são negativos: −3/5−4/5=−7/5.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um triângulo tem lados 7, 8 e 9. Determine sua área.",
            "alternativas": [
                {
                    "texto": "12√5"
                },
                {
                    "texto": "24"
                },
                {
                    "texto": "10√5"
                },
                {
                    "texto": "18"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPela fórmula de Heron, o semiperímetro é 12. A área é √[12×5×4×3]=√720=12√5.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Dois lados de um triângulo medem 5 e 7 e formam ângulo de 120°. Calcule a área.",
            "alternativas": [
                {
                    "texto": "35√3/4"
                },
                {
                    "texto": "35/4"
                },
                {
                    "texto": "35√2/4"
                },
                {
                    "texto": "35√3/2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA área é ab·senC/2. Substituindo: 5×7×sen120°/2. Como sen120°=√3/2, resulta 35√3/4.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva cos(2x)=sen x no intervalo [0,2π).",
            "alternativas": [
                {
                    "texto": "π/6, 5π/6 e 3π/2"
                },
                {
                    "texto": "π/6 e 5π/6"
                },
                {
                    "texto": "π/3, 2π/3 e π"
                },
                {
                    "texto": "π/2 e 3π/2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nUse cos(2x)=1−2sen²x. A equação vira 2s²+s−1=0, então senx=1/2 ou −1. As soluções são π/6, 5π/6 e 3π/2.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva sen x=−√3/2 em [0,2π) e some as soluções.",
            "alternativas": [
                {
                    "texto": "3π"
                },
                {
                    "texto": "5π/3"
                },
                {
                    "texto": "4π/3"
                },
                {
                    "texto": "2π"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO seno é −√3/2 nos quadrantes III e IV, com referência π/3. As soluções são 4π/3 e 5π/3; a soma é 3π.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se 0<θ<π/2 e tanθ+cotθ=10/3, quais os valores possíveis de tanθ?",
            "alternativas": [
                {
                    "texto": "3 ou 1/3"
                },
                {
                    "texto": "2 ou 1/2"
                },
                {
                    "texto": "5 ou 1/5"
                },
                {
                    "texto": "3 ou 2/3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nFaça t=tanθ>0. Então t+1/t=10/3, ou 3t²−10t+3=0=(3t−1)(t−3). Logo t=1/3 ou 3.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Em triângulos retângulos, sen A=3/5 e cos B=5/13, com A e B agudos. Calcule sen(A+B).",
            "alternativas": [
                {
                    "texto": "63/65"
                },
                {
                    "texto": "56/65"
                },
                {
                    "texto": "33/65"
                },
                {
                    "texto": "16/65"
                }
            ],
            "explicacao": "PASSO A PASSO:\nComo A é agudo, cosA=4/5; como B é agudo, senB=12/13. Use sen(A+B)=senA·cosB+cosA·senB=(15+48)/65=63/65.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva 2cos²x−1=0 em [0,2π). Quantas soluções existem?",
            "alternativas": [
                {
                    "texto": "4"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "1"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA equação dá cos²x=1/2, então cosx=±√2/2. Em uma volta completa, há quatro ângulos: π/4, 3π/4, 5π/4 e 7π/4.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um triângulo tem lados 13, 14 e 15. Determine sua área.",
            "alternativas": [
                {
                    "texto": "84"
                },
                {
                    "texto": "90"
                },
                {
                    "texto": "72"
                },
                {
                    "texto": "96"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO semiperímetro é 21. Pela fórmula de Heron: A=√(21×8×7×6)=√7056=84.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "4": [
        {
            "pergunta": "Um ponto P=(t,0), no eixo x, é equidistante de A(−2,3) e B(4,−1). Determine t.",
            "alternativas": [
                {
                    "texto": "1/3"
                },
                {
                    "texto": "1/2"
                },
                {
                    "texto": "−1/3"
                },
                {
                    "texto": "2/3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nIguale as distâncias ao quadrado: (t+2)²+3²=(t−4)²+(0+1)². Desenvolvendo: t²+4t+13=t²−8t+17. Então 12t=4 e t=1/3. Igualar os quadrados evita trabalhar com duas raízes quadradas.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine a reta que passa por (2,−1) e é paralela a 3x−4y+7=0.",
            "alternativas": [
                {
                    "texto": "3x−4y−10=0"
                },
                {
                    "texto": "3x+4y−10=0"
                },
                {
                    "texto": "4x−3y−11=0"
                },
                {
                    "texto": "3x−4y+10=0"
                }
            ],
            "explicacao": "PASSO A PASSO:\nRetas paralelas mantêm os coeficientes 3 e −4: 3x−4y+c=0. Substituindo (2,−1): 6+4+c=0, então c=−10.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine a circunferência de centro (3,−2) e raio 5.",
            "alternativas": [
                {
                    "texto": "x²+y²−6x+4y−12=0"
                },
                {
                    "texto": "x²+y²+6x−4y−12=0"
                },
                {
                    "texto": "x²+y²−6x−4y+12=0"
                },
                {
                    "texto": "x²+y²+3x−2y−25=0"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA forma reduzida é (x−3)²+(y+2)²=25. Desenvolvendo: x²+y²−6x+4y−12=0.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "As retas 2x+y=7 e x−y=2 se cruzam em P. Calcule a distância de P à origem.",
            "alternativas": [
                {
                    "texto": "√10"
                },
                {
                    "texto": "√13"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "PASSO A PASSO:\nSomando as equações, 3x=9, então x=3 e y=1. A distância à origem é √(3²+1²)=√10.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A parábola y=x²−6x+5 tem vértice V. Determine seu foco.",
            "alternativas": [
                {
                    "texto": "(3,−15/4)"
                },
                {
                    "texto": "(3,−17/4)"
                },
                {
                    "texto": "(3,−4)"
                },
                {
                    "texto": "(−3,−15/4)"
                }
            ],
            "explicacao": "PASSO A PASSO:\nComplete o quadrado: y=(x−3)²−4. Então (x−3)²=y+4; comparando com (x−h)²=4p(y−k), p=1/4. O vértice é (3,−4), logo o foco é (3,−15/4).\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "O ponto P divide internamente A(−4,7) e B(8,−5) na razão AP:PB=2:1. Determine a distância de P à origem.",
            "alternativas": [
                {
                    "texto": "√17"
                },
                {
                    "texto": "√13"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "√20"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPela fórmula da divisão interna, P=(1·A+2·B)/3. Assim x=(−4+16)/3=4 e y=(7−10)/3=−1. A distância à origem é √(4²+(−1)²)=√17. A razão 2:1 significa que P fica duas partes a partir de A e uma de B.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine a abscissa do ponto em que a reta perpendicular a 3x−2y+5=0, passando por (4,−2), intercepta o eixo x.",
            "alternativas": [
                {
                    "texto": "1"
                },
                {
                    "texto": "−1"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nIsolando y na reta dada, seu coeficiente angular é 3/2. A perpendicular tem inclinação −2/3. Pela forma ponto-inclinação: y+2=−(2/3)(x−4), que simplifica para y=−(2/3)x+2/3. No eixo x, y=0; então x=1.\n\nCOMO EVITAR O ERRO:\nTransforme as informações em equações antes de calcular e confira se o resultado atende às condições do enunciado.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine a circunferência que passa por (0,0), (4,0) e (0,6).",
            "alternativas": [
                {
                    "texto": "x²+y²−4x−6y=0"
                },
                {
                    "texto": "x²+y²+4x+6y=0"
                },
                {
                    "texto": "x²+y²−4x+6y=0"
                },
                {
                    "texto": "x²+y²−2x−3y=0"
                }
            ],
            "explicacao": "PASSO A PASSO:\nNa forma x²+y²+Dx+Ey+F=0, a origem dá F=0. O ponto (4,0) dá D=−4 e (0,6) dá E=−6. Logo x²+y²−4x−6y=0.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Calcule a distância do ponto (2,−1) à reta 3x−4y+5=0.",
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
            "explicacao": "PASSO A PASSO:\nUse d=|Ax₀+By₀+C|/√(A²+B²). O numerador é |6+4+5|=15 e o denominador é 5. A distância é 3.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A reta y=x+1 intercepta a circunferência x²+y²=25 em dois pontos. Qual é a soma das abscissas?",
            "alternativas": [
                {
                    "texto": "−1"
                },
                {
                    "texto": "1"
                },
                {
                    "texto": "−4"
                },
                {
                    "texto": "3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nSubstitua y=x+1: x²+(x+1)²=25, então x²+x−12=0. As raízes são 3 e −4; a soma é −1.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "5": [
        {
            "pergunta": "Um polígono regular tem ângulo interno de 165°. Quantas diagonais possui?",
            "alternativas": [
                {
                    "texto": "252"
                },
                {
                    "texto": "240"
                },
                {
                    "texto": "264"
                },
                {
                    "texto": "276"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO ângulo externo é 15°. Logo n=360/15=24 lados. O número de diagonais é 24×21/2=252.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Em um quadrilátero cíclico, ângulos opostos medem 3x+10° e 5x−30°. Determine x.",
            "alternativas": [
                {
                    "texto": "25"
                },
                {
                    "texto": "20"
                },
                {
                    "texto": "30"
                },
                {
                    "texto": "35"
                }
            ],
            "explicacao": "PASSO A PASSO:\nEm um quadrilátero inscrito, ângulos opostos somam 180°. Então 3x+10+5x−30=180, logo 8x=200 e x=25.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma tangente e uma secante partem de um ponto externo. A parte externa da secante mede 4 cm e a secante inteira mede 13 cm. Determine a tangente.",
            "alternativas": [
                {
                    "texto": "2√13 cm"
                },
                {
                    "texto": "√52 cm"
                },
                {
                    "texto": "√13 cm"
                },
                {
                    "texto": "4√13 cm"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPela potência do ponto, t²=4×13=52. Portanto t=√52=2√13 cm.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Duas secantes partem de um ponto externo e interceptam a circunferência. Os arcos maior e menor entre os pontos de interseção medem 170° e 50°. Determine o ângulo externo formado.",
            "alternativas": [
                {
                    "texto": "60°"
                },
                {
                    "texto": "110°"
                },
                {
                    "texto": "85°"
                },
                {
                    "texto": "120°"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO ângulo externo formado por duas secantes mede metade da diferença entre os arcos interceptados. Então (170°−50°)/2=120°/2=60°. Não use a soma dos arcos, propriedade aplicada a outros casos.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma coroa circular tem raio externo 10 cm e área 64π cm². Determine o raio interno.",
            "alternativas": [
                {
                    "texto": "6 cm"
                },
                {
                    "texto": "8 cm"
                },
                {
                    "texto": "4 cm"
                },
                {
                    "texto": "√36/2 cm"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA área da coroa é π(R²−r²). Substituindo: 64π=π(100−r²). Divida por π: 64=100−r², então r²=36 e r=6 cm. O raio é positivo, por isso descartamos −6.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma bissetriz divide um triângulo em dois triângulos de áreas na razão 2:3. Se a área total é 150 cm², determine a área da menor parte.",
            "alternativas": [
                {
                    "texto": "60 cm²"
                },
                {
                    "texto": "75 cm²"
                },
                {
                    "texto": "90 cm²"
                },
                {
                    "texto": "50 cm²"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA razão total tem 2+3=5 partes. Cada parte vale 150/5=30 cm². A menor região corresponde a duas partes: 2×30=60 cm². A área deve ser dividida proporcionalmente à razão, não igualmente.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Dois triângulos semelhantes têm razão entre lados correspondentes 3:2. Se a área do menor é 32 cm², qual é a área do maior?",
            "alternativas": [
                {
                    "texto": "72 cm²"
                },
                {
                    "texto": "48 cm²"
                },
                {
                    "texto": "64 cm²"
                },
                {
                    "texto": "96 cm²"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA razão entre áreas é o quadrado da razão linear: (3/2)²=9/4. A área maior é 32×9/4=72 cm².\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma circunferência de raio 13 cm tem uma corda a 5 cm do centro. Determine o comprimento da corda.",
            "alternativas": [
                {
                    "texto": "24 cm"
                },
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "26 cm"
                },
                {
                    "texto": "20 cm"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA perpendicular do centro divide a corda ao meio. Metade mede √(13²−5²)=12 cm; a corda inteira mede 24 cm.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um hexágono regular tem apótema 6 cm. Determine sua área.",
            "alternativas": [
                {
                    "texto": "72√3 cm²"
                },
                {
                    "texto": "36√3 cm²"
                },
                {
                    "texto": "144√3 cm²"
                },
                {
                    "texto": "48√3 cm²"
                }
            ],
            "explicacao": "PASSO A PASSO:\nNo hexágono, apótema=(√3/2)lado, então lado=4√3 e perímetro=24√3. Área=24√3×6/2=72√3 cm².\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um setor circular tem raio 12 cm e comprimento de arco 8π cm. Determine sua área.",
            "alternativas": [
                {
                    "texto": "48π cm²"
                },
                {
                    "texto": "24π cm²"
                },
                {
                    "texto": "36π cm²"
                },
                {
                    "texto": "96π cm²"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA área de um setor pode ser calculada por A=(r·s)/2, em que s é o comprimento do arco. Substituindo: A=(12×8π)/2=48π cm². Assim não é necessário descobrir o ângulo central.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        }
    ],
    "6": [
        {
            "pergunta": "Um cone reto tem raio 5 cm e geratriz 13 cm. Determine seu volume.",
            "alternativas": [
                {
                    "texto": "100π cm³"
                },
                {
                    "texto": "125π cm³"
                },
                {
                    "texto": "150π cm³"
                },
                {
                    "texto": "75π cm³"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA altura, o raio e a geratriz formam um triângulo retângulo. h²+5²=13², então h²=144 e h=12 cm. Agora use V=πr²h/3=π×25×12/3=100π cm³. O erro comum é usar a geratriz como se fosse a altura.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um tronco de cone tem raios 6 cm e 3 cm e altura 4 cm. Calcule o volume.",
            "alternativas": [
                {
                    "texto": "84π cm³"
                },
                {
                    "texto": "72π cm³"
                },
                {
                    "texto": "96π cm³"
                },
                {
                    "texto": "60π cm³"
                }
            ],
            "explicacao": "PASSO A PASSO:\nUse V=πh(R²+r²+Rr)/3. Substituindo: 4π(36+9+18)/3=84π cm³.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma esfera está inscrita em um cubo de aresta 10 cm. Determine o volume da esfera.",
            "alternativas": [
                {
                    "texto": "500π/3 cm³"
                },
                {
                    "texto": "1.000π/3 cm³"
                },
                {
                    "texto": "250π/3 cm³"
                },
                {
                    "texto": "100π cm³"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO diâmetro da esfera é a aresta do cubo, 10 cm, então r=5. O volume é 4πr³/3=500π/3 cm³.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine o volume de um tetraedro regular de aresta 6 cm.",
            "alternativas": [
                {
                    "texto": "18√2 cm³"
                },
                {
                    "texto": "36√2 cm³"
                },
                {
                    "texto": "12√2 cm³"
                },
                {
                    "texto": "24√2 cm³"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA fórmula é V=a³/(6√2). Com a=6: 216/(6√2)=18√2 cm³.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um cilindro circunscreve uma esfera de raio 4 cm. Determine o volume do cilindro.",
            "alternativas": [
                {
                    "texto": "128π cm³"
                },
                {
                    "texto": "64π cm³"
                },
                {
                    "texto": "256π cm³"
                },
                {
                    "texto": "96π cm³"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO raio da base é 4 cm e a altura é o diâmetro da esfera, 8 cm. Assim V=π×4²×8=128π cm³.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um cone tem raio 5 cm, altura 12 cm e geratriz 13 cm. Determine sua área total.",
            "alternativas": [
                {
                    "texto": "90π cm²"
                },
                {
                    "texto": "65π cm²"
                },
                {
                    "texto": "25π cm²"
                },
                {
                    "texto": "130π cm²"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA área total soma base e lateral: πr²+πrg=25π+65π=90π cm². A área lateral usa a geratriz.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um paralelepípedo retângulo tem arestas 3 cm, 4 cm e x cm. Sua diagonal espacial mede 13 cm. Determine x.",
            "alternativas": [
                {
                    "texto": "12 cm"
                },
                {
                    "texto": "10 cm"
                },
                {
                    "texto": "11 cm"
                },
                {
                    "texto": "9 cm"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPelo teorema de Pitágoras no espaço: 3²+4²+x²=13². Então 9+16+x²=169, x²=144 e x=12 cm. Como uma dimensão é positiva, usamos a raiz positiva.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um sólido é formado por um cilindro de raio 3 cm e altura 8 cm unido a uma semiesfera de mesmo raio. Determine o volume total.",
            "alternativas": [
                {
                    "texto": "90π cm³"
                },
                {
                    "texto": "72π cm³"
                },
                {
                    "texto": "54π cm³"
                },
                {
                    "texto": "108π cm³"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO cilindro tem volume 72π. A semiesfera tem metade do volume da esfera, 18π. Somando, 90π cm³.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma pirâmide de base quadrada tem lado 10 cm e apótema lateral 13 cm. Determine sua área total.",
            "alternativas": [
                {
                    "texto": "360 cm²"
                },
                {
                    "texto": "230 cm²"
                },
                {
                    "texto": "260 cm²"
                },
                {
                    "texto": "200 cm²"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA base mede 100 cm². A área lateral é (40×13)/2=260 cm². A área total é 100+260=360 cm².\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se todas as dimensões lineares de um sólido são multiplicadas por 3, por quanto seu volume é multiplicado?",
            "alternativas": [
                {
                    "texto": "27"
                },
                {
                    "texto": "9"
                },
                {
                    "texto": "6"
                },
                {
                    "texto": "3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO volume varia com o cubo da escala linear: 3³=27. O fator 9 seria usado para áreas.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "7": [
        {
            "pergunta": "Uma PG positiva tem a₃=12 e a₆=96. Determine a soma dos oito primeiros termos.",
            "alternativas": [
                {
                    "texto": "765"
                },
                {
                    "texto": "510"
                },
                {
                    "texto": "1.020"
                },
                {
                    "texto": "384"
                }
            ],
            "explicacao": "PASSO A PASSO:\nDividindo a₆ por a₃: r³=96/12=8, então r=2. Como a₃=a₁r², a₁=12/4=3. A soma é S₈=3(2⁸−1)/(2−1)=3×255=765.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma PG infinita tem primeiro termo 18 e razão 1/3. Determine sua soma.",
            "alternativas": [
                {
                    "texto": "27"
                },
                {
                    "texto": "24"
                },
                {
                    "texto": "36"
                },
                {
                    "texto": "54"
                }
            ],
            "explicacao": "PASSO A PASSO:\nComo |r|<1, S=a₁/(1−r)=18/(1−1/3)=27.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Em uma PA, a₄=11 e a₁₀=29. Determine a soma dos 20 primeiros termos.",
            "alternativas": [
                {
                    "texto": "610"
                },
                {
                    "texto": "590"
                },
                {
                    "texto": "630"
                },
                {
                    "texto": "650"
                }
            ],
            "explicacao": "PASSO A PASSO:\nEntre a₄ e a₁₀ há seis intervalos: r=3. Como a₄=a₁+3r, a₁=2. Então a₂₀=59 e S₂₀=20(2+59)/2=610.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma PG positiva tem a₂=6 e a₅=162. Determine a soma dos seis primeiros termos.",
            "alternativas": [
                {
                    "texto": "728"
                },
                {
                    "texto": "486"
                },
                {
                    "texto": "364"
                },
                {
                    "texto": "1.092"
                }
            ],
            "explicacao": "PASSO A PASSO:\na₅/a₂=r³=27, logo r=3. Então a₁=2. A soma é S₆=2(3⁶−1)/(3−1)=728.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "R$ 10.000 são aplicados a juros compostos de 2% ao mês durante 6 meses. Qual o montante aproximado?",
            "alternativas": [
                {
                    "texto": "R$ 11.261,62"
                },
                {
                    "texto": "R$ 11.200,00"
                },
                {
                    "texto": "R$ 12.000,00"
                },
                {
                    "texto": "R$ 10.600,00"
                }
            ],
            "explicacao": "PASSO A PASSO:\nUse M=C(1+i)^t: 10.000×1,02⁶≈R$ 11.261,62. Em juros compostos, os juros acumulados também rendem.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma PA tem primeiro termo 7 e razão 4. Calcule a soma dos 15 primeiros termos.",
            "alternativas": [
                {
                    "texto": "525"
                },
                {
                    "texto": "510"
                },
                {
                    "texto": "540"
                },
                {
                    "texto": "495"
                }
            ],
            "explicacao": "PASSO A PASSO:\na₁₅=7+14×4=63. Então S₁₅=15(7+63)/2=525.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma sequência tem a₁=2 e aₙ=2aₙ₋₁+3. Determine a₅.",
            "alternativas": [
                {
                    "texto": "77"
                },
                {
                    "texto": "61"
                },
                {
                    "texto": "53"
                },
                {
                    "texto": "45"
                }
            ],
            "explicacao": "PASSO A PASSO:\nCalcule: a₂=7, a₃=17, a₄=37 e a₅=77. Cada termo usa o anterior.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma PG tem primeiro termo 4 e razão 3. Determine a soma dos seis primeiros termos.",
            "alternativas": [
                {
                    "texto": "1.456"
                },
                {
                    "texto": "1.092"
                },
                {
                    "texto": "728"
                },
                {
                    "texto": "1.820"
                }
            ],
            "explicacao": "PASSO A PASSO:\nUse S₆=a₁(r⁶−1)/(r−1). Substituindo: 4(3⁶−1)/(3−1)=4×728/2=1.456. O expoente 6 conta a quantidade de termos, não o último índice menos um.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma aplicação de R$ 5.000 rende 1,5% ao mês em juros compostos. Qual expressão representa o montante após n meses?",
            "alternativas": [
                {
                    "texto": "5.000·(1,015)^n"
                },
                {
                    "texto": "5.000·(1,15)^n"
                },
                {
                    "texto": "5.000+0,015n"
                },
                {
                    "texto": "5.000·(1,5)^n"
                }
            ],
            "explicacao": "PASSO A PASSO:\nNa fórmula M=C(1+i)^n, 1,5% vira 0,015. Logo M=5.000(1,015)^n. Não confunda 1,5% com 15%.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Calcule a soma 5+10+20+40+80+160+320+640.",
            "alternativas": [
                {
                    "texto": "1.275"
                },
                {
                    "texto": "1.280"
                },
                {
                    "texto": "1.255"
                },
                {
                    "texto": "1.365"
                }
            ],
            "explicacao": "PASSO A PASSO:\nÉ uma PG com a₁=5, razão 2 e oito termos. S₈=5(2⁸−1)=1.275.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "8": [
        {
            "pergunta": "Quantos anagramas distintos podem ser formados com MATEMATICA?",
            "alternativas": [
                {
                    "texto": "151.200"
                },
                {
                    "texto": "302.400"
                },
                {
                    "texto": "75.600"
                },
                {
                    "texto": "1.814.400"
                }
            ],
            "explicacao": "PASSO A PASSO:\nSão 10 letras: A aparece 3 vezes, M 2 e T 2. O total é 10!/(3!·2!·2!)=151.200.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma comissão terá 3 mulheres escolhidas entre 5 e 2 homens entre 4. Quantas comissões podem ser formadas?",
            "alternativas": [
                {
                    "texto": "60"
                },
                {
                    "texto": "40"
                },
                {
                    "texto": "80"
                },
                {
                    "texto": "120"
                }
            ],
            "explicacao": "PASSO A PASSO:\nC(5,3)=10 e C(4,2)=6. Pelo princípio multiplicativo, 10×6=60. A ordem não importa, por isso usamos combinações.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "De quantas maneiras 7 pessoas podem sentar-se ao redor de uma mesa circular?",
            "alternativas": [
                {
                    "texto": "720"
                },
                {
                    "texto": "5.040"
                },
                {
                    "texto": "120"
                },
                {
                    "texto": "360"
                }
            ],
            "explicacao": "PASSO A PASSO:\nEm disposição circular, rotações são equivalentes. Fixe uma pessoa e organize as outras seis: 6!=720.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Quantas soluções inteiras não negativas satisfazem x+y+z+w=12?",
            "alternativas": [
                {
                    "texto": "455"
                },
                {
                    "texto": "364"
                },
                {
                    "texto": "560"
                },
                {
                    "texto": "1.820"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPelo método estrelas e barras, o total é C(12+4−1,4−1)=C(15,3)=455. O método inclui valores iguais a zero.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Qual é o coeficiente de x³ em (2x−1)⁵?",
            "alternativas": [
                {
                    "texto": "80"
                },
                {
                    "texto": "40"
                },
                {
                    "texto": "−80"
                },
                {
                    "texto": "160"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPelo binômio de Newton, o termo é C(5,3)(2x)³(−1)². O coeficiente é 10×8=80.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Duas cartas são retiradas de um baralho de 52, sem reposição. Qual a probabilidade de ambas serem vermelhas?",
            "alternativas": [
                {
                    "texto": "25/102"
                },
                {
                    "texto": "1/4"
                },
                {
                    "texto": "13/51"
                },
                {
                    "texto": "1/2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA primeira vermelha tem probabilidade 26/52. Depois restam 25 vermelhas entre 51 cartas. Multiplique: (26/52)(25/51)=25/102.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "A máquina A produz 60% das peças e tem 2% de defeito. B produz 40% e tem 5% de defeito. Dada uma peça defeituosa, qual a probabilidade de vir de A?",
            "alternativas": [
                {
                    "texto": "3/8"
                },
                {
                    "texto": "1/2"
                },
                {
                    "texto": "3/5"
                },
                {
                    "texto": "2/5"
                }
            ],
            "explicacao": "PASSO A PASSO:\nDefeitos de A: 0,60×0,02=0,012. De B: 0,40×0,05=0,020. Total 0,032. Logo P(A|defeito)=0,012/0,032=3/8.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma urna tem 5 bolas vermelhas e 4 azuis. Retiram-se 3 sem reposição. Qual a probabilidade de exatamente 2 vermelhas?",
            "alternativas": [
                {
                    "texto": "10/21"
                },
                {
                    "texto": "5/14"
                },
                {
                    "texto": "1/2"
                },
                {
                    "texto": "5/21"
                }
            ],
            "explicacao": "PASSO A PASSO:\nCasos favoráveis: C(5,2)×C(4,1)=40. Casos possíveis: C(9,3)=84. A probabilidade é 40/84=10/21.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Quantos inteiros de 1 a 100 são divisíveis por 3 ou por 5?",
            "alternativas": [
                {
                    "texto": "47"
                },
                {
                    "texto": "53"
                },
                {
                    "texto": "33"
                },
                {
                    "texto": "20"
                }
            ],
            "explicacao": "PASSO A PASSO:\nHá 33 múltiplos de 3 e 20 de 5. Os múltiplos comuns de 15 são 6. Pela inclusão-exclusão: 33+20−6=47.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma permutação aleatória de 5 objetos não deixa nenhum objeto na posição original. Qual a probabilidade?",
            "alternativas": [
                {
                    "texto": "11/30"
                },
                {
                    "texto": "1/5"
                },
                {
                    "texto": "1/3"
                },
                {
                    "texto": "2/5"
                }
            ],
            "explicacao": "PASSO A PASSO:\nExistem 44 desarranjos de 5 objetos e 5!=120 permutações totais. A probabilidade é 44/120=11/30.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "9": [
        {
            "pergunta": "A função f(x)=(3x−5)/2 é invertida. Determine f⁻¹(x).",
            "alternativas": [
                {
                    "texto": "(2x+5)/3"
                },
                {
                    "texto": "(2x−5)/3"
                },
                {
                    "texto": "(3x+5)/2"
                },
                {
                    "texto": "(x+5)/3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nEscreva y=(3x−5)/2. Então 2y=3x−5, 3x=2y+5 e x=(2y+5)/3. Trocando x e y, f⁻¹(x)=(2x+5)/3.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva (x−2)/(x+3)≥0.",
            "alternativas": [
                {
                    "texto": "x<−3 ou x≥2"
                },
                {
                    "texto": "−3<x≤2"
                },
                {
                    "texto": "x≤−3 ou x>2"
                },
                {
                    "texto": "−3<x<2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nOs pontos críticos são −3 e 2. A fração é positiva em x<−3 e x>2. Inclua 2 porque zera; exclua −3 porque o denominador zera.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva log₂(x+3)+log₂(x−1)=3, considerando x>1.",
            "alternativas": [
                {
                    "texto": "2√3−1"
                },
                {
                    "texto": "2√3+1"
                },
                {
                    "texto": "√3−1"
                },
                {
                    "texto": "3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nJunte os logaritmos: log₂[(x+3)(x−1)]=3. Então (x+3)(x−1)=8, ou x²+2x−11=0. As raízes são −1±2√3. Como x>1, somente x=2√3−1 é válida.\n\nCOMO EVITAR O ERRO:\nTransforme as informações em equações antes de calcular e confira se o resultado atende às condições do enunciado.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva 4^(x+1)<8^(x−1).",
            "alternativas": [
                {
                    "texto": "x>5"
                },
                {
                    "texto": "x<5"
                },
                {
                    "texto": "x>3"
                },
                {
                    "texto": "x>2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nEscreva tudo na base 2: 2^(2x+2)<2^(3x−3). Como a base 2 é maior que 1, compare os expoentes: 2x+2<3x−3. Isolando x, obtemos x>5.\n\nCOMO EVITAR O ERRO:\nTransforme as informações em equações antes de calcular e confira se o resultado atende às condições do enunciado.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "f(x)=x² é transformada em g(x)=−2f(3(x−1))+4. Qual é o vértice de g?",
            "alternativas": [
                {
                    "texto": "(1,4)"
                },
                {
                    "texto": "(−1,4)"
                },
                {
                    "texto": "(1,−4)"
                },
                {
                    "texto": "(3,4)"
                }
            ],
            "explicacao": "PASSO A PASSO:\nSubstitua f: g(x)=−2[3(x−1)]²+4=−18(x−1)²+4. Na forma a(x−h)²+k, o vértice é (1,4).\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine o valor máximo de f(x)=−x²+6x−5 no intervalo [0,5].",
            "alternativas": [
                {
                    "texto": "4"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "−5"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO vértice ocorre em x=−b/(2a)=3, dentro do intervalo. f(3)=−9+18−5=4. Como a parábola abre para baixo, esse é o máximo.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva |x−2|+|x+1|=5.",
            "alternativas": [
                {
                    "texto": "x=−2 ou x=3"
                },
                {
                    "texto": "x=−3 ou x=2"
                },
                {
                    "texto": "x=−1 ou x=4"
                },
                {
                    "texto": "x=−2 ou x=2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nSepare pelos pontos críticos −1 e 2. Se x≤−1: (2−x)+(−x−1)=1−2x=5, então x=−2. Se x≥2: (x−2)+(x+1)=2x−1=5, então x=3. No intervalo entre −1 e 2, a soma vale 3, portanto não há solução ali.\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Determine o domínio de f(x)=log₃((x−1)/(x+2)).",
            "alternativas": [
                {
                    "texto": "x<−2 ou x>1"
                },
                {
                    "texto": "−2<x<1"
                },
                {
                    "texto": "x≤−2 ou x≥1"
                },
                {
                    "texto": "x>−2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO argumento deve ser positivo: (x−1)/(x+2)>0. Numerador e denominador precisam ter o mesmo sinal, o que ocorre em x<−2 ou x>1.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "f(x)=ax+1 para x<2 e f(x)=x²+b para x≥2. Se f é contínua e derivável em x=2, determine a+b.",
            "alternativas": [
                {
                    "texto": "9"
                },
                {
                    "texto": "7"
                },
                {
                    "texto": "5"
                },
                {
                    "texto": "11"
                }
            ],
            "explicacao": "PASSO A PASSO:\nDerivabilidade exige a=2x em x=2, então a=4. Continuidade: 2a+1=4+b, logo b=5. Portanto a+b=9.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Para quais m a expressão x²−2mx+m+2 é positiva para todo x real?",
            "alternativas": [
                {
                    "texto": "−1<m<2"
                },
                {
                    "texto": "m<−1 ou m>2"
                },
                {
                    "texto": "−2<m<1"
                },
                {
                    "texto": "m≤−1 ou m≥2"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA parábola abre para cima. Para ser sempre positiva, Δ<0: 4m²−4m−8<0. Fatorando: (m−2)(m+1)<0, portanto −1<m<2.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ],
    "10": [
        {
            "pergunta": "Resolva √(x+5)=x−1.",
            "alternativas": [
                {
                    "texto": "4"
                },
                {
                    "texto": "−1"
                },
                {
                    "texto": "3"
                },
                {
                    "texto": "5"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO domínio exige x≥1. Elevando ao quadrado: x+5=(x−1)², então x²−3x−4=0. As raízes são 4 e −1, mas só 4 respeita o domínio e a equação original.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "O sistema x+y+z=6, x−y=2 e y−z=1 tem solução (x,y,z). Calcule xyz.",
            "alternativas": [
                {
                    "texto": "110/27"
                },
                {
                    "texto": "10/9"
                },
                {
                    "texto": "22/9"
                },
                {
                    "texto": "20/27"
                }
            ],
            "explicacao": "PASSO A PASSO:\nDas duas últimas equações: x=y+2 e z=y−1. Na primeira: 3y+1=6, então y=5/3. Logo x=11/3 e z=2/3. O produto é 110/27.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Se senθ=5/13 e θ está no segundo quadrante, calcule cosθ.",
            "alternativas": [
                {
                    "texto": "−12/13"
                },
                {
                    "texto": "12/13"
                },
                {
                    "texto": "−5/13"
                },
                {
                    "texto": "5/12"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPela identidade sen²θ+cos²θ=1, cos²θ=144/169, então |cosθ|=12/13. No segundo quadrante o cosseno é negativo: −12/13.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Dois dados honestos são lançados. Sabendo que a soma foi 8, qual a probabilidade de pelo menos um mostrar 5?",
            "alternativas": [
                {
                    "texto": "2/5"
                },
                {
                    "texto": "1/3"
                },
                {
                    "texto": "1/2"
                },
                {
                    "texto": "5/36"
                }
            ],
            "explicacao": "PASSO A PASSO:\nOs resultados ordenados com soma 8 são (2,6),(3,5),(4,4),(5,3),(6,2). Dois dos cinco contêm 5. A probabilidade condicionada é 2/5.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Um trapézio tem bases paralelas de 10 cm e 18 cm e altura 7 cm. As diagonais se cruzam. Determine a área do triângulo menor formado junto à base de 10 cm.",
            "alternativas": [
                {
                    "texto": "12,5 cm²"
                },
                {
                    "texto": "17,5 cm²"
                },
                {
                    "texto": "25 cm²"
                },
                {
                    "texto": "35 cm²"
                }
            ],
            "explicacao": "PASSO A PASSO:\nA interseção das diagonais divide a altura na razão das bases. A distância da base menor até o cruzamento é 7×10/(10+18)=2,5 cm. A área do triângulo menor é base×altura/2=10×2,5/2=12,5 cm².\n\nCOMO EVITAR O ERRO:\nOrganize as etapas antes de calcular e confira se a resposta atende a todas as condições do problema.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "P(x)=x²+ax+b deixa resto 5 na divisão por x−2 e resto 11 na divisão por x+1. Determine a.",
            "alternativas": [
                {
                    "texto": "−3"
                },
                {
                    "texto": "2"
                },
                {
                    "texto": "−2"
                },
                {
                    "texto": "3"
                }
            ],
            "explicacao": "PASSO A PASSO:\nP(2)=5 dá 2a+b=1. P(−1)=11 dá −a+b=10. Subtraindo, 3a=−9, então a=−3. O resto em x−c é P(c).\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Resolva 4^x=8^(x−1).",
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
                    "texto": "1"
                }
            ],
            "explicacao": "PASSO A PASSO:\nEscreva na base 2: 2^(2x)=2^(3x−3). Igualando expoentes: 2x=3x−3, então x=3.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma caixa retangular mede 4 cm, 6 cm e 9 cm. Determine sua diagonal espacial.",
            "alternativas": [
                {
                    "texto": "√133 cm"
                },
                {
                    "texto": "11 cm"
                },
                {
                    "texto": "10 cm"
                },
                {
                    "texto": "12 cm"
                }
            ],
            "explicacao": "PASSO A PASSO:\nPelo teorema de Pitágoras no espaço, d²=4²+6²+9²=133. Portanto d=√133 cm, aproximadamente 11,53 cm.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma PA tem a₁=5 e razão 3. Determine a soma dos 12 primeiros termos.",
            "alternativas": [
                {
                    "texto": "258"
                },
                {
                    "texto": "246"
                },
                {
                    "texto": "270"
                },
                {
                    "texto": "252"
                }
            ],
            "explicacao": "PASSO A PASSO:\nO 12º termo é 5+11×3=38. A soma é S₁₂=12(5+38)/2=258.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        },
        {
            "pergunta": "Uma função quadrática tem raízes 1 e 5 e passa pelo ponto (2,−6). Determine f(0).",
            "alternativas": [
                {
                    "texto": "10"
                },
                {
                    "texto": "−10"
                },
                {
                    "texto": "−5"
                },
                {
                    "texto": "15"
                }
            ],
            "explicacao": "PASSO A PASSO:\nComo as raízes são 1 e 5, f(x)=a(x−1)(x−5). Usando f(2)=−6: −3a=−6, então a=2. Logo f(0)=2×(−1)×(−5)=10.\n\nCOMO EVITAR O ERRO:\nConfira as condições do enunciado, os sinais e as unidades. Quando houver raízes, logaritmos ou denominadores, valide o resultado na expressão original.",
            "dificuldade": "Difícil"
        }
    ]
};


// =====================================================
// ESTADO ATUAL
// =====================================================

let nivelAtual = 4;

let faseAtual = 1;

let questaoAtual = 1;

let respostas = {};

let alternativasSelecionadas = {};

let progressoBancoNiveis = {};

let tentativasBancoNivel4 = {};

let inicioFase = null;

let faseFinalizada = false;

let respostaEmEnvio = false;

let modoRevisao = false;

let idSessaoRevisao = null;


// =====================================================
// CARREGAR PROGRESSO DO NÍVEL 4 NO SUPABASE
// =====================================================

async function carregarProgressoBancoNivel4() {

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
                .eq("level_number", 4),

            supabaseClient
                .from("user_question_attempts")
                .select("question_id, selected_option_id, is_correct")
                .eq("activity_type", "nivel")
                .like("question_id", "nivel:4:fase:%"),

            supabaseClient
                .from("user_progress")
                .select("total_xp")
                .maybeSingle()

        ]);

    if (resultadoFases.error) throw resultadoFases.error;
    if (resultadoTentativas.error) throw resultadoTentativas.error;
    if (resultadoXP.error) throw resultadoXP.error;

    progressoBancoNiveis = {};
    tentativasBancoNivel4 = {};

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
            /^nivel:4:fase:(\d+):questao:(\d+)$/
        );

        if (!identificacao) return;

        const numeroFase = Number(identificacao[1]);
        const numeroQuestao = Number(identificacao[2]);

        if (!tentativasBancoNivel4[numeroFase]) {
            tentativasBancoNivel4[numeroFase] = {};
        }

        tentativasBancoNivel4[numeroFase][numeroQuestao] = {
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
        questoesNivel4[numeroFase] || []
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
        fasesNivel4[faseAtual];


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
    const rotuloDificuldade = document.getElementById("dificuldadeQuestao");

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
        if (rotuloDificuldade) {
            rotuloDificuldade.hidden = true;
            rotuloDificuldade.textContent = "";
        }
        atualizarBotoesNavegacao();
        return;
    }

    textoQuestao.textContent = questao.pergunta;

    if (rotuloDificuldade) {
        rotuloDificuldade.textContent = questao.dificuldade || "Médio";
        rotuloDificuldade.dataset.dificuldade =
            questao.dificuldade === "Difícil" ? "dificil" : "medio";
        rotuloDificuldade.hidden = false;
    }
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
                    "nivel:4:fase:" + faseAtual + ":questao:" + questaoAtual;

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



function registrarAcessoFaseNivel4(numeroFase) {

    if (typeof registrarUltimaAtividade !== "function") return;

    const dadosFase = fasesNivel4[numeroFase];

    const nomeFase = dadosFase
        ? dadosFase.nome
        : "Praticando";

    registrarUltimaAtividade(
        "nivel4_fase_" + numeroFase,
        "Nível 4 • Fase " + numeroFase + ": " + nomeFase,
        "nivel4.html"
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

    registrarAcessoFaseNivel4(numeroFase);

    const dadosFase = obterDadosFase(nivelAtual, faseAtual);
    const dadosBanco = progressoBancoNiveis[faseAtual] || {};

    questaoAtual = Math.min(
        Math.max(Number(dadosBanco.questaoAtual) || 1, 1),
        TOTAL_QUESTOES
    );

    respostas = { ...(dadosBanco.respostas || {}) };
    alternativasSelecionadas = {};

    const tentativas = tentativasBancoNivel4[faseAtual] || {};

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
            fasesNivel4[numero];


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

function configurarEventosNivel4() {

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

async function restaurarRevisaoAtivaNivel4() {

    const { data: revisao, error: erroRevisao } = await supabaseClient
        .from("user_phase_review_sessions")
        .select("id, phase_number, review_number, completed")
        .eq("level_number", 4)
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
    registrarAcessoFaseNivel4(faseAtual);
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
// INICIALIZAÇÃO DO NÍVEL 4
// =====================================================

async function inicializarNivel4() {

    if (typeof usuarioTemAcessoPremium === "function") {
        const acessoPremium = await usuarioTemAcessoPremium();
        if (!acessoPremium) {
            window.location.replace("atividades.html");
            return;
        }
    }

    configurarEventosNivel4();

    try {
        await carregarProgressoBancoNivel4();
    } catch (erro) {

        console.error(
            "Não foi possível carregar o progresso do Nível 4:",
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
        revisaoRestaurada = await restaurarRevisaoAtivaNivel4();
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
        inicializarNivel4
    );

} else {

    inicializarNivel4();

}   
