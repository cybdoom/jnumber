function SpellNumber(MyNumber) {
  var Dollars = "", Cents = "", Temp, left, rigth;
  var DecimalPlace = "", Count;
  var Place = new Array(5);

  Place[0] = "";
  Place[1] = " тисяча ";
  Place[2] = " мільйон ";
  Place[3] = " мільярд ";
  Place[4] = " трильйон ";

    // String representation of amount.
    MyNumber = Math.round(MyNumber * 100) / 100;
    left = MyNumber.toString().substr(0, InStr(MyNumber, "."))
    rigth = MyNumber.toString().substr(InStr(MyNumber, ".")+1, MyNumber.length)

    DecimalPlace = InStr(MyNumber, ".")
    if (DecimalPlace > 0) {
      Cents = Right(MyNumber, DecimalPlace - 2).trim();
      MyNumber = Left(MyNumber, DecimalPlace).trim();
    }
    Count = 0;
    do {
        Temp = GetHundreds(Right(MyNumber, 3));
        if (Temp != "") Dollars = Temp + Place[Count] + Dollars;
        if (MyNumber.toString().length > 3) {
            MyNumber = Left(MyNumber, MyNumber.toString().length - 3);
        } else {
            MyNumber = "";
        }
        Count++;
    }
    while (MyNumber != "");
    switch (Dollars) {
    case "":
        Dollars = "нуль гривень";
        break;
    case "One":
        Dollars = "одна гривня";
        break;
    default:
        Dollars = Dollars + " гривень";
        break;
    }
    Cents = " і " + Cents + " копійок";
    return "(" + capitaliseFirstLetter(Dollars) + Cents + ")";
}
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function GetHundreds(MyNumber) {
    MyNumber = parseInt(MyNumber);
    var Result = "";
    if (MyNumber == 0) return "нуль";
    var strMyNumber = "000" + MyNumber.toString();
    strMyNumber = Right(strMyNumber, 3);
    // Convert the hundreds place.
    if (MidStr(strMyNumber, 0, 1) != "0") {
        Result = GetDigit(MidStr(strMyNumber, 0, 1)) + " сто ";
    }
    // Convert the tens and ones place.
    if (MidStr(strMyNumber, 1, 1) != "0") {
        Result = Result + GetTens(MidStr2(strMyNumber, 1));
    } else {
        Result = Result + GetDigit(MidStr2(strMyNumber, 2));
    }
    return Result;
}
// Converts a number from 10 to 99 into text.
function GetTens(TensText) {
    TensText = parseInt(TensText);
    var digit0 = parseInt(TensText.toString().substr(1));
    var digit1 = parseInt(TensText.toString().substr(0, 1));
    var Result = "";
    if (digit1 == 1) {
        switch (TensText) {
        case 10:
            Result = "десять";
            break;
        case 11:
            Result = "одинадцять";
            break;
        case 12:
            Result = "дванадцять";
            break;
        case 13:
            Result = "тринадцять";
            break;
        case 14:
            Result = "чотирнадцять";
            break;
        case 15:
            Result = "п'ятнадцять";
            break;
        case 16:
            Result = "шіснадцять";
            break;
        case 17:
            Result = "сімнадцять";
            break;
        case 18:
            Result = "вісімнаднцять";
            break;
        case 19:
            Result = "дев'ятнадцять";
            break;
        }
    } else {
        switch (digit1) {
        case 2:
            Result = "двадцять ";
            break;
        case 3:
            Result = "тридцять ";
            break;
        case 4:
            Result = "сорок ";
            break;
        case 5:
            Result = "п'ятдесят ";
            break;
        case 6:
            Result = "шістдесят ";
            break;
        case 7:
            Result = "сімдесят ";
            break;
        case 8:
            Result = "вісімдесят ";
            break;
        case 9:
            Result = "дев'яносто' ";
            break;
        }
        Result = Result + GetDigit(digit0);
    }
    return Result;
}
// Converts a number from 1 to 9 into text.
function GetDigit(Digit) {
    Digit = parseInt(Digit);
    switch (Digit) {
    case 1:
        return "один";
    case 2:
        return "два";
    case 3:
        return "три";
    case 4:
        return "чотири";
    case 5:
        return "п'ять";
    case 6:
        return "шість";
    case 7:
        return "сім";
    case 8:
        return "вісім";
    case 9:
        return "дев'ять";
    default:
        return "";
    }
}
function Left(str, n) {
    if (n <= 0) return "";
    else if (n > String(str).length) return str;
    else return String(str).toString().substr(0, n);
}
function Right(str, n) {
    if (n <= 0) return "";
    else if (n > str.toString().length) return str;
    else {
        var iLen = str.toString().length;
        return str.toString().substr(iLen - n, n);
    }
}
function MidStr2(strInput, intStart) {
    return String(strInput).toString().substr(intStart, strInput.toString().length);
}
function MidStr(strInput, intStart, intLength) {
    return String(strInput).toString().substr(intStart, intLength);
}
function InStr(myText, str) {
    return myText.toString().indexOf(str);
}
