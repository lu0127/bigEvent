// 更换头像区域的 js 
$(function() {

    // 拿到 layer 属性
    const { layer } = layui
    // 1.1 获取裁剪区域的 DOM 元素(也就是获取要裁剪的图片)
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比(长宽比) 这个是用来设置裁剪框的形状 1 就是 1比1 正方形
        aspectRatio: 1,
        // 裁剪事件  这个 crop事件 里面包含了很多 裁剪区的信息，包括位置，裁剪框的大小等等。
        crop: function(event) {
            // 裁剪区的位置坐标
            // console.log(event.detail.x);
            // console.log(event.detail.y);
        },
        // 指定预览区域 哪个div有这个类名 就会成为预览区
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域 cropper()方法
    $image.cropper(options)

    // 给上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        // 点击上传按钮时
        // 自动点击文件选择框
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件

    $('#file').on('change', function(e) {
            // 获取用户选择的文件
            var filelist = e.target.files
            console.log(filelist);
            // filelist 伪数组的 0 号索引可就是用户选择的文件
            // 判断是否获取失败
            if (filelist.length === 0) { //如果伪数组长度为 0 说明没有选择文件
                return layer.msg('请选择照片！') //那就提示
            }
            // 如果没有获取失败，那么就拿新的照片替换原来裁剪区的照片
            var file = e.target.files[0] //伪数组的  0 号索引可就是用户选择的文件

            // 根据选择的文件，创建一个对应的 URL 地址：也就是将文件转换为路径
            // 先调用 URL.createObjectURL(file) 方法，把用户当前选择的照片 file 传过去
            // 返回值 用 image 保存
            var image = URL.createObjectURL(file)

            // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
            $image.cropper('destroy') // 销毁旧的裁剪区域 
                .attr('src', image) // 重新设置图片路径 
                .cropper(options) // 重新初始化裁剪区域
        })
        // 点击确定,上传图片到服务区
    $('#save-btn').click(function() {
        const dataUrl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        console.log(dataUrl)
        const search = new URLSearchParams()
        search.append('avatar', dataUrl)
        axios.post('/my/update/avatar', search).then(res => {
            console.log(res)
            if (res.status !== 0) {
                return layer.msg('上传失败!')
            }
            return layer.msg('上传成功!'),
                window.parent.getUserInfo()
        })
    })



})