const app = require("app");
describe(`App: accountBalanceHistory`, () => {
    const accountBalanceHistory = [
        {
            monthNumber: 3, // two months ago
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
            monthNumber: 4, // two months ago
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
    it(`init Fail: NOT typOf Array `, () => {
        expect(app.init(11)).toEqual(false);
    });
    it(`init Fail: NO request params `, () => {
        expect(app.init()).toEqual(false);
    });
    it(`init Fail: Balnk Array `, () => {
        expect(app.init({})).toEqual(false);
    });

    it(`init Success: the balance amount changes by the same amount each month. `, () => {
        accountBalanceHistory.find((d) => d.monthNumber == 3).account.balance.amount = 300;
        expect(app.init(accountBalanceHistory)).toEqual(true);
    });

    it(`init Success: the balance amount changes by the Differnet amount each month. `, () => {
        accountBalanceHistory.find((d) => d.monthNumber == 3).account.balance.amount = 600;
        expect(app.init(accountBalanceHistory)).toEqual(false);
    });
    
      it(`sortDataAsc Success: check if array assigned in ascending order. `, () => {
        let reqData = [{
            monthNumber: 1, // two months ago
            account: {
                balance: { amount: 2000 },
            },
        },{
            monthNumber: 0, // two months ago
            account: {
                balance: { amount: 1000 },
            },
        }]
        const data = app.sortDataAsc(reqData);
         expect(data).toEqual([{
            monthNumber: 0, // two months ago
            account: {
                balance: { amount: 1000 },
            },
        },{
            monthNumber: 1, // two months ago
            account: {
                balance: { amount: 2000 },
            },
        }]);
    });
});
