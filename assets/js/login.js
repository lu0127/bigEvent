$(function() {
    //从layui中提取form表单模块
    const { form, layer } = layui

    //点击链接惊喜表单切换
    $('#link-reg').click(function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').click(function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码只能在6到12之间'
        ],
        samePass: function(value) {
            if (value !== $('#pass').val()) {
                return '两次输入密码不一样'
            }
        }
    })

    // 实现注册功能
    $('.reg-form').submit(function(e) {
            e.preventDefault()
            axios.post('/api/reguser', $(this).serialize()).then(res => {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                $('#link-login').click()
            })
        })
        // 实现登录功能
    $('.login-form').submit(function(e) {
        e.preventDefault()
        axios.post('/api/login', $(this).serialize()).then(res => {
            if (res.status !== 0) return layer.msg('登录失败')
            localStorage.setItem('token', res.token)
            layer.msg('登录成功')
            location.href = './index.html'
        })
    })
})