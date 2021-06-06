"use strict";
var accountBalanceHistory = [
    {
        monthNumber: 3, 
        account: {
            balance: { amount: 600 },
        },
    },
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 0 },
        },
    },
    {
        monthNumber: 4, 
        account: {
            balance: { amount: 400 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 200 },
        },
    },

    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 100 },
        },
    },
]


module.exports = {
    init(data = []) {
        if (!Array.isArray(data) || !data.length) {
            return false;
        }
        let sortData = this.sortDataAsc(data);
        return this.process(sortData);
    },

    sortDataAsc(data) {
        return data.sort((a, b) => a.monthNumber - b.monthNumber);
    },

    process(processData) {//[0,100,200,600,400]//[600,300,0,100,200]
        let intialDiffData;
        let resultOutput = true;
        for (var i = 0; i < processData.length; i++) {

            if (!processData[i + 1]) {
                break;
            }

            let currentAmt = processData[i]?.account?.balance.amount;
            let nextAmt = processData[i + 1]?.account?.balance.amount;
            let tempDiffAmt = nextAmt - currentAmt;

            if (!intialDiffData) {
                intialDiffData = tempDiffAmt;
                continue;
            }
            if (intialDiffData != tempDiffAmt) {
                console.log(`Failed:----${tempDiffAmt}-------${intialDiffData}`);
                resultOutput = false;
                break;
            }
            console.log(`Success:----${tempDiffAmt}-------${intialDiffData}`);
        }
        return resultOutput;
    }

};

module.exports.init(accountBalanceHistory);
