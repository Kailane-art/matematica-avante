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

const fasesNivel5 = {
    "1": {
        "nome": "Álgebra não linear e equações avançadas",
        "descricao": "Equações polinomiais, sistemas não lineares, módulos, radicais e parâmetros.",
        "dificuldade": "Difícil"
    },
    "2": {
        "nome": "Funções, logaritmos e modelos",
        "descricao": "Composição, inversas, domínio, imagem, exponenciais e logaritmos.",
        "dificuldade": "Difícil"
    },
    "3": {
        "nome": "Trigonometria e identidades",
        "descricao": "Identidades, equações trigonométricas, relações métricas e triângulos.",
        "dificuldade": "Difícil"
    },
    "4": {
        "nome": "Geometria plana e relações métricas",
        "descricao": "Polígonos, circunferências, semelhança, potência de ponto e áreas.",
        "dificuldade": "Difícil"
    },
    "5": {
        "nome": "Geometria analítica e cônicas",
        "descricao": "Distâncias, retas, circunferências, parábolas, elipses e áreas.",
        "dificuldade": "Difícil"
    },
    "6": {
        "nome": "Geometria espacial e sólidos",
        "descricao": "Volumes, áreas, diagonais, prismas, cilindros, cones e esferas.",
        "dificuldade": "Difícil"
    },
    "7": {
        "nome": "Análise combinatória",
        "descricao": "Permutações, arranjos, combinações e contagem com restrições.",
        "dificuldade": "Difícil"
    },
    "8": {
        "nome": "Probabilidade avançada",
        "descricao": "Eventos independentes, probabilidade condicional e distribuições.",
        "dificuldade": "Difícil"
    },
    "9": {
        "nome": "Sequências e matemática financeira",
        "descricao": "Progressões, somatórios, juros compostos e depreciação.",
        "dificuldade": "Difícil"
    },
    "10": {
        "nome": "Desafio final integrado",
        "descricao": "Problemas que combinam álgebra, funções, geometria, probabilidade e finanças.",
        "dificuldade": "Difícil"
    }
};


function makeQ([pergunta, resposta, passo]) {
    const valor = Number(resposta);
    const opcoes = [valor, valor + 1, valor - 1, valor + 2];
    return {
        pergunta: pergunta,
        alternativas: opcoes.map(function(numero) {
            return { texto: String(numero) };
        }),
        explicacao: "PASSO A PASSO:\\n" + passo +
            "\\n\\nCOMO EVITAR O ERRO:\\nConfira as condições, mantenha as unidades e valide o resultado na expressão original.",
        dificuldade: "Difícil"
    };
}

