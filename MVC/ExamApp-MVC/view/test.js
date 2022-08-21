const uuid = require('uuid');
const Question = require('./question')
class Tests 
{
    static allTest = [];
    constructor(tech)
    {
        this.testID = uuid.v4();
        this.tech =tech;
        this.question = [];
        this.isAttempted = false;
        this.outOffScore =0;
        this.score = 0;
    }


    insertQuestions(question)
    {
        if(this.tech == question.tech)
        {
            this.question.push(question);
        }
        return;
    }
    
    addQuestion(question)
    {
        this.question.push(new Question(question.tech, question.details, question.options, question.correctAnswer, question.complexity));
        return;
    }

    updateOutOffScore()
    {
        this.outOffScore =0;
        for(let index=0; index<this.question.length; index++)
        {
            this.outOffScore+=this.question[index].outOffScore;
        }
        return;
    }

    static findIndexOfTech(tech)
    {
        if(Tests.allTest.length==0) return [-2,false];
        for(let index=0; index<Tests.allTest.length; index++)
        {
            if(Tests.allTest[index].tech==tech)
            {
                return [index,true];
            }
        }
        return [-1,false];
    }

    testAttempted()
    {
        this.isAttempted = true;
    }

    static getTest(stack)
    {
        let frontend = stack.frontend;
        let backend = stack.backend;
        let dataBase = stack.dataBase;
        let firsttest = [];
        for(let index =0; index<Tests.allTest.length; index++)
        {
            if(Tests.allTest[index].tech == frontend || Tests.allTest[index].tech == backend || Tests.allTest[index].tech == dataBase)
            {
                let newTest = new Tests(Tests.allTest[index].tech)
                for(let j=0; j<Tests.allTest[index].question.length; j++)
                {
                    newTest.addQuestion(Tests.allTest[index].question[j])
                }
                newTest.updateOutOffScore();
                firsttest.push(newTest);
            }
            
        }

        return firsttest;
    }

    updateTestScore()
    {
        for(let index=0; index<this.question.length; index++)
        {
            if(this.question[index].selectedAnswer == this.question[index].correctAnswer)
            {
                this.score += this.question[index].outOffScore;
                return;
            }
            this.score -= this.question[index].negativeMark;
            return;
        }
    }

    isTestAttempted()
    {
        if(this.isAttempted == true)
        {
            return [true,"Test is already Attempted"];
        }
        return [false,"Test is not Attempted"]
    }

}
module.exports = Tests;