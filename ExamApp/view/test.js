const uuid = require('uuid');
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
            this.outOffScore+=question.outOffScore
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

    isUserQuestionIdexist(questionId)
    {
        for(let index=0; index<this.question.length; index++)
        {
            if(this.question[index].Id == questionId)
            return [true,index];
        }
        return[false,-1];
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
            firsttest.push(Tests.allTest[index]);
        }

        return firsttest;
    }

    updateTestScore(boolean,marks)
    {
        if(boolean==false)
        {
            this.score -= marks;
            return;
        }
        this.score += marks;
        return;
    }

    isTestAttempted()
    {
        if(this.isAttempted == true)
        {
            return [true,"Test is Attempted"];
        }
        for(let index=0; index<this.question.length; index++)
        {
            if(this.question[index].selectedAnswer == "")
            return [false,"Not All question Attempted"];
        }
        this.isAttempted = true;
        return [true,"Attempted test"];
    }

}
module.exports = Tests;