const dadosQuestoesNivel5 = {
    "1": [
        [
            "Resolva x²−13x+40=0 e determine a soma das raízes.",
            13,
            "Fatorando: (x−5)(x−8)=0. As raízes são 5 e 8; a soma é 13."
        ],
        [
            "Se x+y=11 e xy=24, calcule x²+y².",
            73,
            "Use x²+y²=(x+y)²−2xy=121−48=73."
        ],
        [
            "Resolva 2x²−7x+3=0 e indique a maior raiz.",
            3,
            "Δ=49−24=25. As raízes são (7±5)/4, isto é, 3 e 1/2. A maior é 3."
        ],
        [
            "As raízes de x³−6x²+11x−6=0 são 1, 2 e 3. Calcule a soma de seus quadrados.",
            14,
            "Some 1²+2²+3²=1+4+9=14."
        ],
        [
            "Resolva |3x−4|=11 e indique a maior solução.",
            5,
            "Os casos são 3x−4=11 ou 3x−4=−11. As soluções são 5 e −7/3; a maior é 5."
        ],
        [
            "Resolva √(x+12)=x, considerando x≥0.",
            4,
            "Elevando ao quadrado: x+12=x². As raízes são 4 e −3; a condição mantém apenas 4."
        ],
        [
            "Se log₃(x−2)+log₃(x+2)=2, determine x².",
            13,
            "Juntando os logaritmos: log₃(x²−4)=2. Então x²−4=9 e x²=13; o domínio exige x>2."
        ],
        [
            "Resolva 2^(x+2)=64.",
            4,
            "Como 64=2⁶, x+2=6. Portanto x=4."
        ],
        [
            "Quantos inteiros pertencem ao intervalo solução de x²−9x+20≤0?",
            2,
            "Fatorando: (x−4)(x−5)≤0. O intervalo [4,5] contém dois inteiros."
        ],
        [
            "Para qual k a equação x²−(k+3)x+3k=0 possui raízes iguais?",
            3,
            "Δ=(k+3)²−12k=(k−3)². Para Δ=0, k=3."
        ]
    ],
    "2": [
        [
            "Para f(x)=x²−4x+7, calcule f(5).",
            12,
            "Substitua x por 5: 25−20+7=12."
        ],
        [
            "Se f(x)=4x−7, calcule f⁻¹(9).",
            4,
            "Resolva 4x−7=9. Assim, x=4."
        ],
        [
            "Se f(x)=2x+1 e g(x)=x²−3, calcule (f∘g)(2).",
            3,
            "g(2)=1 e f(1)=3."
        ],
        [
            "Qual é o valor mínimo de f(x)=(x−3)²+5?",
            5,
            "O quadrado é não negativo e vale zero em x=3. O mínimo é 5."
        ],
        [
            "Qual é o maior inteiro no domínio de f(x)=√(17−2x)?",
            8,
            "17−2x≥0, então x≤8,5. O maior inteiro permitido é 8."
        ],
        [
            "Determine a abscissa do vértice de f(x)=−3x²+12x−7.",
            2,
            "xv=−b/(2a)=−12/(−6)=2."
        ],
        [
            "Resolva 5^(x−1)=125.",
            4,
            "125=5³, logo x−1=3 e x=4."
        ],
        [
            "Resolva log₂(4x)=5.",
            8,
            "4x=2⁵=32, então x=8."
        ],
        [
            "As assíntotas de (3x+2)/(x−4) são x=4 e y=3. Qual é a soma dos valores?",
            7,
            "A soma dos valores das assíntotas é 4+3=7."
        ],
        [
            "Quantas raízes reais distintas possui x³−4x²−x+4=0?",
            3,
            "Fatorando por agrupamento: (x²−1)(x−4)=(x−1)(x+1)(x−4). São três raízes."
        ]
    ],
    "3": [
        [
            "No primeiro quadrante, sen(θ)=5/13. Qual é o numerador de cos(θ)?",
            12,
            "Pela identidade fundamental, cosθ=12/13. O numerador é 12."
        ],
        [
            "Dois lados medem 7 e 8 e formam ângulo de 60°. Determine o quadrado do terceiro lado.",
            57,
            "Lei dos cossenos: c²=49+64−2·7·8·1/2=57."
        ],
        [
            "Se senθ=3/5 e cosθ=4/5, determine o numerador de sen(2θ).",
            24,
            "sen(2θ)=2·3/5·4/5=24/25. O numerador é 24."
        ],
        [
            "Quantas soluções tem 2sen(x)=1 em 0≤x<2π?",
            2,
            "senx=1/2 possui duas soluções nesse intervalo: π/6 e 5π/6."
        ],
        [
            "Dois lados de um triângulo medem 10 e formam ângulo de 60°. Qual é o coeficiente de √3 na área?",
            25,
            "A=(1/2)·10·10·sen60°=25√3."
        ],
        [
            "Um arco tem raio 9 e ângulo central de 120°. Qual é o coeficiente de π em seu comprimento?",
            6,
            "120°=2π/3 rad. O arco mede rθ=9·2π/3=6π."
        ],
        [
            "Um setor tem raio 6 e ângulo de 90°. Qual é o coeficiente de π em sua área?",
            9,
            "A=(90/360)·π·36=9π."
        ],
        [
            "Um lado de comprimento 5 está oposto a um ângulo de 30°. Determine o raio da circunferência circunscrita.",
            5,
            "Pela lei dos senos, a/senA=2R. Assim, 5/(1/2)=2R e R=5."
        ],
        [
            "Se tgθ=3/4, qual é o numerador de sec²θ?",
            25,
            "sec²θ=1+tg²θ=1+9/16=25/16."
        ],
        [
            "Quantas soluções tem cos(x)=0 em 0≤x<2π?",
            2,
            "As soluções são π/2 e 3π/2."
        ]
    ],
    "4": [
        [
            "Calcule o coeficiente de √3 na área de um hexágono regular de lado 6.",
            54,
            "A=(3√3/2)·6²=54√3."
        ],
        [
            "Um setor de raio 10 possui ângulo central de 36°. Qual é o coeficiente de π em sua área?",
            10,
            "A=(36/360)·π·100=10π."
        ],
        [
            "Em um quadrilátero cíclico, um ângulo mede 117°. Quanto mede o oposto?",
            63,
            "Ângulos opostos de quadrilátero inscrito somam 180°. Logo 63°."
        ],
        [
            "Uma tangente e uma secante partem de um ponto externo. A parte externa mede 4 e a secante inteira 9. Determine a tangente.",
            6,
            "Pela potência do ponto, t²=4·9=36. Portanto t=6."
        ],
        [
            "Uma corda está a 5 unidades do centro de uma circunferência de raio 13. Determine seu comprimento.",
            24,
            "A metade da corda mede √(13²−5²)=12. A corda inteira mede 24."
        ],
        [
            "Qual é a soma dos ângulos internos de um octógono convexo?",
            1080,
            "S=(8−2)·180°=1080°."
        ],
        [
            "Um triângulo possui lados 13, 14 e 15. Calcule sua área.",
            84,
            "Pelo método de Heron, s=21 e A=√(21·8·7·6)=84."
        ],
        [
            "Figuras semelhantes têm razão linear 3:2. Qual é o numerador da razão entre as áreas?",
            9,
            "A razão entre áreas é o quadrado da razão linear: 9/4."
        ],
        [
            "Um ângulo inscrito intercepta arco de 148°. Qual é sua medida?",
            74,
            "O ângulo inscrito mede metade do arco: 74°."
        ],
        [
            "Qual é a medida de cada ângulo externo de um dodecágono regular?",
            30,
            "360°/12=30°."
        ]
    ],
    "5": [
        [
            "Calcule a distância entre A(2,3) e B(8,11).",
            10,
            "d=√(6²+8²)=√100=10."
        ],
        [
            "Qual é a abscissa do ponto médio entre A(−4,7) e B(6,−3)?",
            1,
            "xM=(−4+6)/2=1."
        ],
        [
            "Determine o coeficiente angular da reta por (1,2) e (5,14).",
            3,
            "m=(14−2)/(5−1)=3."
        ],
        [
            "Uma circunferência tem centro (2,−3) e raio 5. Qual é o módulo do termo constante de sua equação geral?",
            12,
            "(x−2)²+(y+3)²=25. Expandindo, o termo constante é −12."
        ],
        [
            "As retas y=2x+1 e y=−x+7 se cruzam. Determine a abscissa da interseção.",
            2,
            "2x+1=−x+7, então 3x=6 e x=2."
        ],
        [
            "Calcule a distância do ponto (3,4) à reta 3x+4y−10=0.",
            3,
            "d=|9+16−10|/√25=15/5=3."
        ],
        [
            "Qual é a abscissa do eixo de simetria de y=(x−2)²+1?",
            2,
            "A forma de vértice indica eixo vertical x=2."
        ],
        [
            "A elipse x²/25+y²/9=1 possui qual comprimento de eixo maior?",
            10,
            "O semieixo maior mede √25=5; o eixo mede 10."
        ],
        [
            "Calcule a área do triângulo de vértices (0,0), (6,0) e (2,5).",
            15,
            "Base 6 e altura 5: A=6·5/2=15."
        ],
        [
            "Uma circunferência centrada na origem passa por (6,8). Determine o raio.",
            10,
            "r=√(6²+8²)=10."
        ]
    ],
    "6": [
        [
            "Qual é o coeficiente de π no volume de um cilindro de raio 3 e altura 8?",
            72,
            "V=πr²h=π·9·8=72π."
        ],
        [
            "Qual é o coeficiente de π no volume de um cone de raio 3 e altura 12?",
            36,
            "V=(1/3)π·9·12=36π."
        ],
        [
            "Qual é o coeficiente de π na área da superfície de uma esfera de raio 6?",
            144,
            "A=4πr²=4π·36=144π."
        ],
        [
            "Um cubo tem aresta 4. Qual é o coeficiente de √3 em sua diagonal espacial?",
            4,
            "A diagonal espacial é a√3=4√3."
        ],
        [
            "Um prisma tem área da base triangular 12 e comprimento 7. Determine o volume.",
            84,
            "V=área da base·comprimento=12·7=84."
        ],
        [
            "Um tronco de cone tem raios 5 e 2 e altura 9. Qual é o coeficiente de π em seu volume?",
            117,
            "V=(π·9/3)(25+10+4)=3π·39=117π."
        ],
        [
            "Calcule a área total de um cubo de aresta 5.",
            150,
            "A=6·5²=150."
        ],
        [
            "Um paralelepípedo tem dimensões 3, 4 e 12. Determine a diagonal espacial.",
            13,
            "d=√(3²+4²+12²)=√169=13."
        ],
        [
            "Qual é o coeficiente de π no volume de uma esfera de raio 3?",
            36,
            "V=(4/3)π·27=36π."
        ],
        [
            "Um cilindro tem raio 4 e altura 7. Qual é o coeficiente de π em sua área lateral?",
            56,
            "A lateral=2πrh=2π·4·7=56π."
        ]
    ],
    "7": [
        [
            "De quantas maneiras é possível escolher 3 pessoas entre 10, sem considerar a ordem?",
            120,
            "C(10,3)=10·9·8/6=120."
        ],
        [
            "Quantos anagramas distintos podem ser formados com MATEMA?",
            180,
            "São 6 letras, com A e M repetidos duas vezes: 6!/(2!·2!)=180."
        ],
        [
            "Um trajeto exige 6 movimentos à direita e 4 para cima. Quantos caminhos mínimos existem?",
            210,
            "Há 10 movimentos e 4 posições para os movimentos verticais: C(10,4)=210."
        ],
        [
            "Quantos códigos de 5 algarismos distintos podem começar por algarismo não nulo?",
            27216,
            "Há 9 opções iniciais e depois 9·8·7·6: total 27216."
        ],
        [
            "Uma comissão de 3 pessoas será escolhida entre 8, incluindo uma pessoa específica. Quantos grupos existem?",
            21,
            "A pessoa já está incluída; escolha 2 entre as outras 7: C(7,2)=21."
        ],
        [
            "De quantas maneiras 7 pessoas podem sentar-se em uma mesa circular, considerando rotações equivalentes?",
            720,
            "Permutação circular: (7−1)!=6!=720."
        ],
        [
            "Escolha 2 pessoas de um grupo de 6 e 1 de outro grupo de 4. Quantas comissões são possíveis?",
            60,
            "C(6,2)·C(4,1)=15·4=60."
        ],
        [
            "Oito pessoas ficam em fila, mas duas específicas devem permanecer juntas. Quantas filas existem?",
            10080,
            "Trate o par como bloco: 7! arranjos e 2 ordens internas. Total 2·7!=10080."
        ],
        [
            "Quantos números pares de 4 algarismos distintos podem ser formados com 1 a 7?",
            360,
            "Unidade: 3 opções pares; demais posições: 6, 5 e 4. Total 3·6·5·4=360."
        ],
        [
            "De quantas maneiras é possível escolher 2 elementos entre 12?",
            66,
            "C(12,2)=12·11/2=66."
        ]
    ],
    "8": [
        [
            "Dois dados são lançados. A probabilidade da soma 9 é 1/n. Determine n.",
            9,
            "Há 4 resultados favoráveis em 36. A fração 4/36 simplifica para 1/9."
        ],
        [
            "Uma urna tem 5 vermelhas e 3 azuis. Duas são retiradas sem reposição. Qual o denominador da probabilidade de ambas vermelhas?",
            14,
            "P=(5/8)(4/7)=20/56=5/14."
        ],
        [
            "Uma urna contém 4 verdes e 6 amarelas. Qual o numerador da probabilidade de retirar uma verde, na forma irredutível?",
            2,
            "P=4/10=2/5."
        ],
        [
            "Duas moedas honestas são lançadas. A probabilidade de exatamente uma cara é 1/n. Determine n.",
            2,
            "Dois dos quatro resultados têm exatamente uma cara: 2/4=1/2."
        ],
        [
            "Quatro tentativas independentes têm probabilidade 1/2 de sucesso. Qual o denominador da probabilidade de exatamente dois sucessos?",
            8,
            "P=C(4,2)/2⁴=6/16=3/8."
        ],
        [
            "Em um grupo, 11 pessoas usam óculos, sendo 6 meninas. Sabendo que alguém usa óculos, qual o denominador da probabilidade de ser menina?",
            11,
            "O espaço condicionado tem 11 pessoas; a probabilidade é 6/11."
        ],
        [
            "Em um baralho de 52 cartas, 12 são figuras. A probabilidade de retirar figura é 3/n. Determine n.",
            13,
            "12/52 simplifica para 3/13."
        ],
        [
            "Dois dados são lançados. Qual o denominador da probabilidade de o produto ser par, na forma irredutível?",
            4,
            "O produto é ímpar com probabilidade 9/36=1/4. Logo é par com probabilidade 3/4."
        ],
        [
            "Dois eventos independentes têm probabilidades 2/5 e 1/2. Determine o numerador da probabilidade conjunta.",
            1,
            "P=(2/5)(1/2)=1/5."
        ],
        [
            "Uma caixa tem 5 bolas vermelhas e 5 pretas. Duas são retiradas. Qual o denominador da probabilidade de serem da mesma cor?",
            9,
            "Favoráveis: 2·C(5,2)=20; totais C(10,2)=45. Simplificando, 4/9."
        ]
    ],
    "9": [
        [
            "Em uma PA com primeiro termo 7 e razão 4, determine o vigésimo termo.",
            83,
            "a20=7+19·4=83."
        ],
        [
            "Calcule a soma dos 20 primeiros termos da PA com primeiro termo 3 e razão 2.",
            440,
            "a20=41. S20=20(3+41)/2=440."
        ],
        [
            "Em uma PG com primeiro termo 3 e razão 2, determine o oitavo termo.",
            384,
            "a8=3·2⁷=384."
        ],
        [
            "Calcule a soma dos 6 primeiros termos da PG de primeiro termo 2 e razão 3.",
            728,
            "S6=2(3⁶−1)/(3−1)=728."
        ],
        [
            "R$ 2.000 rendem 10% ao ano em juros compostos por 2 anos. Determine o montante.",
            2420,
            "M=2000·1,1²=2420."
        ],
        [
            "Um equipamento de R$ 10.000 perde 20% do valor por ano. Quanto vale após 2 anos?",
            6400,
            "Valor=10000·0,8²=6400."
        ],
        [
            "Em uma PA, o quinto termo é 18 e a razão é 3. Determine o primeiro termo.",
            6,
            "a5=a1+4r. Logo a1=18−12=6."
        ],
        [
            "Em uma PG de razão 2, o terceiro termo é 12. Determine o primeiro termo.",
            3,
            "a3=a1·2²; então a1=12/4=3."
        ],
        [
            "Calcule a soma dos 15 primeiros termos de uma PA cujo primeiro e décimo quinto termos são 5 e 47.",
            390,
            "S15=15(5+47)/2=390."
        ],
        [
            "R$ 1.500 rendem 20% ao ano em juros compostos por 2 anos. Determine o montante.",
            2160,
            "M=1500·1,2²=2160."
        ]
    ],
    "10": [
        [
            "Um retângulo tem lados x e x+3 e área 180. Determine x positivo.",
            12,
            "x²+3x−180=0=(x−12)(x+15). A raiz positiva é 12."
        ],
        [
            "Uma caixa cúbica tem volume 343 cm³. Determine a aresta.",
            7,
            "A aresta é ∛343=7 cm."
        ],
        [
            "Uma parábola f(x)=−2x²+16x+3 atinge seu valor máximo em qual abscissa?",
            4,
            "O vértice tem xv=−16/(−4)=4."
        ],
        [
            "Um triângulo retângulo tem catetos 9 e 12. Determine o raio da circunferência circunscrita.",
            7.5,
            "A hipotenusa é 15. Em triângulo retângulo, o raio circunscrito é metade: 7,5."
        ],
        [
            "Uma senha tem 3 algarismos distintos escolhidos entre 1 e 5. Quantas senhas existem?",
            60,
            "Há 5·4·3 possibilidades, totalizando 60."
        ],
        [
            "R$ 500 aumentam 20% e depois diminuem 20% sobre o novo valor. Determine o valor final.",
            480,
            "500·1,2=600; depois 600·0,8=480."
        ],
        [
            "Uma circunferência tem raio 7. Qual é o coeficiente de π em seu comprimento?",
            14,
            "C=2πr=14π."
        ],
        [
            "Em uma turma, 18 estudam inglês, 16 espanhol e 8 ambos. Quantos estudam pelo menos um idioma?",
            26,
            "Pela inclusão-exclusão: 18+16−8=26."
        ],
        [
            "Uma sequência tem a1=2 e an=3a(n−1)+1. Determine a3.",
            22,
            "a2=7 e a3=3·7+1=22."
        ],
        [
            "Um produto de R$ 250 recebe descontos sucessivos de 20% e 10%. Qual é o preço final?",
            180,
            "250·0,8=200; depois 200·0,9=180."
        ]
    ]
};

