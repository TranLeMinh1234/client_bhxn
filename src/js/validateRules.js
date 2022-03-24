// thực hiển kiểm tra theo rules
function validateRules(infoValidate)
{
    infoValidate.errorsComponet = [];
    let rules = infoValidate.rules.split("|");
    for(let i = 0; i < rules.length;i++)
    {
        let isValid = true;
        switch(rules[i])
        {
            case "required":
                isValid = required(infoValidate.valueValidate);
                break;
            default:
                break;    

        }

        if(!isValid)
            infoValidate.errorsComponet.push(rules[i]);
    }

    return infoValidate.errorsComponet;
}

function required(valueValidate){
    return valueValidate !== null && valueValidate !== undefined && valueValidate !== "";
}

function mesErrorFollowType(errors)
{
    let errorsMsg = '';
    switch(errors[0])
    {
        case 'required':
            errorsMsg = 'Thông tin không được bỏ trống!';
            break;
        default:
            break;
    }
    return errorsMsg;
}


export {mesErrorFollowType,validateRules};
