'use strict';
describe("farmat barcodes", function () {
    it("split barcode", function () {
        let result = [];
        let tags = ['ITEM000001', 'ITEM000003-2.5', 'ITEM000001', 'ITEM000001', 'ITEM000001', 'ITEM000001'];
        result = farmatBarcodes(tags);
        expect(result).toEqual([
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000003',
                amount: 2.5
            },
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000001',
                amount: 1
            }, {
                barcode: 'ITEM000001',
                amount: 1
            }, {
                barcode: 'ITEM000001',
                amount: 1
            }]);
    });
});
describe("mergerBarcodes", function () {
    it("barcode  amount", function () {
        let barcodes = [
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000003',
                amount: 2.5
            }, {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000001',
                amount: 1
            }];
        let expectedResult = [{barcode: 'ITEM000001', amount: 5}, {barcode: 'ITEM000003', amount: 2.5}];
        expect(mergerBarcodes(barcodes)).toEqual(expectedResult);
    });

});
describe("getCartItems", function () {
    it("cartItems", function () {
        let barcodes = [{barcode: 'ITEM000001', amount: 5}, {barcode: 'ITEM000003', amount: 2.5}];
        let expectedResult = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5
            }];
        expect(findCartItems(barcodes, loadAllItems())).toEqual(expectedResult);
    });
});
describe("typeCartItems", function () {
    it("typedCartItems", function () {

        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5
            }];
        let expectedResult = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE'
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION'
            }];
        expect(typeCartItems(cartItems, loadAllPromotions())).toEqual(expectedResult);
    });

});
describe("calculate subTotal no promotion", function () {
    it("subTotalItems", function () {
        let typedCartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE'
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION'
            }];
        let expectedResult = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE',
                subTotal: 15
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5
            }];
        expect(calculaSubTotal(typedCartItems)).toEqual(expectedResult);

    });

});
describe("calculate savedMoney", function () {
    it("savedMoney", function () {
        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE',
                subTotal: 15
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5
            }];
        let expectedResult = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE',
                subTotal: 15,
                savedNum: 1
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5,
                savedNum: 0
            }];
        expect(calculaSavedNum(cartItems)).toEqual(expectedResult);
    });
});
describe("calculateNewSubTotal", function () {
    it("new subTaotal ", function () {
        let cartItems = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            type: 'BUY_TWO_GET_ONE_FREE',
            subTotal: 15,
            savedNum: 1
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5,
                savedNum: 0
            }];
        let expectedResult = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE',
                subTotal: 15,
                savedNum: 1,
                newSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5,
                savedNum: 0,
                newSubTotal: 37.5
            }];
        expect(calculaNewSubTotal(cartItems)).toEqual(expectedResult);
    });
});
describe("calculaTotal", function () {
    it("total", function () {
        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE',
                subTotal: 15,
                savedNum: 1,
                newSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5,
                savedNum: 0,
                newSubTotal: 37.5
            }];
        let result = 49.5;
        expect(calculaTotal(cartItems)).toEqual(result);
    })
});
describe("calculaAllSavedMoney", function () {
    it("allSavedMoney", function () {
        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE',
                subTotal: 15,
                savedNum: 1,
                newSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5,
                savedNum: 0,
                newSubTotal: 37.5
            }];
        expect(calculaAllSavedMoney(cartItems)).toEqual(3);
    });
});
describe("print", function () {
    it("print", function () {
        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 5,
                type: 'BUY_TWO_GET_ONE_FREE',
                subTotal: 15,
                savedNum: 1,
                newSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2.5,
                type: 'NO-PROMOTION',
                subTotal: 37.5,
                savedNum: 0,
                newSubTotal: 37.5
            }];
        let total = 49.5, allSavedMoney = 3;
        expect(print(cartItems, total, allSavedMoney)).toEqual('名称:雪碧,数量:5瓶,单价:3(元),小计:12\n名称:荔枝,数量:2.5斤,单价:15(元),小计:37.5\n总计:49.5\n节省:3');

    });
});