function number_to_string(_number) {
        var _arr_numbers = new Array();
        _arr_numbers[1] = new Array('', 'один', 'два', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять', 'десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцать', 'п\'ятнадцать', 'шіснадцать', 'сімнадцать', 'вісімнадцать', 'дев\'ятнадцать');
        _arr_numbers[2] = new Array('', '', 'двадцять', 'тридцять', 'сорок', 'п\'ятдесят', 'шістдесят', 'сімдесят', 'вісімдесят', 'дев\'яносто');
        _arr_numbers[3] = new Array('', 'сто', 'двісті', 'триста', 'чотириста', 'п\'ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев\'ятсот');
        function number_parser(_num, _desc) {
                var _string = '';
                var _num_hundred = '';
                if (_num.length == 3) {
                        _num_hundred = _num.substr(0, 1);
                        _num = _num.substr(1, 3);
                        _string = _arr_numbers[3][_num_hundred] + ' ';
                }
                if (_num < 20) _string += _arr_numbers[1][parseFloat(_num)] + ' ';
                else {
                        var _first_num = _num.substr(0, 1);
                        var _second_num = _num.substr(1, 2);
                        _string += _arr_numbers[2][_first_num] + ' ' + _arr_numbers[1][_second_num] + ' ';
                }
                switch (_desc){
                        case 0:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'доллар США';
                                else if (_last_num > 1 && _last_num < 5) _string += 'доллари США';
                                else _string += 'долларів США';
                                break;
                        case 1:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'тисяча ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'тысячи ';
                                else _string += 'тисяч ';
                                _string = _string.replace('один ', 'одна ');
                                _string = _string.replace('два ', 'дві ');
                                break;
                        case 2:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'мільйон ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'миллиона ';
                                else _string += 'мільйонів ';
                                break;
                        case 3:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'мільярд ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'миллиарда ';
                                else _string += 'мільярдів ';
                                break;
                }
                _string = _string.replace('  ', ' ');
                return _string;
        }
        function decimals_parser(_num) {
                var _first_num = _num.substr(0, 1);
                var _second_num = parseFloat(_num.substr(1, 2));
                var _string = ' ' + _first_num + _second_num;
                if (_second_num == 1) _string += ' цент';
                else if (_second_num > 1 && _second_num < 5) _string += ' центи';
                else _string += ' центів';
                return _string;
        }
        if (!_number || _number == 0) return false;
        if (typeof _number !== 'number') {
                _number = _number.replace(',', '.');
                _number = parseFloat(_number);
                if (isNaN(_number)) return false;
        }
        _number = _number.toFixed(2);
        if(_number.indexOf('.') != -1) {
                var _number_arr = _number.split('.');
                var _number = _number_arr[0];
                var _number_decimals = _number_arr[1];
        }
        var _number_length = _number.length;
        var _string = '';
        var _num_parser = '';
        var _count = 0;
        for (var _p = (_number_length - 1); _p >= 0; _p--) {
                var _num_digit = _number.substr(_p, 1);
                _num_parser = _num_digit +  _num_parser;
                if ((_num_parser.length == 3 || _p == 0) && !isNaN(parseFloat(_num_parser))) {
                        _string = number_parser(_num_parser, _count) + _string;
                        _num_parser = '';
                        _count++;
                }
        }
        if (_number_decimals) _string += decimals_parser(_number_decimals);
        return _string;
}