export default {
    'required': {
        regexp: /\S/,
        be: true,
        msg: '请输入{{label}}'
    },
    'number': {
        regexp: /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/,
        be: true,
        msg: '{{label}}的格式不正确'
    },
    'digits': {
        regexp: /^\s*\d+\s*$/,
        be: true,
        msg: '{{label}}的格式不正确'
    },
    'email': {
        regexp: /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,
        be: true,
        msg: '{{label}}的格式不正确'
    },
    'url': {
        regexp: /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        be: true,
        msg: '{{label}}的格式不正确'
    },
    'easyurl': {
        regexp: /^(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        be: true,
        msg: '{{label}}的格式不正确'
    },
    'mobile': {
        regexp: /^1\d{10}$/,
        be: true,
        msg: '请输入正确的{{label}}'
    }
}
