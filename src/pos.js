'use strict';
function farmatBarcodes(tags) {
    return tags.map(function (item) {
        let tag = item.split('-');
        return {
            barcode: tag[0],
            amount: parseFloat(tag[1]) || 1
        };
    });
}
function mergerBarcodes(barcodes) {
    return barcodes.reduce(function (cur, newObj) {
        let existItem = cur.find(function (item) {
            return item.barcode === newObj.barcode;
        });
        if (existItem) {
            existItem.amount += newObj.amount;
        }
        else {
            cur.push(Object.assign({}, newObj));
        }
        return cur;
    }, []);
}
function findCartItems(barcodes, allItems) {
    let result = [];
    barcodes.map(function (item) {
        for (let i = 0; i < allItems.length; i++) {
            if (item.barcode === allItems[i].barcode) {
                result.push(Object.assign({}, allItems[i], {amount: item.amount}));
            }
        }
    });
    return result;
}
function typeCartItems(cartItems, allPromotions) {
    let result = [], flag = 0;
    cartItems.map(function (item) {
        for (let i = 0; i < allPromotions.length; i++) {
            for (let j = 0; j < allPromotions[i].barcodes.length; j++) {
                if (item.barcode === allPromotions[i].barcodes[j]) {
                    result.push(Object.assign({}, item, {type: allPromotions[i].type}));
                    flag = 1;
                }
            }
        }
        if (flag === 0) {
            result.push((Object.assign({}, item, {type: "NO-PROMOTION"})));
        }
        flag = 0;
    });
    return result;
}
function calculaSubTotal(typeCartItems) {
    let result = [];
    typeCartItems.map(function (item) {
        result.push(Object.assign({}, item, {subTotal: item.price * item.amount}));
    });
    return result;
}
function calculaSavedNum(cartItems) {
    let result = [], num;
    cartItems.map(function (item) {
        if (item.type === 'NO-PROMOTION') {
            result.push(Object.assign({}, item, {savedNum: 0}));
        }
        else if (item.type === 'BUY_TWO_GET_ONE_FREE') {
            if (item.amount % 3 === 0) {
                num = item.amount - 2 * parseInt(item.amount / 3);
            }
            else if (item.amount % 3 === 1) {
                num = item.amount - (2 * parseInt(item.amount / 3) + 1);
            } else {
                num = item.amount - (2 * parseInt(item.amount / 3) + 2);
            }
            result.push(Object.assign({}, item, {savedNum: num}));
        } else {
            result.push(Object.assign({}, item, {savedNum: 0}));
        }
    });
    return result;
}
function calculaNewSubTotal(cartItems) {
    let result = [];
    cartItems.map(function (item) {
        result.push(Object.assign({}, item, {newSubTotal: (item.subTotal - item.price * item.savedNum)}));
    });
    return result;
}
function calculaTotal(cartItems) {
    let total = 0;
    cartItems.map(function (item) {
        total += item.newSubTotal;
    });
    return total;
}
function calculaAllSavedMoney(cartItems) {
    let allSavedmoney = 0;
    cartItems.map(function (item) {
        allSavedmoney += item.price * item.savedNum;
    });
    return allSavedmoney;
}
function print(cartItems, total, allSavedMoney) {
    let result = [], str = '';
    cartItems.map(function (item) {
        str += '名称:' + item.name + ',数量:' + item.amount + item.unit + ',单价:' + item.price + '(元),小计:' + item.newSubTotal + '\n';
    });
    str += '总计:' + total + '\n节省:' + allSavedMoney;
    return str;

}