const questoesNivel5 = Object.fromEntries(Object.entries(dadosQuestoesNivel5).map(([fase, lista]) => [fase, lista.map(makeQ)]));

// ESTADO ATUAL
// =====================================================

let nivelAtual = 5;

let faseAtual = 1;

let questaoAtual = 1;

let respostas = {};

let alternativasSelecionadas = {};

let progressoBancoNiveis = {};

let tentativasBancoNivel5 = {};

let inicioFase = null;

let faseFinalizada = false;

let respostaEmEnvio = false;

let modoRevisao = false;

let idSessaoRevisao = null;


// =====================================================
// CARREGAR PROGRESSO DO NÍVEL 4 NO SUPABASE
// =====================================================

async function carregarProgressoBancoNivel5() {

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
                .eq("level_number", 5),

            supabaseClient
                .from("user_question_attempts")
                .select("question_id, selected_option_id, is_correct")
                .eq("activity_type", "nivel")
                .like("question_id", "nivel:5:fase:%"),

            supabaseClient
                .from("user_progress")
                .select("total_xp")
                .maybeSingle()

        ]);

    if (resultadoFases.error) throw resultadoFases.error;
    if (resultadoTentativas.error) throw resultadoTentativas.error;
    if (resultadoXP.error) throw resultadoXP.error;

    progressoBancoNiveis = {};
    tentativasBancoNivel5 = {};

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
            /^nivel:5:fase:(\d+):questao:(\d+)$/
        );

        if (!identificacao) return;

        const numeroFase = Number(identificacao[1]);
        const numeroQuestao = Number(identificacao[2]);

        if (!tentativasBancoNivel5[numeroFase]) {
            tentativasBancoNivel5[numeroFase] = {};
        }

        tentativasBancoNivel5[numeroFase][numeroQuestao] = {
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
        questoesNivel5[numeroFase] || []
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
        fasesNivel5[faseAtual];


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
                    "nivel:5:fase:" + faseAtual + ":questao:" + questaoAtual;

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



function registrarAcessoFaseNivel5(numeroFase) {

    if (typeof registrarUltimaAtividade !== "function") return;

    const dadosFase = fasesNivel5[numeroFase];

    const nomeFase = dadosFase
        ? dadosFase.nome
        : "Praticando";

    registrarUltimaAtividade(
        "nivel5_fase_" + numeroFase,
        "Nível 5 • Fase " + numeroFase + ": " + nomeFase,
        "nivel5.html"
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

    registrarAcessoFaseNivel5(numeroFase);

    const dadosFase = obterDadosFase(nivelAtual, faseAtual);
    const dadosBanco = progressoBancoNiveis[faseAtual] || {};

    questaoAtual = Math.min(
        Math.max(Number(dadosBanco.questaoAtual) || 1, 1),
        TOTAL_QUESTOES
    );

    respostas = { ...(dadosBanco.respostas || {}) };
    alternativasSelecionadas = {};

    const tentativas = tentativasBancoNivel5[faseAtual] || {};

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
            fasesNivel5[numero];


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

function configurarEventosNivel5() {

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

async function restaurarRevisaoAtivaNivel5() {

    const { data: revisao, error: erroRevisao } = await supabaseClient
        .from("user_phase_review_sessions")
        .select("id, phase_number, review_number, completed")
        .eq("level_number", 5)
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
    registrarAcessoFaseNivel5(faseAtual);
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

async function inicializarNivel5() {

    if (typeof usuarioTemAcessoPremium === "function") {
        const acessoPremium = await usuarioTemAcessoPremium();
        if (!acessoPremium) {
            window.location.replace("atividades.html");
            return;
        }
    }


    if (typeof verificarAcessoNivelProgressivo === "function") {
        const acessoProgressivo = await verificarAcessoNivelProgressivo(5);
        if (!acessoProgressivo.permitido) {
            const titulo = document.getElementById("tituloNotificacaoNivel");
            const mensagem = document.getElementById("mensagemNotificacaoNivel");
            const notificacao = document.getElementById("notificacaoNivelBloqueado");
            if (titulo) titulo.textContent = "Nível 5 bloqueado";
            if (mensagem) mensagem.textContent = acessoProgressivo.motivo ||
                "Conclua o Nível 4 ou alcance 2.000 XP para desbloquear este nível.";
            if (notificacao) notificacao.hidden = false;
            return;
        }
    }

    configurarEventosNivel5();

    try {
        await carregarProgressoBancoNivel5();
    } catch (erro) {

        console.error(
            "Não foi possível carregar o progresso do Nível 5:",
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
        revisaoRestaurada = await restaurarRevisaoAtivaNivel5();
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
        inicializarNivel5
    );

} else {

    inicializarNivel5();

}   
