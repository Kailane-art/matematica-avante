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
// CONFIGURAÇÃO DAS FASES — NÍVEL 1
// =====================================================
//
// Fases 1 a 4:
// Conteúdo básico.
//
// Fases 5 a 8:
// Repetem as matérias, mas com questões
// um pouco mais difíceis.
//
// Fases 9 e 10:
// Revisão e desafio final.
//
// Mantemos dificuldade fácil e média.
// =====================================================

const fasesNivel1 = {

    1: {
        nome: "Básico da Matemática",
        descricao: "As quatro operações fundamentais.",
        dificuldade: "Fácil"
    },

    2: {
        nome: "Geometria",
        descricao: "Formas, medidas e conceitos geométricos.",
        dificuldade: "Fácil"
    },

    3: {
        nome: "Funções",
        descricao: "Introdução ao conceito de funções.",
        dificuldade: "Fácil"
    },

    4: {
        nome: "Álgebra",
        descricao: "Expressões e cálculos algébricos básicos.",
        dificuldade: "Fácil"
    },

    5: {
        nome: "Básico da Matemática",
        descricao: "Praticando novamente as quatro operações.",
        dificuldade: "Médio"
    },

    6: {
        nome: "Geometria",
        descricao: "Novos exercícios de geometria.",
        dificuldade: "Médio"
    },

    7: {
        nome: "Funções",
        descricao: "Exercícios de funções em nível médio.",
        dificuldade: "Médio"
    },

    8: {
        nome: "Álgebra",
        descricao: "Exercícios de álgebra em nível médio.",
        dificuldade: "Médio"
    },

    9: {
        nome: "Revisão mista",
        descricao: "Questões envolvendo diferentes conteúdos.",
        dificuldade: "Médio"
    },

    10: {
        nome: "Desafio final",
        descricao: "Questões mistas para concluir o nível.",
        dificuldade: "Médio"
    }

};


// =====================================================
// BANCO DE QUESTÕES — NÍVEL 1
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

