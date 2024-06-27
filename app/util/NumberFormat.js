import BigNumber from 'bignumber.js';

/**
 * format Number to String
 * @param _number
 * @param _decimals
 * @param _decimalPlacesStrategy: 4 -> rounded; 1 - > small. eg:
 *              4: 0.12345 -> 0.1235
 *              1: 0.12345 -> 0.1234
 */
export function numberFormatAndGetApprox(_number, _decimals, _decimalPlacesStrategy, _defaultResult) {
    let number =
        _number && typeof _number === 'string' ? new BigNumber(_number) : new BigNumber(_number?._hex || _number || 0);
    let decimals = _decimals === undefined ? 2 : _decimals;
    let strategy = _decimalPlacesStrategy || 1;
    let result = '';
    let fixedResult = '';
    let approximation = '';
    let defaultResult = _defaultResult || '0';

    const adjustTheShowDecimals = (decimalBigNumber) => {
        const checkCurrentDecimals = (_decimalBigNumber, showDecimals) => {
            let exponent = new BigNumber(10).pow(showDecimals);
            let threshold = new BigNumber(1).div(exponent);

            if (_decimalBigNumber.comparedTo(threshold) < 0 && showDecimals < 8) {
                let _showDecimals = showDecimals + 2;
                return checkCurrentDecimals(_decimalBigNumber, _showDecimals);
            } else {
                return showDecimals;
            }
        };

        let _decimalBigNumber = decimalBigNumber;
        if (_decimalBigNumber.comparedTo(0) === 0) {
            return decimals;
        }
        if (_decimalBigNumber.comparedTo(0) < 0) {
            _decimalBigNumber = _decimalBigNumber.times(-1);
        }
        return checkCurrentDecimals(_decimalBigNumber, decimals);
    };

    const valueToFormat = (resultBigNumber) => {
        if (resultBigNumber.toNumber() === 0) {
            result = defaultResult;
            fixedResult = resultBigNumber.toFixed(decimals);
            approximation = defaultResult;
            return;
        }

        approximation = resultBigNumber.toFormat(decimals);

        let b = new BigNumber('1000000000');
        let m = new BigNumber('1000000');
        let k = new BigNumber('1000');
        let _k = new BigNumber('100000');

        let ROUND_DOWN = 1;

        if (resultBigNumber.comparedTo(b) >= 0) {
            let _resultBigNumber = resultBigNumber.div(b).decimalPlaces(decimals, ROUND_DOWN);
            result = `${_resultBigNumber.toFormat(decimals)} B`;
            fixedResult = `${_resultBigNumber.toFixed(decimals)} B`;
            return;
        }

        if (resultBigNumber.comparedTo(m) >= 0) {
            let _resultBigNumber = resultBigNumber.div(m).decimalPlaces(decimals, ROUND_DOWN);
            result = `${_resultBigNumber.toFormat(decimals)} M`;
            fixedResult = `${_resultBigNumber.toFixed(decimals)} M`;
            return;
        }

        if (resultBigNumber.comparedTo(_k) >= 0) {
            let _resultBigNumber = resultBigNumber.div(k).decimalPlaces(decimals, ROUND_DOWN);
            result = `${_resultBigNumber.toFormat(decimals)} K`;
            fixedResult = `${_resultBigNumber.toFixed(decimals)} K`;
            return;
        }

        result = resultBigNumber.toFormat(decimals);
        fixedResult = resultBigNumber.toFixed(decimals);
    };

    decimals = adjustTheShowDecimals(number);

    let resultBigNumber = number.decimalPlaces(decimals, strategy);
    valueToFormat(resultBigNumber);

    return {
        result: result,
        fixedResult: fixedResult,
        approximation: approximation,
        resultBigNumber: resultBigNumber,
        resultBigNumberString: resultBigNumber.toFixed(),
    };
}

export function numberFormat(_number, _decimals, _decimalPlacesStrategy) {
    let { result } = numberFormatAndGetApprox(_number, _decimals, _decimalPlacesStrategy);
    return result;
}

export function numberInputValueFormat(val) {
    // eslint-disable-next-line new-cap
    if (val === '') {
        return '';
    } else {
        let number = val.split('.');
        let number1 = number[0];
        let number2 = number[1] ? `.${number[1]}` : '';
        return number1.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + number2;
    }
}

export function leverageValueFormat(val) {
    // eslint-disable-next-line new-cap
    if (val === '') {
        return '';
    } else {
        return `${val}x`;
    }
}

export function toInteger(_number) {
    let number = new BigNumber(_number || 0);
    return number.toFixed(0);
}
