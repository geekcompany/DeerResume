!!! DeerCV.com 的域名到期了，有需要查看自己简历内容的同学，请在本地host中将 deercv.com 和  yourdomain.deercv.com 还有静态文件域名 static.deercv.com 解析到 43.241.215.206 。
DeerResume
==========

![img](http://www.jobdeer.com/img/rd.png)

> DeerResume 不支持找回密码，如需持久化存储请使用基于DeerResume开发的托管服务 [DeerCV](http://www.deercv.com)。

最好用的MarkDown在线简历工具，可在线预览、编辑、设置访问密码和生成PDF

  - 可自行搭建，任意修改页面样式和风格
  - 免安装，可放置于任何支持静态页面的云和服务器（当然包括GitHub
  - 在线MarkDown编辑器+实时预览
  - 在浏览器中实时保存草稿
  - 支持阅读密码，您可以直接将网址和密码发送，供招聘方在线浏览
  - 一键生成简单雅致的PDF，供邮件发送及打印
  

免部署的在线版本： → http://cvbox.sinaapp.com/


部署指南：→ http://get.jobdeer.com/745.get


教学：《如何写好一份技术简历》 → http://get.jobdeer.com/744.get

### FAQ

如何在没有云端的情况下使用DeerResume？

- 请在可访问云端的情况下完成MarkDown的编辑，然后复制好简历内容。
- 修改app.js 注释掉第3行，打开第4行，将数据源切到本地。 
- 修改data.php 填入标题和内容，并按自己的需要设置阅读密码。

如何在本地修改样式保存PDF？
- 在 resume.html 中加入如下代码
   ```
    <style>
      @media print {
        .site-head,.action-bar {
          display: none;
        }
      }
    </style>
    ```
- 在 chrome 中打开网页
- 右键该简历网页选择打印
- 目标打印机改成另存为PDF
- 保存
