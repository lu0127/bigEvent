// 获取用户个人信息
function getUserInfo() {
    const { from, layer } = layui
    var token = localStorage.getItem('token') || ''
    axios.get('/my/userinfo').then(res => {
        console.log(res)
        if (res.status !== 0) {
            return layer.msg('获取用户信息失败')
        }
        // 从放回的值中取出data
        const { data } = res
        const name = data.nickname || data.username
            // 渲染昵称
        $('.nickname').text(`欢迎${name}`).show()
            // 渲染头像
        if (data.user_pic) {
            $('.avatar').prop('src', data.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.text-avatar').text(name[0].toUpperCase()).show()
            $('.avatar').hide()
        }
    })
}
$(function() {


    getUserInfo()
        // 点击退出
    $('#logout').click(function() {
        localStorage.removeItem('token')
        location.href = './login.html'
    })

})