const questoesNivel1 = {

   1: [

    {
        pergunta: "Quanto é 24 + 15?",

        alternativas: [
            { texto: "39" },
            { texto: "38" },
            { texto: "40" },
            { texto: "41" }
        ],

        explicacao:
            "24 + 15 = 39. Podemos somar primeiro as unidades: 4 + 5 = 9. Depois, as dezenas: 2 + 1 = 3."
    },


    {
        pergunta: "Quanto é 57 - 23?",

        alternativas: [
            { texto: "34" },
            { texto: "33" },
            { texto: "35" },
            { texto: "36" }
        ],

        explicacao:
            "57 - 23 = 34. Subtraímos 20 de 57, obtendo 37, e depois subtraímos 3, chegando a 34."
    },


    {
        pergunta: "Quanto é 7 × 6?",

        alternativas: [
            { texto: "42" },
            { texto: "36" },
            { texto: "48" },
            { texto: "40" }
        ],

        explicacao:
            "7 × 6 = 42. A multiplicação representa seis grupos de 7, ou sete grupos de 6."
    },


    {
        pergunta: "Quanto é 48 ÷ 6?",

        alternativas: [
            { texto: "8" },
            { texto: "6" },
            { texto: "7" },
            { texto: "9" }
        ],

        explicacao:
            "48 ÷ 6 = 8, porque 6 × 8 = 48."
    },


    {
        pergunta: "Quanto é 35 + 27?",

        alternativas: [
            { texto: "62" },
            { texto: "61" },
            { texto: "63" },
            { texto: "64" }
        ],

        explicacao:
            "35 + 27 = 62. Somamos 30 + 20 = 50 e 5 + 7 = 12. Então 50 + 12 = 62."
    },


    {
        pergunta: "Quanto é 81 - 46?",

        alternativas: [
            { texto: "35" },
            { texto: "34" },
            { texto: "36" },
            { texto: "37" }
        ],

        explicacao:
            "81 - 46 = 35. Podemos fazer 81 - 40 = 41 e depois 41 - 6 = 35."
    },


    {
        pergunta: "Quanto é 8 × 4?",

        alternativas: [
            { texto: "32" },
            { texto: "28" },
            { texto: "30" },
            { texto: "36" }
        ],

        explicacao:
            "8 × 4 = 32. Isso significa somar 8 quatro vezes: 8 + 8 + 8 + 8 = 32."
    },


    {
        pergunta: "Quanto é 72 ÷ 9?",

        alternativas: [
            { texto: "8" },
            { texto: "7" },
            { texto: "9" },
            { texto: "6" }
        ],

        explicacao:
            "72 ÷ 9 = 8, porque 9 × 8 = 72."
    },


    {
        pergunta: "Quanto é 18 + 26 - 10?",

        alternativas: [
            { texto: "34" },
            { texto: "32" },
            { texto: "36" },
            { texto: "38" }
        ],

        explicacao:
            "Primeiro fazemos 18 + 26 = 44. Depois 44 - 10 = 34."
    },


    {
        pergunta: "Quanto é 5 × 7 + 3?",

        alternativas: [
            { texto: "38" },
            { texto: "35" },
            { texto: "40" },
            { texto: "42" }
        ],

        explicacao:
            "Primeiro fazemos a multiplicação: 5 × 7 = 35. Depois adicionamos 3: 35 + 3 = 38."
    }

], 

    2: [

    {
        pergunta: "Quantos lados tem um triângulo?",

        alternativas: [
            { texto: "3" },
            { texto: "4" },
            { texto: "5" },
            { texto: "6" }
        ],

        explicacao:
            "Um triângulo é uma figura geométrica formada por 3 lados e 3 ângulos."
    },


    {
        pergunta: "Quantos lados tem um quadrado?",

        alternativas: [
            { texto: "4" },
            { texto: "3" },
            { texto: "5" },
            { texto: "6" }
        ],

        explicacao:
            "Um quadrado possui 4 lados de mesma medida e 4 ângulos retos."
    },


    {
        pergunta: "Qual figura possui 3 lados?",

        alternativas: [
            { texto: "Triângulo" },
            { texto: "Quadrado" },
            { texto: "Círculo" },
            { texto: "Retângulo" }
        ],

        explicacao:
            "O triângulo é a figura geométrica que possui exatamente 3 lados."
    },


    {
        pergunta: "Quantos lados tem um pentágono?",

        alternativas: [
            { texto: "5" },
            { texto: "4" },
            { texto: "6" },
            { texto: "7" }
        ],

        explicacao:
            "O prefixo 'penta' indica cinco. Portanto, um pentágono possui 5 lados."
    },


    {
        pergunta: "Um quadrado possui lados de 5 cm. Qual é o seu perímetro?",

        alternativas: [
            { texto: "20 cm" },
            { texto: "15 cm" },
            { texto: "10 cm" },
            { texto: "25 cm" }
        ],

        explicacao:
            "O perímetro é a soma dos quatro lados. Então: 5 + 5 + 5 + 5 = 20 cm."
    },


    {
        pergunta: "Qual figura geométrica não possui lados?",

        alternativas: [
            { texto: "Círculo" },
            { texto: "Triângulo" },
            { texto: "Quadrado" },
            { texto: "Pentágono" }
        ],

        explicacao:
            "O círculo não possui lados retos nem vértices."
    },


    {
        pergunta: "Um retângulo tem 6 cm de comprimento e 3 cm de largura. Qual é o perímetro?",

        alternativas: [
            { texto: "18 cm" },
            { texto: "12 cm" },
            { texto: "9 cm" },
            { texto: "20 cm" }
        ],

        explicacao:
            "O perímetro do retângulo é 2 × (comprimento + largura). Então: 2 × (6 + 3) = 18 cm."
    },


    {
        pergunta: "Quantos vértices possui um quadrado?",

        alternativas: [
            { texto: "4" },
            { texto: "3" },
            { texto: "5" },
            { texto: "6" }
        ],

        explicacao:
            "Um quadrado possui 4 vértices, um em cada encontro de seus lados."
    },


    {
        pergunta: "Qual destas figuras possui quatro lados?",

        alternativas: [
            { texto: "Retângulo" },
            { texto: "Triângulo" },
            { texto: "Pentágono" },
            { texto: "Círculo" }
        ],

        explicacao:
            "O retângulo é um quadrilátero, portanto possui 4 lados."
    },


    {
        pergunta: "Um quadrado tem lado de 4 cm. Qual é o seu perímetro?",

        alternativas: [
            { texto: "16 cm" },
            { texto: "12 cm" },
            { texto: "8 cm" },
            { texto: "20 cm" }
        ],

        explicacao:
            "Como o quadrado possui quatro lados iguais: 4 × 4 = 16 cm."
    }

],  

   3: [

    {
        pergunta: "Qual é o valor de f(2) na função f(x) = x + 3?",

        alternativas: [
            { texto: "5" },
            { texto: "4" },
            { texto: "6" },
            { texto: "3" }
        ],

        explicacao:
            "Substituímos x por 2: f(2) = 2 + 3 = 5."
    },


    {
        pergunta: "Na função f(x) = x + 1, qual é o valor de f(4)?",

        alternativas: [
            { texto: "5" },
            { texto: "4" },
            { texto: "3" },
            { texto: "6" }
        ],

        explicacao:
            "Substituindo x por 4: f(4) = 4 + 1 = 5."
    },


    {
        pergunta: "Se f(x) = 2x, qual é o valor de f(3)?",

        alternativas: [
            { texto: "6" },
            { texto: "5" },
            { texto: "3" },
            { texto: "9" }
        ],

        explicacao:
            "Substituímos x por 3: f(3) = 2 × 3 = 6."
    },


    {
        pergunta: "Na função f(x) = x - 2, qual é o valor de f(5)?",

        alternativas: [
            { texto: "3" },
            { texto: "2" },
            { texto: "7" },
            { texto: "5" }
        ],

        explicacao:
            "Substituindo x por 5: f(5) = 5 - 2 = 3."
    },


    {
        pergunta: "Qual é o valor de f(0) na função f(x) = x + 7?",

        alternativas: [
            { texto: "7" },
            { texto: "0" },
            { texto: "1" },
            { texto: "8" }
        ],

        explicacao:
            "Substituindo x por 0: f(0) = 0 + 7 = 7."
    },


    {
        pergunta: "Se f(x) = 3x, qual é o valor de f(2)?",

        alternativas: [
            { texto: "6" },
            { texto: "5" },
            { texto: "3" },
            { texto: "9" }
        ],

        explicacao:
            "Substituindo x por 2: f(2) = 3 × 2 = 6."
    },


    {
        pergunta: "Na função f(x) = x + 5, qual é o valor de f(1)?",

        alternativas: [
            { texto: "6" },
            { texto: "5" },
            { texto: "4" },
            { texto: "7" }
        ],

        explicacao:
            "Substituindo x por 1: f(1) = 1 + 5 = 6."
    },


    {
        pergunta: "Se f(x) = x - 1, qual é o valor de f(6)?",

        alternativas: [
            { texto: "5" },
            { texto: "6" },
            { texto: "7" },
            { texto: "4" }
        ],

        explicacao:
            "Substituindo x por 6: f(6) = 6 - 1 = 5."
    },


    {
        pergunta: "Se f(x) = 2x + 1, qual é o valor de f(2)?",

        alternativas: [
            { texto: "5" },
            { texto: "4" },
            { texto: "3" },
            { texto: "6" }
        ],

        explicacao:
            "Substituindo x por 2: f(2) = 2 × 2 + 1 = 5."
    },


    {
        pergunta: "Na função f(x) = x + 2, qual é o valor de f(3)?",

        alternativas: [
            { texto: "5" },
            { texto: "6" },
            { texto: "4" },
            { texto: "3" }
        ],

        explicacao:
            "Substituindo x por 3: f(3) = 3 + 2 = 5."
    }

],   

   4: [

    {
        pergunta: "Quanto vale x na equação x + 3 = 7?",

        alternativas: [
            { texto: "4" },
            { texto: "3" },
            { texto: "5" },
            { texto: "10" }
        ],

        explicacao:
            "Para encontrar x, fazemos 7 - 3. Portanto, x = 4."
    },


    {
        pergunta: "Quanto vale x na equação x - 2 = 5?",

        alternativas: [
            { texto: "7" },
            { texto: "3" },
            { texto: "5" },
            { texto: "10" }
        ],

        explicacao:
            "Somamos 2 aos dois lados: x = 5 + 2 = 7."
    },


    {
        pergunta: "Quanto vale x na equação 2x = 10?",

        alternativas: [
            { texto: "5" },
            { texto: "2" },
            { texto: "8" },
            { texto: "12" }
        ],

        explicacao:
            "Dividimos os dois lados por 2: x = 10 ÷ 2 = 5."
    },


    {
        pergunta: "Quanto vale x na equação x + 6 = 10?",

        alternativas: [
            { texto: "4" },
            { texto: "6" },
            { texto: "16" },
            { texto: "3" }
        ],

        explicacao:
            "Subtraímos 6 dos dois lados: x = 10 - 6 = 4."
    },


    {
        pergunta: "Qual é o valor de 3x quando x = 4?",

        alternativas: [
            { texto: "12" },
            { texto: "7" },
            { texto: "9" },
            { texto: "16" }
        ],

        explicacao:
            "Substituímos x por 4: 3 × 4 = 12."
    },


    {
        pergunta: "Quanto vale x na equação x - 5 = 3?",

        alternativas: [
            { texto: "8" },
            { texto: "2" },
            { texto: "5" },
            { texto: "15" }
        ],

        explicacao:
            "Somamos 5 aos dois lados: x = 3 + 5 = 8."
    },


    {
        pergunta: "Quanto vale x na equação 3x = 15?",

        alternativas: [
            { texto: "5" },
            { texto: "3" },
            { texto: "12" },
            { texto: "18" }
        ],

        explicacao:
            "Dividimos 15 por 3: x = 15 ÷ 3 = 5."
    },


    {
        pergunta: "Se x = 5, qual é o valor de x + 4?",

        alternativas: [
            { texto: "9" },
            { texto: "1" },
            { texto: "20" },
            { texto: "8" }
        ],

        explicacao:
            "Substituímos x por 5: 5 + 4 = 9."
    },


    {
        pergunta: "Quanto vale x na equação x + 8 = 12?",

        alternativas: [
            { texto: "4" },
            { texto: "8" },
            { texto: "20" },
            { texto: "3" }
        ],

        explicacao:
            "Subtraímos 8 dos dois lados: x = 12 - 8 = 4."
    },


    {
        pergunta: "Se x = 3, qual é o valor de 2x + 1?",

        alternativas: [
            { texto: "7" },
            { texto: "6" },
            { texto: "5" },
            { texto: "8" }
        ],

        explicacao:
            "Substituímos x por 3: 2 × 3 + 1 = 6 + 1 = 7."
    }

], 

    5: [

    {
        pergunta: "Quanto é 48 + 37?",

        alternativas: [
            { texto: "85" },
            { texto: "75" },
            { texto: "84" },
            { texto: "95" }
        ],

        explicacao:
            "Somando 48 + 37, temos 85."
    },


    {
        pergunta: "Quanto é 96 - 47?",

        alternativas: [
            { texto: "49" },
            { texto: "39" },
            { texto: "59" },
            { texto: "51" }
        ],

        explicacao:
            "Fazendo 96 - 47, obtemos 49."
    },


    {
        pergunta: "Quanto é 14 × 6?",

        alternativas: [
            { texto: "84" },
            { texto: "74" },
            { texto: "94" },
            { texto: "80" }
        ],

        explicacao:
            "14 × 6 = 84."
    },


    {
        pergunta: "Quanto é 144 ÷ 12?",

        alternativas: [
            { texto: "12" },
            { texto: "10" },
            { texto: "14" },
            { texto: "24" }
        ],

        explicacao:
            "144 dividido por 12 é igual a 12."
    },


    {
        pergunta: "João tinha 35 reais e gastou 18 reais. Quanto dinheiro restou?",

        alternativas: [
            { texto: "17 reais" },
            { texto: "13 reais" },
            { texto: "18 reais" },
            { texto: "23 reais" }
        ],

        explicacao:
            "Precisamos subtrair o valor gasto: 35 - 18 = 17 reais."
    },


    {
        pergunta: "Uma caixa possui 8 fileiras com 7 objetos em cada uma. Quantos objetos há ao todo?",

        alternativas: [
            { texto: "56" },
            { texto: "48" },
            { texto: "64" },
            { texto: "54" }
        ],

        explicacao:
            "São 8 fileiras com 7 objetos: 8 × 7 = 56."
    },


    {
        pergunta: "Maria tinha 72 balas e dividiu igualmente entre 8 crianças. Quantas balas cada criança recebeu?",

        alternativas: [
            { texto: "9" },
            { texto: "8" },
            { texto: "10" },
            { texto: "12" }
        ],

        explicacao:
            "Dividimos 72 por 8: 72 ÷ 8 = 9."
    },


    {
        pergunta: "Quanto é 25 + 18 - 10?",

        alternativas: [
            { texto: "33" },
            { texto: "43" },
            { texto: "23" },
            { texto: "35" }
        ],

        explicacao:
            "Primeiro fazemos 25 + 18 = 43. Depois, 43 - 10 = 33."
    },


    {
        pergunta: "Uma escola comprou 6 caixas com 12 lápis em cada caixa. Quantos lápis foram comprados?",

        alternativas: [
            { texto: "72" },
            { texto: "62" },
            { texto: "68" },
            { texto: "82" }
        ],

        explicacao:
            "Multiplicamos o número de caixas pela quantidade de lápis: 6 × 12 = 72."
    },


    {
        pergunta: "Pedro tinha 100 reais. Comprou um livro por 35 reais e um caderno por 18 reais. Quanto sobrou?",

        alternativas: [
            { texto: "47 reais" },
            { texto: "53 reais" },
            { texto: "57 reais" },
            { texto: "45 reais" }
        ],

        explicacao:
            "Primeiro somamos os gastos: 35 + 18 = 53. Depois fazemos 100 - 53 = 47 reais."
    }

], 
    6: [

    {
        pergunta: "Um quadrado possui lado de 6 cm. Qual é o seu perímetro?",

        alternativas: [
            { texto: "24 cm" },
            { texto: "12 cm" },
            { texto: "18 cm" },
            { texto: "36 cm" }
        ],

        explicacao:
            "O perímetro do quadrado é 4 × lado. Então, 4 × 6 = 24 cm."
    },


    {
        pergunta: "Um retângulo possui 8 cm de comprimento e 5 cm de largura. Qual é a sua área?",

        alternativas: [
            { texto: "40 cm²" },
            { texto: "26 cm²" },
            { texto: "13 cm²" },
            { texto: "35 cm²" }
        ],

        explicacao:
            "A área do retângulo é comprimento × largura. Então, 8 × 5 = 40 cm²."
    },


    {
        pergunta: "Um triângulo possui base de 10 cm e altura de 6 cm. Qual é sua área?",

        alternativas: [
            { texto: "30 cm²" },
            { texto: "60 cm²" },
            { texto: "16 cm²" },
            { texto: "36 cm²" }
        ],

        explicacao:
            "A área do triângulo é (base × altura) ÷ 2. Então, (10 × 6) ÷ 2 = 30 cm²."
    },


    {
        pergunta: "Um retângulo possui perímetro de 30 cm. Se o comprimento é 10 cm, qual é a largura?",

        alternativas: [
            { texto: "5 cm" },
            { texto: "10 cm" },
            { texto: "15 cm" },
            { texto: "3 cm" }
        ],

        explicacao:
            "O perímetro é 2 × (comprimento + largura). Então, 30 ÷ 2 = 15. Como 15 - 10 = 5, a largura é 5 cm."
    },


    {
        pergunta: "Quantos lados possui um hexágono?",

        alternativas: [
            { texto: "6" },
            { texto: "5" },
            { texto: "7" },
            { texto: "8" }
        ],

        explicacao:
            "O prefixo 'hexa-' indica seis. Portanto, um hexágono possui 6 lados."
    },


    {
        pergunta: "Um quadrado possui área de 49 cm². Quanto mede cada lado?",

        alternativas: [
            { texto: "7 cm" },
            { texto: "6 cm" },
            { texto: "8 cm" },
            { texto: "14 cm" }
        ],

        explicacao:
            "A área do quadrado é lado × lado. Como 7 × 7 = 49, cada lado mede 7 cm."
    },


    {
        pergunta: "Um retângulo possui comprimento de 12 cm e largura de 4 cm. Qual é o perímetro?",

        alternativas: [
            { texto: "32 cm" },
            { texto: "48 cm" },
            { texto: "24 cm" },
            { texto: "16 cm" }
        ],

        explicacao:
            "O perímetro é 2 × (12 + 4) = 2 × 16 = 32 cm."
    },


    {
        pergunta: "Um triângulo possui lados de 5 cm, 7 cm e 8 cm. Qual é o seu perímetro?",

        alternativas: [
            { texto: "20 cm" },
            { texto: "18 cm" },
            { texto: "21 cm" },
            { texto: "24 cm" }
        ],

        explicacao:
            "Somamos os três lados: 5 + 7 + 8 = 20 cm."
    },


    {
        pergunta: "Um quadrado possui lado de 9 cm. Qual é a sua área?",

        alternativas: [
            { texto: "81 cm²" },
            { texto: "36 cm²" },
            { texto: "18 cm²" },
            { texto: "90 cm²" }
        ],

        explicacao:
            "A área do quadrado é lado × lado. Então, 9 × 9 = 81 cm²."
    },


    {
        pergunta: "Uma figura possui 4 lados iguais e 4 ângulos retos. Qual é essa figura?",

        alternativas: [
            { texto: "Quadrado" },
            { texto: "Triângulo" },
            { texto: "Círculo" },
            { texto: "Pentágono" }
        ],

        explicacao:
            "Um quadrado possui quatro lados iguais e quatro ângulos retos."
    }

], 

    7: [

    {
        pergunta: "Considere a função f(x) = x + 3. Qual é o valor de f(5)?",

        alternativas: [
            { texto: "8" },
            { texto: "7" },
            { texto: "9" },
            { texto: "15" }
        ],

        explicacao:
            "Substituímos x por 5: f(5) = 5 + 3 = 8."
    },


    {
        pergunta: "Considere a função f(x) = 2x. Qual é o valor de f(7)?",

        alternativas: [
            { texto: "14" },
            { texto: "9" },
            { texto: "12" },
            { texto: "16" }
        ],

        explicacao:
            "Substituímos x por 7: f(7) = 2 × 7 = 14."
    },


    {
        pergunta: "Se f(x) = x - 4, qual é o valor de f(10)?",

        alternativas: [
            { texto: "6" },
            { texto: "14" },
            { texto: "4" },
            { texto: "5" }
        ],

        explicacao:
            "Substituímos x por 10: f(10) = 10 - 4 = 6."
    },


    {
        pergunta: "Uma função é dada por f(x) = 3x + 1. Qual é o valor de f(4)?",

        alternativas: [
            { texto: "13" },
            { texto: "12" },
            { texto: "10" },
            { texto: "15" }
        ],

        explicacao:
            "Substituímos x por 4: f(4) = 3 × 4 + 1 = 12 + 1 = 13."
    },


    {
        pergunta: "Observe a função f(x) = 5x. Quando x aumenta de 2 para 3, quanto aumenta o valor de f(x)?",

        alternativas: [
            { texto: "5" },
            { texto: "1" },
            { texto: "10" },
            { texto: "15" }
        ],

        explicacao:
            "f(2) = 10 e f(3) = 15. A diferença é 15 - 10 = 5."
    },


    {
        pergunta: "Se f(x) = x + 10, qual valor de x faz com que f(x) seja igual a 18?",

        alternativas: [
            { texto: "8" },
            { texto: "10" },
            { texto: "28" },
            { texto: "9" }
        ],

        explicacao:
            "Precisamos resolver x + 10 = 18. Portanto, x = 8."
    },


    {
        pergunta: "Uma função associa cada número ao seu dobro. Qual expressão representa essa função?",

        alternativas: [
            { texto: "f(x) = 2x" },
            { texto: "f(x) = x + 2" },
            { texto: "f(x) = x - 2" },
            { texto: "f(x) = x ÷ 2" }
        ],

        explicacao:
            "O dobro de um número x é obtido multiplicando x por 2. Portanto, f(x) = 2x."
    },


    {
        pergunta: "Considere f(x) = x². Qual é o valor de f(6)?",

        alternativas: [
            { texto: "36" },
            { texto: "12" },
            { texto: "18" },
            { texto: "30" }
        ],

        explicacao:
            "f(6) = 6² = 6 × 6 = 36."
    },


    {
        pergunta: "Se f(x) = 4x - 2, qual é o valor de f(3)?",

        alternativas: [
            { texto: "10" },
            { texto: "12" },
            { texto: "8" },
            { texto: "14" }
        ],

        explicacao:
            "f(3) = 4 × 3 - 2 = 12 - 2 = 10."
    },


    {
        pergunta: "Uma função é definida por f(x) = x + 2. Qual é o valor de x quando f(x) = 15?",

        alternativas: [
            { texto: "13" },
            { texto: "17" },
            { texto: "12" },
            { texto: "10" }
        ],

        explicacao:
            "Precisamos resolver x + 2 = 15. Subtraindo 2 dos dois lados, temos x = 13."
    }

],  

  8: [

    {
        pergunta: "Qual é o valor de x na equação x + 7 = 15?",

        alternativas: [
            { texto: "8" },
            { texto: "7" },
            { texto: "9" },
            { texto: "22" }
        ],

        explicacao:
            "Subtraindo 7 dos dois lados: x = 15 - 7 = 8."
    },


    {
        pergunta: "Qual é o valor de x na equação x - 9 = 6?",

        alternativas: [
            { texto: "15" },
            { texto: "3" },
            { texto: "14" },
            { texto: "17" }
        ],

        explicacao:
            "Somamos 9 aos dois lados: x = 6 + 9 = 15."
    },


    {
        pergunta: "Qual é o valor de x na equação 3x = 21?",

        alternativas: [
            { texto: "7" },
            { texto: "6" },
            { texto: "8" },
            { texto: "9" }
        ],

        explicacao:
            "Dividimos os dois lados por 3: x = 21 ÷ 3 = 7."
    },


    {
        pergunta: "Qual é o valor de x na equação 2x + 5 = 17?",

        alternativas: [
            { texto: "6" },
            { texto: "5" },
            { texto: "7" },
            { texto: "11" }
        ],

        explicacao:
            "Primeiro: 2x = 17 - 5 = 12. Depois: x = 12 ÷ 2 = 6."
    },


    {
        pergunta: "Simplifique a expressão 4x + 3x.",

        alternativas: [
            { texto: "7x" },
            { texto: "12x" },
            { texto: "7" },
            { texto: "x + 7" }
        ],

        explicacao:
            "Somamos os coeficientes dos termos semelhantes: 4x + 3x = 7x."
    },


    {
        pergunta: "Qual é o valor de x na equação 5x - 10 = 20?",

        alternativas: [
            { texto: "6" },
            { texto: "4" },
            { texto: "5" },
            { texto: "8" }
        ],

        explicacao:
            "Primeiro: 5x = 20 + 10 = 30. Depois: x = 30 ÷ 5 = 6."
    },


    {
        pergunta: "Qual expressão representa o dobro de um número x aumentado em 5?",

        alternativas: [
            { texto: "2x + 5" },
            { texto: "2(x + 5)" },
            { texto: "x + 10" },
            { texto: "5x + 2" }
        ],

        explicacao:
            "O dobro de x é 2x. Aumentando esse resultado em 5, temos 2x + 5."
    },


    {
        pergunta: "Qual é o valor de x na equação 4x + 4 = 20?",

        alternativas: [
            { texto: "4" },
            { texto: "5" },
            { texto: "6" },
            { texto: "16" }
        ],

        explicacao:
            "Primeiro: 4x = 20 - 4 = 16. Depois: x = 16 ÷ 4 = 4."
    },


    {
        pergunta: "Simplifique a expressão 9x - 4x.",

        alternativas: [
            { texto: "5x" },
            { texto: "13x" },
            { texto: "36x" },
            { texto: "5" }
        ],

        explicacao:
            "Subtraímos os coeficientes: 9x - 4x = 5x."
    },


    {
        pergunta: "Qual é o valor de x na equação 3x + 6 = 24?",

        alternativas: [
            { texto: "6" },
            { texto: "8" },
            { texto: "9" },
            { texto: "10" }
        ],

        explicacao:
            "Primeiro: 3x = 24 - 6 = 18. Depois: x = 18 ÷ 3 = 6."
    }

], 

   9: [

    {
        pergunta: "Quanto é 24 ÷ 6 + 5?",

        alternativas: [
            { texto: "9" },
            { texto: "4" },
            { texto: "14" },
            { texto: "29" }
        ],

        explicacao:
            "Primeiro fazemos a divisão: 24 ÷ 6 = 4. Depois somamos 5: 4 + 5 = 9."
    },


    {
        pergunta: "Um quadrado possui lado de 8 cm. Qual é sua área?",

        alternativas: [
            { texto: "64 cm²" },
            { texto: "32 cm²" },
            { texto: "24 cm²" },
            { texto: "16 cm²" }
        ],

        explicacao:
            "A área do quadrado é lado × lado. Então, 8 × 8 = 64 cm²."
    },


    {
        pergunta: "Considere f(x) = 2x + 1. Qual é o valor de f(5)?",

        alternativas: [
            { texto: "11" },
            { texto: "10" },
            { texto: "12" },
            { texto: "7" }
        ],

        explicacao:
            "Substituímos x por 5: f(5) = 2 × 5 + 1 = 10 + 1 = 11."
    },


    {
        pergunta: "Qual é o valor de x na equação 2x + 4 = 18?",

        alternativas: [
            { texto: "7" },
            { texto: "6" },
            { texto: "8" },
            { texto: "9" }
        ],

        explicacao:
            "Primeiro: 2x = 18 - 4 = 14. Depois: x = 14 ÷ 2 = 7."
    },


    {
        pergunta: "Um retângulo possui 9 cm de comprimento e 4 cm de largura. Qual é seu perímetro?",

        alternativas: [
            { texto: "26 cm" },
            { texto: "36 cm" },
            { texto: "13 cm" },
            { texto: "18 cm" }
        ],

        explicacao:
            "O perímetro é 2 × (9 + 4) = 2 × 13 = 26 cm."
    },


    {
        pergunta: "Quanto é 7 × 8 - 10?",

        alternativas: [
            { texto: "46" },
            { texto: "54" },
            { texto: "56" },
            { texto: "38" }
        ],

        explicacao:
            "Primeiro fazemos a multiplicação: 7 × 8 = 56. Depois subtraímos 10: 56 - 10 = 46."
    },


    {
        pergunta: "Se f(x) = x - 3, qual é o valor de x quando f(x) = 9?",

        alternativas: [
            { texto: "12" },
            { texto: "6" },
            { texto: "9" },
            { texto: "3" }
        ],

        explicacao:
            "Temos x - 3 = 9. Somando 3 aos dois lados, encontramos x = 12."
    },


    {
        pergunta: "Qual é o valor de x na equação 5x = 45?",

        alternativas: [
            { texto: "9" },
            { texto: "8" },
            { texto: "10" },
            { texto: "40" }
        ],

        explicacao:
            "Dividimos 45 por 5: x = 45 ÷ 5 = 9."
    },


    {
        pergunta: "Um triângulo possui base de 12 cm e altura de 5 cm. Qual é sua área?",

        alternativas: [
            { texto: "30 cm²" },
            { texto: "60 cm²" },
            { texto: "17 cm²" },
            { texto: "25 cm²" }
        ],

        explicacao:
            "A área do triângulo é (base × altura) ÷ 2. Então, (12 × 5) ÷ 2 = 30 cm²."
    },


    {
        pergunta: "Simplifique a expressão 6x + 2x - 3x.",

        alternativas: [
            { texto: "5x" },
            { texto: "11x" },
            { texto: "8x" },
            { texto: "5" }
        ],

        explicacao:
            "Somamos e subtraímos os coeficientes: 6 + 2 - 3 = 5. Portanto, o resultado é 5x."
    }

], 

    10: [

    {
        pergunta: "Uma loja vende um produto por R$ 80,00 e oferece R$ 15,00 de desconto. Qual será o preço final?",

        alternativas: [
            { texto: "R$ 65,00" },
            { texto: "R$ 70,00" },
            { texto: "R$ 95,00" },
            { texto: "R$ 55,00" }
        ],

        explicacao:
            "Subtraímos o desconto do preço original: 80 - 15 = 65. Portanto, o preço final é R$ 65,00."
    },


    {
        pergunta: "Um retângulo possui 12 cm de comprimento e 5 cm de largura. Qual é a sua área?",

        alternativas: [
            { texto: "60 cm²" },
            { texto: "34 cm²" },
            { texto: "17 cm²" },
            { texto: "24 cm²" }
        ],

        explicacao:
            "A área do retângulo é comprimento × largura: 12 × 5 = 60 cm²."
    },


    {
        pergunta: "Considere f(x) = 3x - 2. Qual é o valor de f(6)?",

        alternativas: [
            { texto: "16" },
            { texto: "18" },
            { texto: "20" },
            { texto: "14" }
        ],

        explicacao:
            "Substituímos x por 6: f(6) = 3 × 6 - 2 = 18 - 2 = 16."
    },


    {
        pergunta: "Qual é o valor de x na equação 4x + 8 = 28?",

        alternativas: [
            { texto: "5" },
            { texto: "6" },
            { texto: "7" },
            { texto: "4" }
        ],

        explicacao:
            "Primeiro: 4x = 28 - 8 = 20. Depois: x = 20 ÷ 4 = 5."
    },


    {
        pergunta: "Um triângulo possui lados de 6 cm, 8 cm e 10 cm. Qual é o seu perímetro?",

        alternativas: [
            { texto: "24 cm" },
            { texto: "20 cm" },
            { texto: "26 cm" },
            { texto: "48 cm" }
        ],

        explicacao:
            "O perímetro é a soma dos três lados: 6 + 8 + 10 = 24 cm."
    },


    {
        pergunta: "Quanto é 36 ÷ 4 + 7 × 2?",

        alternativas: [
            { texto: "23" },
            { texto: "32" },
            { texto: "25" },
            { texto: "16" }
        ],

        explicacao:
            "Primeiro fazemos divisão e multiplicação: 36 ÷ 4 = 9 e 7 × 2 = 14. Depois somamos: 9 + 14 = 23."
    },


    {
        pergunta: "Se f(x) = x + 5 e f(x) = 17, qual é o valor de x?",

        alternativas: [
            { texto: "12" },
            { texto: "10" },
            { texto: "22" },
            { texto: "13" }
        ],

        explicacao:
            "Temos x + 5 = 17. Subtraindo 5 dos dois lados, encontramos x = 12."
    },


    {
        pergunta: "Um quadrado possui área de 81 cm². Qual é a medida de seu lado?",

        alternativas: [
            { texto: "9 cm" },
            { texto: "8 cm" },
            { texto: "18 cm" },
            { texto: "27 cm" }
        ],

        explicacao:
            "Como a área do quadrado é lado × lado, precisamos encontrar o número que multiplicado por ele mesmo resulta em 81. Esse número é 9, pois 9 × 9 = 81."
    },


    {
        pergunta: "Simplifique a expressão 8x - 3x + 2x.",

        alternativas: [
            { texto: "7x" },
            { texto: "13x" },
            { texto: "6x" },
            { texto: "7" }
        ],

        explicacao:
            "Somamos os coeficientes: 8 - 3 + 2 = 7. Portanto, o resultado é 7x."
    },


    {
        pergunta: "Uma pessoa tinha R$ 120,00 e gastou R$ 35,00. Depois recebeu R$ 20,00. Quanto ela possui agora?",

        alternativas: [
            { texto: "R$ 105,00" },
            { texto: "R$ 85,00" },
            { texto: "R$ 100,00" },
            { texto: "R$ 75,00" }
        ],

        explicacao:
            "Primeiro subtraímos o gasto: 120 - 35 = 85. Depois somamos o valor recebido: 85 + 20 = 105. Portanto, a pessoa possui R$ 105,00."
    }

],  

};


