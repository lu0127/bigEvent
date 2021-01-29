$(function() {

    const { layer, form } = layui
    // 获取用户信息
    function initUserInfo() {

        axios.get('/my/userinfo').then(res => {
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            const { data } = res
            form.val('edit-userinfo', data)

        })
    }
    initUserInfo()
        // 表单验证
    form.verify({
        nick: [
            /^\S{1,6}$/,
            '昵称长度必须在1~6个字符之间'
        ]
    })

    // 提交修改
    $('.bass-info-form').submit(function(e) {
        e.preventDefault()
        axios.post('/my/userinfo', $(this).serialize())
            .then(res => {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('修改信息失败')
                }
                layer.msg('修改信息成功')
                window.parent.getUserInfo()
            })
    })

    //重置功能
    $('#reset-btn').click(function(e) {
        e.preventDefault()
        initUserInfo()
    })


})