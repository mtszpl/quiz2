pragma solidity ^0.8.6;

contract QuizContract {

    struct Question {
        string question;
        uint correctAnswer;
        string description;
    }
    mapping(string => mapping(uint => mapping(uint => string))) public answers;

    mapping(string => mapping(uint => Question)) public quizMap;
    mapping(string => uint) public quizSizeMap;
    mapping(address => uint) rewards;

    constructor(){
        romanQuiz();
        ereQuiz();
    }

    function romanQuiz() public {
        answers["Ancient Roman Empie"][0][0] = unicode"Aurelian";
        answers["Ancient Roman Empie"][0][1] = unicode"Augustus";
        answers["Ancient Roman Empie"][0][2] = unicode"Julian";
        answers["Ancient Roman Empie"][0][3] = unicode"Valens";

        answers["Ancient Roman Empire"][2][0] = unicode"Stilicho";
        answers["Ancient Roman Empire"][2][1] = unicode"Aetius";
        answers["Ancient Roman Empire"][2][2] = unicode"Majorian";
        answers["Ancient Roman Empire"][2][3] = unicode"Valentinian III";

        answers["Ancient Roman Empire"][3][0] = unicode"Rome";
        answers["Ancient Roman Empire"][3][1] = unicode"Milan";
        answers["Ancient Roman Empire"][3][2] = unicode"Ravenna";
        answers["Ancient Roman Empire"][3][3] = unicode"Naples";

        answers["Ancient Roman Empire"][4][0] = unicode"Adrianopole";
        answers["Ancient Roman Empire"][4][1] = unicode"Lake Trasimene";
        answers["Ancient Roman Empire"][4][2] = unicode"Carrhae";
        answers["Ancient Roman Empire"][4][3] = unicode"Idistaviso";
        
        Question memory question0 = Question(unicode"Which of these Roman emperors was titled Restorer of the World?",
            0,
            unicode"This title was given to Aurelian after he reintegrated separatist states of Palmerine and Gallic Empires in 273 and 274 respectively."
        );
        Question memory question1 = Question(unicode"Battle of Catalunyan Plains is seen as Rome's last great victory. Who commanded Roman forces?",
            1,
            unicode"Battle of Catalunyan Plains took place in 451 C.E between Huns led by Attila and Romano-German coallition led by Flavius Aetius and king Theodoric I."
        );
        Question memory question2 = Question(unicode"Which city was the capital of western part of Roman Empire in years 420-476 C.E.?",
            2,
            unicode"Ravenna was seat of the western Emperor since it replaced Milan in 401 C.E., untill Odoacerr deposed emperor Romulus Augustulus."
        );
        Question memory question3 = Question(unicode"Which of these battles did end with Roman victory?",
            3,
            unicode"Battle of Idistaviso took place in 16 C.E. Roman army led by Germanicus defeated germanic confederation of Arminius, archieving Roman goal of avenging defeat in Teutoborg Forest."
        );

        quizMap["Ancient Roman Empire"][0] = question0;
        quizMap["Ancient Roman Empire"][1] = question1;
        quizMap["Ancient Roman Empire"][2] = question2;
        quizMap["Ancient Roman Empire"][3] = question3;

        quizSizeMap["Ancient Roman Empire"] = 4;
    }

    function ereQuiz() public {
        answers["Medieval Roman Empire"][0][0] = unicode"Mundus";
        answers["Medieval Roman Empire"][0][1] = unicode"Bessas";
        answers["Medieval Roman Empire"][0][2] = unicode"Belisarius";
        answers["Medieval Roman Empire"][0][3] = unicode"Sittas";

        answers["Medieval Roman Empire"][2][0] = unicode"Desire of Persian shah to avenge murder of Roman emperor.";
        answers["Medieval Roman Empire"][2][1] = unicode"Border friction near the fortress of Dara.";
        answers["Medieval Roman Empire"][2][2] = unicode"Roman refusal to pay subsidies to Sassanids.";
        answers["Medieval Roman Empire"][2][3] = unicode"Persian desire to conquer Egypt.";

        answers["Medieval Roman Empire"][3][0] = unicode"Basil I";
        answers["Medieval Roman Empire"][3][1] = unicode"Nikephoros II Phokas";
        answers["Medieval Roman Empire"][3][2] = unicode"John I Tzimiskes";
        answers["Medieval Roman Empire"][3][3] = unicode"Romanos II";

        answers["Medieval Roman Empire"][4][0] = unicode"Yarmouk";
        answers["Medieval Roman Empire"][4][1] = unicode"Pliska";
        answers["Medieval Roman Empire"][4][2] = unicode"Calinicum";
        answers["Medieval Roman Empire"][4][3] = unicode"Manzikert";

        answers["Medieval Roman Empire"][5][0] = unicode"Carthage";
        answers["Medieval Roman Empire"][5][1] = unicode"Antioch";
        answers["Medieval Roman Empire"][5][2] = unicode"Adrianopole";
        answers["Medieval Roman Empire"][5][3] = unicode"Thesalloniki";
    
        Question memory question0 = Question(unicode"Which general commanded Roman forces in battle of Ad Decimum?",
            2,
            unicode"Belisarius led Roman forces against Vandalic army under Gelimer and his brother Ammatas. Roman victory led to reconquest of Africa."
        );
        Question memory question1 = Question(unicode"What was the official cause of last Roman-Sassanid war?",
            0,
            unicode"Sassanid shah Khosrow II wanted to avenge murder of emperor Maurice during Phokas revolt, whom he owed his throne and considered personal friend. It is quite likely he intended to conquer Egypt and Syria, but that wasn't used as casus beli."
        );
        Question memory question2 = Question(unicode"Which emperor was nicknamed 'The Pale Death of Saracens'?",
            1,
            unicode"It was a nickname of Nikephoros II Phokas, earned by his many victories against Arabic forces, including reconquest of Crete and Cilicia."
        );
        Question memory question3 = Question(unicode"Which of these Roman defeats caused crusades?",
            3,
            unicode"Defeat of Romanos IV at Manzikert in 1071 caused massive chaos in Roman empire. When emperor Alexios Komnenos tried to undo the damage and reclaim Anatolia, he asked pope in Rome for mercenaries. Instead, the pope organised crusades."
        );
        Question memory question4 = Question(unicode"Emperor Heraclius planned to move capital away from Constantinopole. To which city?",
            0,
            unicode"When Sassanid armies beseged Constantinopole, Heraclius planned to move capital to Carthage, away from Persian, Slav and Avar threat."
        );

        quizMap["Medieval Roman Empire"][0] = question0;
        quizMap["Medieval Roman Empire"][1] = question1;
        quizMap["Medieval Roman Empire"][2] = question2;
        quizMap["Medieval Roman Empire"][3] = question3;
        quizMap["Medieval Roman Empire"][4] = question4;

        quizSizeMap["Medieval Roman Empire"] = 5;
    }

    function createQuiz(string memory quizName, Question[] memory questions, string[] memory answers) public {
        for(uint i = 0; i < questions.length; i++)
            quizMap[quizName][i] = questions[i];
        quizSizeMap[quizName] = questions.length;
    }

    function getQuizQuestions(string memory quizName) public view returns(Question[] memory) {
        mapping(uint => Question) storage quiz = quizMap[quizName];
        Question[] memory quizQuestions = new Question[](quizSizeMap[quizName]);
        for(uint i = 0; i < quizSizeMap[quizName]; i++)
            quizQuestions[i] = quizMap[quizName][i];
        return quizQuestions;
    }

    function getQuizAnswers(string memory quizName) public returns(uint[][] memory) {
//mapping(string => mapping(uint => mapping(uint => string))) public answers;
//answers["Medieval Roman Empire"][5][0] = unicode"Carthage";
        // mapping(uint => mapping(uint => string)) memory allAnswers = answers[quizName];
        // uint[] memory returnValue = new uint[](quizSizeMap[quizName]);
        // for(uint i = 0; i < quizSizeMap[quizName]; i++) {
        //     returnValue[i] = new uint[](4);
        //     for(uint j = 0; j < 4; j++)
        //         returnValue[i][j] = 
        }
    }

}