// =====================================================
// ESTADO ATUAL
// =====================================================

let nivelAtual = 1;

let faseAtual = 1;

let questaoAtual = 1;

let respostas = {};

let alternativasSelecionadas = {};

let progressoBancoNiveis = {};

let tentativasBancoNivel1 = {};

let inicioFase = null;

let faseFinalizada = false;

let respostaEmEnvio = false;

let modoRevisao = false;

let idSessaoRevisao = null;


// =====================================================
// CARREGAR PROGRESSO DO NÍVEL 1 NO SUPABASE
// =====================================================

async function carregarProgressoBancoNivel1() {

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
                .eq("level_number", 1),

            supabaseClient
                .from("user_question_attempts")
                .select("question_id, selected_option_id, is_correct")
                .eq("activity_type", "nivel")
                .like("question_id", "nivel:1:fase:%"),

            supabaseClient
                .from("user_progress")
                .select("total_xp")
                .maybeSingle()

        ]);

    if (resultadoFases.error) throw resultadoFases.error;
    if (resultadoTentativas.error) throw resultadoTentativas.error;
    if (resultadoXP.error) throw resultadoXP.error;

    progressoBancoNiveis = {};
    tentativasBancoNivel1 = {};

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
            /^nivel:1:fase:(\d+):questao:(\d+)$/
        );

        if (!identificacao) return;

        const numeroFase = Number(identificacao[1]);
        const numeroQuestao = Number(identificacao[2]);

        if (!tentativasBancoNivel1[numeroFase]) {
            tentativasBancoNivel1[numeroFase] = {};
        }

        tentativasBancoNivel1[numeroFase][numeroQuestao] = {
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
        questoesNivel1[numeroFase] || []
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
        fasesNivel1[faseAtual];


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
                    "nivel:1:fase:" + faseAtual + ":questao:" + questaoAtual;

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

    const dadosFase = obterDadosFase(nivelAtual, faseAtual);
    const dadosBanco = progressoBancoNiveis[faseAtual] || {};

    questaoAtual = Math.min(
        Math.max(Number(dadosBanco.questaoAtual) || 1, 1),
        TOTAL_QUESTOES
    );

    respostas = { ...(dadosBanco.respostas || {}) };
    alternativasSelecionadas = {};

    const tentativas = tentativasBancoNivel1[faseAtual] || {};

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
            fasesNivel1[numero];


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

function configurarEventosNivel1() {

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
// INICIALIZAÇÃO DO NÍVEL 1
// =====================================================

async function inicializarNivel1() {

    configurarEventosNivel1();

    try {
        await carregarProgressoBancoNivel1();
    } catch (erro) {

        console.error(
            "Não foi possível carregar o progresso do Nível 1:",
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
    iniciarFase(faseAtual);

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
        inicializarNivel1
    );

} else {

    inicializarNivel1();

}   
