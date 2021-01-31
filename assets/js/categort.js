$(function() {
    const { form } = layui
    //   定义弹出层的index
    let index

    // 1.从服务器获取文章列表区域,渲染到页面
    getCateList()

    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取分类列表失败')
            }
            // 请求成功渲染
            const htmlLStr = template('tpl', res)

            $('tbody').html(htmlLStr)
        })
    }
    // 添加弹出层功能
    $('#add-btn').click(function() {
            index = layer.open({
                type: 1,
                title: '添加文章分类',
                content: $('.add-form-container').html(),
                area: ['500px', '250px']
            });

        })
        // 监听添加表单的提交事件
        // 注意:这个表单点击之后再去添加的.后创建的元素绑定事件统一使用事件委托
    $(document).on('submit', '.add-form', function(e) {
        e.preventDefault()
            // 提交数据
        axios.post('/my/article/addcates', $(this).serialize()).then(res => {

            if (res.status !== 0) {
                return layer.msg('提交失败!')
            }

            layer.close(index)
            getCateList()
            layer.msg('提交成功!')
        })

    })

    // 点击编辑按钮,弹出编辑
    $(document).on('click', '.edit-btn', function() {

            index = layer.open({
                    type: 1,
                    title: '修改文章分类',
                    content: $('.edit-form-container').html(),
                    area: ['500px', '250px']
                })
                // 获取自定义属性的值
            console.log($(this).data('id'));
            const id = $(this).data('id')
            axios.get(`/my/article/cates/${id}`).then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取失败!')
                }
                form.val('edit-form', res.data)
            })
        })
        // 发送请求到服务器.提交表单数据
    $(document).on('submit', '.edit-form', function(e) {
            e.preventDefault()
            axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新失败失败!')
                }
                layer.close(index)
                getCateList()
                layer.msg('更新成功!')
            })
        })
        //点击删除按钮,弹出删除框
    $(document).on('click', '.detele-btn', function() {
        var id = $(this).data('id')
        console.log(id);
        index = layer.open({
            title: '提示',
            content: $('.detele-form-container').html(),
            btn: ['确认', '取消'],
            yes: function() {
                axios.get(`/my/article/deletecate/${id}`, $(this).serialize()).then(res => {
                    if (res.status !== 0) {
                        return layer.msg('删除失败!')
                    }
                    layer.close(index)
                    getCateList()
                    layer.msg('删除成功!')
                })
            }
        });





    })
})